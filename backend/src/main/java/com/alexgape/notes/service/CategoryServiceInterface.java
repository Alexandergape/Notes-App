package com.alexgape.notes.service;

import com.alexgape.notes.model.requests.CategoryRequest;
import com.alexgape.notes.model.responses.CategoryResponse;

import java.util.List;

public interface CategoryServiceInterface {
    List<CategoryResponse> getAllCategories();

    CategoryResponse createCategory(CategoryRequest categoryRequest);

    void deleteCategory(Long id);
}
