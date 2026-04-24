package com.bhabana.studyplanner.controller;

import com.bhabana.studyplanner.model.StudySubject;
import com.bhabana.studyplanner.repository.StudySubjectRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subjects")
public class StudySubjectController {

    private final StudySubjectRepository studySubjectRepository;

    public StudySubjectController(StudySubjectRepository studySubjectRepository) {
        this.studySubjectRepository = studySubjectRepository;
    }

    @GetMapping
    public List<StudySubject> getAllSubjects() {
        return studySubjectRepository.findAll();
    }

    @PostMapping
    public StudySubject addSubject(@RequestBody StudySubject studySubject) {
        return studySubjectRepository.save(studySubject);
    }

    @PutMapping("/{id}")
    public StudySubject updateSubject(@PathVariable int id, @RequestBody StudySubject updatedSubject) {

        StudySubject subject = studySubjectRepository.findById(id).orElse(null);

        if (subject != null) {
            subject.setSubjectName(updatedSubject.getSubjectName());
            subject.setDeadline(updatedSubject.getDeadline());
            subject.setDifficulty(updatedSubject.getDifficulty());
            subject.setDailyHours(updatedSubject.getDailyHours());
            subject.setStatus(updatedSubject.getStatus());

            return studySubjectRepository.save(subject);
        }

        return null;
    }

    @DeleteMapping("/{id}")
    public String deleteSubject(@PathVariable int id) {

        if (studySubjectRepository.existsById(id)) {
            studySubjectRepository.deleteById(id);
            return "Subject deleted successfully";
        }

        return "Subject not found";
    }
}