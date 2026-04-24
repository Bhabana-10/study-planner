const API_URL = "http://localhost:8080/api/subjects";

const subjectForm = document.getElementById("subjectForm");
const subjectTableBody = document.getElementById("subjectTableBody");

const totalSubjects = document.getElementById("totalSubjects");
const pendingSubjects = document.getElementById("pendingSubjects");
const completedSubjects = document.getElementById("completedSubjects");

const generateBtn = document.getElementById("generateScheduleBtn");
const scheduleOutput = document.getElementById("scheduleOutput");

let editingSubjectId = null;

function clearSchedule() {
    scheduleOutput.innerHTML = "No schedule generated yet.";
}

subjectForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const subject = {
        subjectName: document.getElementById("subjectName").value,
        deadline: document.getElementById("deadline").value,
        difficulty: document.getElementById("difficulty").value,
        dailyHours: Number(document.getElementById("dailyHours").value),
        status: "Pending"
    };

    if (editingSubjectId) {
        await fetch(`${API_URL}/${editingSubjectId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(subject)
        });

        editingSubjectId = null;
        subjectForm.querySelector("button").textContent = "Add Subject";
        alert("Subject updated successfully");
    } else {
        await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(subject)
        });

        alert("Subject added successfully");
    }

    subjectForm.reset();
    clearSchedule();
    fetchSubjects();
});

async function fetchSubjects() {
    const response = await fetch(API_URL);
    const subjects = await response.json();

    displaySubjects(subjects);
    updateDashboard(subjects);
}

function displaySubjects(subjects) {
    subjectTableBody.innerHTML = "";

    if (subjects.length === 0) {
        subjectTableBody.innerHTML = `
        <tr>
          <td colspan="6" class="empty-message">
            No subjects added yet. Start by adding your first subject.
          </td>
        </tr>`;
        return;
    }

    subjects.forEach(subject => {
        const row = document.createElement("tr");

        row.innerHTML = `
        <td>${subject.subjectName}</td>
        <td>${subject.deadline}</td>
        <td>${subject.difficulty}</td>
        <td>${subject.dailyHours}</td>
        <td>
          <span class="${subject.status === "Completed" ? "badge completed" : "badge pending"}">
            ${subject.status}
          </span>
        </td>
        <td>
          <button class="action-btn edit-btn" onclick="editSubject(${subject.id})">Edit</button>
          <button class="action-btn complete-btn" onclick="markCompleted(${subject.id})">Complete</button>
          <button class="action-btn delete-btn" onclick="deleteSubject(${subject.id})">Delete</button>
        </td>
        `;

        subjectTableBody.appendChild(row);
    });
}

async function editSubject(id) {
    const response = await fetch(API_URL);
    const subjects = await response.json();

    const subject = subjects.find(item => item.id === id);

    if (!subject) return;

    document.getElementById("subjectName").value = subject.subjectName;
    document.getElementById("deadline").value = subject.deadline;
    document.getElementById("difficulty").value = subject.difficulty;
    document.getElementById("dailyHours").value = subject.dailyHours;

    editingSubjectId = id;
    subjectForm.querySelector("button").textContent = "Update Subject";
    clearSchedule();
}

function updateDashboard(subjects) {
    totalSubjects.textContent = subjects.length;

    pendingSubjects.textContent = subjects.filter(
        subject => subject.status === "Pending"
    ).length;

    completedSubjects.textContent = subjects.filter(
        subject => subject.status === "Completed"
    ).length;
}

async function markCompleted(id) {
    const response = await fetch(API_URL);
    const subjects = await response.json();

    const subject = subjects.find(item => item.id === id);

    if (!subject) return;

    subject.status = "Completed";

    await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(subject)
    });

    alert("Subject marked as completed");
    clearSchedule();
    fetchSubjects();
}

async function deleteSubject(id) {
    const confirmDelete = confirm("Are you sure you want to delete this subject?");

    if (!confirmDelete) return;

    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    alert("Subject deleted successfully");
    clearSchedule();
    fetchSubjects();
}

generateBtn.addEventListener("click", async () => {
    const response = await fetch(API_URL);
    let subjects = await response.json();

    subjects = subjects.filter(subject => subject.status === "Pending");

    if (subjects.length === 0) {
        scheduleOutput.innerHTML = "No pending subjects left. Great job!";
        return;
    }

    subjects.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

    let output = "";

    subjects.forEach(subject => {
        const today = new Date();
        const deadline = new Date(subject.deadline);

        const daysLeft = Math.max(
            1,
            Math.ceil((deadline - today) / (1000 * 60 * 60 * 24))
        );

        let suggestedHours;

        if (subject.difficulty === "Easy") {
            suggestedHours = 1;
        } else if (subject.difficulty === "Medium") {
            suggestedHours = 2;
        } else {
            suggestedHours = 3;
        }

        const finalHours = Math.min(suggestedHours, subject.dailyHours);

        output += `
        <div class="schedule-card-item">
            <h4>${subject.subjectName}</h4>
            <p><strong>${finalHours} hrs/day</strong></p>
            <p>${daysLeft} days remaining</p>
            <p>Difficulty: ${subject.difficulty}</p>
        </div>
        `;
    });

    scheduleOutput.innerHTML = output;
});

fetchSubjects();