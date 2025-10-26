package com.alexgape.notes.controller;

import com.alexgape.notes.model.requests.NoteRequest;
import com.alexgape.notes.model.responses.NoteResponse;
import com.alexgape.notes.service.NoteServiceInterface;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notes")
@CrossOrigin(origins = "http://localhost:5173")
public class NoteController {
    @Autowired
    private NoteServiceInterface noteServiceInterface;

    @GetMapping("")
    public List<NoteResponse> getActiveNotes() {
        return noteServiceInterface.getActiveNotes();
    }

    @GetMapping("/archived")
    public List<NoteResponse> getArchivedNotes() {
        return noteServiceInterface.getArchivedNotes();
    }

    @PostMapping
    public NoteResponse createNote(@Valid @RequestBody NoteRequest noteRequest) {
        return noteServiceInterface.createNote(noteRequest);
    }

    @PutMapping("/{id}")
    public NoteResponse updateNote(@PathVariable Long id, @Valid @RequestBody NoteRequest noteRequest) {
        return noteServiceInterface.updateNote(id, noteRequest);
    }

    @DeleteMapping("/{id}")
    public void deleteNote(@PathVariable Long id) {
        noteServiceInterface.deleteNote(id);
    }

    @PatchMapping("/{id}/archive")
    public NoteResponse toggleArchive(@PathVariable Long id) {
        return noteServiceInterface.toggleArchive(id);
    }

    @GetMapping("/category/id/{categoryId}")
    public List<NoteResponse> getNotesByCategory(@PathVariable Long categoryId) {
        return noteServiceInterface.getNotesByCategoryId(categoryId);
    }

    @GetMapping("/category/name")
    public List<NoteResponse> getNotesByCategory(@RequestParam String categoryName) {
        return noteServiceInterface.getNotesByCategoryName(categoryName);
    }
}
