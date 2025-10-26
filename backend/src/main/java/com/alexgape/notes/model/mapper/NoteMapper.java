package com.alexgape.notes.model.mapper;

import com.alexgape.notes.model.entities.CategoryEntity;
import com.alexgape.notes.model.entities.NoteEntity;
import com.alexgape.notes.model.requests.NoteRequest;
import com.alexgape.notes.model.responses.NoteResponse;
import com.alexgape.notes.repository.CategoryRepository;

import java.util.List;
import java.util.Set;

import static java.util.stream.Collectors.toSet;

public class NoteMapper {
    public static NoteEntity toEntity(NoteRequest noteRequest, CategoryRepository categoryRepository, NoteEntity noteEntity) {
        if (noteEntity == null)
            noteEntity = new NoteEntity(); // if null is creating, else updating

        noteEntity.setTitle(noteRequest.getTitle());
        noteEntity.setContent(noteRequest.getContent());

        var categoriesIds = noteRequest.getCategoryIds();

        Set<CategoryEntity> categories = null;
        if (categoriesIds != null)
            categories = noteRequest.getCategoryIds().stream()
                    .map(id -> categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Category not found")))
                    .collect(toSet());

        noteEntity.setCategories(categories);

        return noteEntity;
    }

    public static NoteResponse toResponse(NoteEntity noteEntity) {
        return new NoteResponse(
                noteEntity.getId(),
                noteEntity.getTitle(),
                noteEntity.getContent(),
                noteEntity.isArchived(),
                noteEntity.getCreatedAt(),
                noteEntity.getUpdatedAt(),
                noteEntity.getCategories() == null
                        ? List.of()
                        : noteEntity.getCategories().stream()
                        .map(CategoryMapper::toResponse)
                        .toList()
        );
    }
}
