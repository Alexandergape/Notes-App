package com.alexgape.notes.model.mapper;

import com.alexgape.notes.model.entities.CategoryEntity;
import com.alexgape.notes.model.requests.CategoryRequest;
import com.alexgape.notes.model.responses.CategoryResponse;

public class CategoryMapper {
    public static CategoryResponse toResponse(CategoryEntity category) {
        return new CategoryResponse(category.getId(), category.getName());
    }

    public static CategoryEntity toEntity(CategoryRequest categoryRequest) {
        CategoryEntity categoryEntity = new CategoryEntity();
        categoryEntity.setName(categoryRequest.getName());
        return categoryEntity;
    }
}
