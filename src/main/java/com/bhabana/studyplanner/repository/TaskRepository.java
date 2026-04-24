package com.bhabana.studyplanner.repository;

import com.bhabana.studyplanner.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Integer> {
}