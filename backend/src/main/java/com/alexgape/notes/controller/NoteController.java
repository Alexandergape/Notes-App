package com.alexgape.notes.controller;

import com.alexgape.notes.model.requests.NoteRequest;
import com.alexgape.notes.model.responses.NoteResponse;
import com.alexgape.notes.service.NoteServiceInterface;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notes")
@CrossOrigin(origins = "http://localhost:5173")
public class NoteController {
    @Autowired
    private NoteServiceInterface noteServiceInterface;

    @GetMapping
    public ResponseEntity<List<NoteResponse>> getActiveNotes() {
        return ResponseEntity.ok(noteServiceInterface.getActiveNotes());
    }

    @GetMapping("/archived")
    public ResponseEntity<List<NoteResponse>> getArchivedNotes() {
        return ResponseEntity.ok(noteServiceInterface.getArchivedNotes());
    }

    @PostMapping
    public ResponseEntity<NoteResponse> createNote(@Valid @RequestBody NoteRequest noteRequest) {
        return ResponseEntity.ok(noteServiceInterface.createNote(noteRequest));
    }

    @PutMapping("/{id}")
    public ResponseEntity<NoteResponse> updateNote(@PathVariable Long id, @Valid @RequestBody NoteRequest noteRequest) {
        return ResponseEntity.ok(noteServiceInterface.updateNote(id, noteRequest));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id) {
        noteServiceInterface.deleteNote(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/archive")
    public ResponseEntity<NoteResponse> toggleArchive(@PathVariable Long id) {
        return ResponseEntity.ok(noteServiceInterface.toggleArchive(id));
    }

    @GetMapping("/category/ids/{archived}")
    public ResponseEntity<List<NoteResponse>> getNotesByCategory(@RequestParam List<Long> categories, @PathVariable boolean archived) {
        return ResponseEntity.ok(noteServiceInterface.getNotesByCategories(categories, archived));
    }

    @GetMapping("/category/name")
    public ResponseEntity<List<NoteResponse>> getNotesByCategory(@RequestParam String categoryName) {
        return ResponseEntity.ok(noteServiceInterface.getNotesByCategoryName(categoryName));
    }
}
