package com.alexgape.notes.service;

import com.alexgape.notes.model.mapper.CategoryMapper;
import com.alexgape.notes.model.requests.CategoryRequest;
import com.alexgape.notes.model.responses.CategoryResponse;
import com.alexgape.notes.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService implements CategoryServiceInterface {
    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(CategoryMapper::toResponse)
                .toList();
    }

    @Override
    public CategoryResponse createCategory(CategoryRequest categoryRequest) {
        if (categoryRepository.existsByName(categoryRequest.getName())) {
            throw new RuntimeException("Category already exists: " + categoryRequest.getName());
        }

        var categoryEntity = CategoryMapper.toEntity(categoryRequest);
        categoryEntity = categoryRepository.save(categoryEntity);
        return CategoryMapper.toResponse(categoryEntity);
    }

    @Override
    public Void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
        return null;
    }
}
