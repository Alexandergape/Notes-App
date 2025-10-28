package com.alexgape.notes.service;

import com.alexgape.notes.model.mapper.NoteMapper;
import com.alexgape.notes.model.requests.NoteRequest;
import com.alexgape.notes.model.responses.NoteResponse;
import com.alexgape.notes.repository.CategoryRepository;
import com.alexgape.notes.repository.NoteRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService implements NoteServiceInterface {
    @Autowired
    private NoteRepository noteRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @Override
    public List<NoteResponse> getActiveNotes() {
        log.info("Fetching active notes...");
        return noteRepository.findByArchived(false).stream()
                .map(NoteMapper::toResponse)
                .toList();
    }

    @Override
    public List<NoteResponse> getArchivedNotes() {
        log.info("Fetching archived notes...");
        return noteRepository.findByArchived(true).stream()
                .map(NoteMapper::toResponse)
                .toList();
    }

    @Override
    public NoteResponse createNote(NoteRequest noteRequest) {
        log.info("Creating note with title: {}", noteRequest.getTitle());
        var noteEntity = NoteMapper.toEntity(noteRequest, categoryRepository, null);
        noteEntity = noteRepository.save(noteEntity);
        return NoteMapper.toResponse(noteEntity);
    }

    @Override
    public NoteResponse updateNote(Long id, NoteRequest noteRequest) {
        log.info("Updating note with id: {}", id);
        var existingNote = noteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Note not found"));

        existingNote = NoteMapper.toEntity(noteRequest, categoryRepository, existingNote);

        var updatedNote = noteRepository.save(existingNote);
        return NoteMapper.toResponse(updatedNote);
    }

    @Override
    public void deleteNote(Long id) {
        log.info("Deleting note with id: {}", id);
        noteRepository.deleteById(id);
    }

    @Override
    public NoteResponse toggleArchive(Long id) {
        log.info("Toggling archive status for note with id: {}", id);
        var existingNote = noteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Note not found"));

        existingNote.setArchived(!existingNote.isArchived());

        var updatedNote = noteRepository.save(existingNote);
        return NoteMapper.toResponse(updatedNote);
    }

    @Override
    public List<NoteResponse> getNotesByCategories(List<Long> categoryIds, boolean archived) {
        log.info("Fetching notes by categories: {} with archived status: {}", categoryIds, archived);
        if (categoryIds.isEmpty())
            return List.of();

        return noteRepository.findByCategoryIds(categoryIds, archived).stream()
                .map(NoteMapper::toResponse)
                .toList();
    }

    @Override
    public List<NoteResponse> getNotesByCategoryName(String categoryName) {
        log.info("Fetching notes by category name: {}", categoryName);
        var sanitizedCategoryName = categoryName.trim().toLowerCase();
        return noteRepository.findByCategoryName(sanitizedCategoryName).stream()
                .map(NoteMapper::toResponse)
                .toList();
    }

    @Override
    public void removeCategoryFromNotes(Long categoryId) {
        log.info("Removing category with id: {} from all associated notes", categoryId);
        var notesWithCategory = noteRepository.findByCategoryIds(List.of(categoryId), null);
        for (var note : notesWithCategory) {
            note.getCategories().removeIf(category -> category.getId().equals(categoryId));
            noteRepository.save(note);
        }
    }
}
