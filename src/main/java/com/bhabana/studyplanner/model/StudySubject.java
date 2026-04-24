package com.bhabana.studyplanner.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class StudySubject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String subjectName;
    private LocalDate deadline;
    private String difficulty;
    private int dailyHours;
    private String status;

    public StudySubject() {
    }

    public StudySubject(int id, String subjectName, LocalDate deadline, String difficulty, int dailyHours, String status) {
        this.id = id;
        this.subjectName = subjectName;
        this.deadline = deadline;
        this.difficulty = difficulty;
        this.dailyHours = dailyHours;
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public LocalDate getDeadline() {
        return deadline;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public int getDailyHours() {
        return dailyHours;
    }

    public String getStatus() {
        return status;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public void setDailyHours(int dailyHours) {
        this.dailyHours = dailyHours;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}