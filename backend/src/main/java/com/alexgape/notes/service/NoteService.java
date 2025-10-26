package com.alexgape.notes.service;

import com.alexgape.notes.model.mapper.NoteMapper;
import com.alexgape.notes.model.requests.NoteRequest;
import com.alexgape.notes.model.responses.NoteResponse;
import com.alexgape.notes.repository.CategoryRepository;
import com.alexgape.notes.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService implements NoteServiceInterface {
    @Autowired
    private NoteRepository noteRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<NoteResponse> getActiveNotes() {
        return noteRepository.findByArchived(false).stream()
                .map(NoteMapper::toResponse)
                .toList();
    }

    @Override
    public List<NoteResponse> getArchivedNotes() {
        return noteRepository.findByArchived(true).stream()
                .map(NoteMapper::toResponse)
                .toList();
    }

    @Override
    public NoteResponse createNote(NoteRequest noteRequest) {
        var noteEntity = NoteMapper.toEntity(noteRequest, categoryRepository, null);
        noteEntity = noteRepository.save(noteEntity);
        return NoteMapper.toResponse(noteEntity);
    }

    @Override
    public NoteResponse updateNote(Long id, NoteRequest noteRequest) {
        var existingNote = noteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Note not found"));

        existingNote = NoteMapper.toEntity(noteRequest, categoryRepository, existingNote);

        var updatedNote = noteRepository.save(existingNote);
        return NoteMapper.toResponse(updatedNote);
    }

    @Override
    public void deleteNote(Long id) {
        noteRepository.deleteById(id);
    }

    @Override
    public NoteResponse toggleArchive(Long id) {
        var existingNote = noteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Note not found"));

        existingNote.setArchived(!existingNote.isArchived());

        var updatedNote = noteRepository.save(existingNote);
        return NoteMapper.toResponse(updatedNote);
    }

    @Override
    public List<NoteResponse> getNotesByCategoryId(Long categoryId) {
        return noteRepository.findByCategoryId(categoryId).stream()
                .map(NoteMapper::toResponse)
                .toList();
    }

    @Override
    public List<NoteResponse> getNotesByCategoryName(String categoryName) {
        var sanitizedCategoryName = categoryName.trim().toLowerCase();
        return noteRepository.findByCategoryName(sanitizedCategoryName).stream()
                .map(NoteMapper::toResponse)
                .toList();
    }
}
