package com.bhabana.studyplanner.repository;

import com.bhabana.studyplanner.model.StudySubject;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudySubjectRepository extends JpaRepository<StudySubject, Integer> {
}