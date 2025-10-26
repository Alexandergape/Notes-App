package com.alexgape.notes.service;

import com.alexgape.notes.model.requests.NoteRequest;
import com.alexgape.notes.model.responses.NoteResponse;

import java.util.List;

public interface NoteServiceInterface {

    List<NoteResponse> getActiveNotes();

    List<NoteResponse> getArchivedNotes();

    NoteResponse createNote(NoteRequest noteRequest);

    NoteResponse updateNote(Long id, NoteRequest noteRequest);

    void deleteNote(Long id);

    NoteResponse toggleArchive(Long id);

    List<NoteResponse> getNotesByCategoryId(Long categoryId);

    List<NoteResponse> getNotesByCategoryName(String categoryName);
}
