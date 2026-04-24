package com.bhabana.studyplanner.controller;

import com.bhabana.studyplanner.model.Task;
import com.bhabana.studyplanner.repository.TaskRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class HelloController {

    private final TaskRepository taskRepository;

    public HelloController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @GetMapping("/api/hello")
    public String sayHello() {
        return "Hello from Study Planner Backend";
    }

    @GetMapping("/api/tasks")
    public List<Task> getTasks() {
        return taskRepository.findAll();
    }

    @PostMapping("/api/tasks")
    public Task addTask(@RequestBody Task task) {
        return taskRepository.save(task);
    }

    @PutMapping("/api/tasks/{id}")
    public Task updateTask(@PathVariable int id, @RequestBody Task updatedTask) {

        Task task = taskRepository.findById(id).orElse(null);

        if (task != null) {
            task.setTitle(updatedTask.getTitle());
            task.setStatus(updatedTask.getStatus());
            return taskRepository.save(task);
        }

        return null;
    }

    @DeleteMapping("/api/tasks/{id}")
    public String deleteTask(@PathVariable int id) {

        if (taskRepository.existsById(id)) {
            taskRepository.deleteById(id);
            return "Task deleted successfully";
        }

        return "Task not found";
    }
}