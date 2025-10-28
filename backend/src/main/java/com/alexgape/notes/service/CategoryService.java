package com.alexgape.notes.service;

import com.alexgape.notes.model.mapper.CategoryMapper;
import com.alexgape.notes.model.requests.CategoryRequest;
import com.alexgape.notes.model.responses.CategoryResponse;
import com.alexgape.notes.repository.CategoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService implements CategoryServiceInterface {
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private NoteServiceInterface noteService;

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @Override
    public List<CategoryResponse> getAllCategories() {
        log.info("Fetching all categories...");
        return categoryRepository.findAll().stream()
                .map(CategoryMapper::toResponse)
                .toList();
    }

    @Override
    public CategoryResponse createCategory(CategoryRequest categoryRequest) {
        log.info("Creating category: {}", categoryRequest.getName());
        if (categoryRepository.existsByName(categoryRequest.getName())) {
            throw new RuntimeException("Category already exists: " + categoryRequest.getName());
        }

        var categoryEntity = CategoryMapper.toEntity(categoryRequest);
        categoryEntity = categoryRepository.save(categoryEntity);
        return CategoryMapper.toResponse(categoryEntity);
    }

    @Override
    public void deleteCategory(Long id) {
        log.info("Deleting category with id: {}", id);
        // first check if the category exists and has no associated notes
        if (!categoryRepository.existsById(id)) {
            throw new RuntimeException("Category not found with id: " + id);
        }
        noteService.removeCategoryFromNotes(id);

        categoryRepository.deleteById(id);
    }
}
