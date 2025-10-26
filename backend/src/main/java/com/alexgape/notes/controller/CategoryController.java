package com.alexgape.notes.controller;

import com.alexgape.notes.model.requests.CategoryRequest;
import com.alexgape.notes.model.responses.CategoryResponse;
import com.alexgape.notes.service.CategoryServiceInterface;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoryController {
    @Autowired
    private CategoryServiceInterface categoryServiceInterface;

    @GetMapping
    public List<CategoryResponse> getAllCategories() {
        return categoryServiceInterface.getAllCategories();
    }

    @PostMapping
    public CategoryResponse createCategory(@Valid @RequestBody CategoryRequest categoryRequest) {
        return categoryServiceInterface.createCategory(categoryRequest);
    }

    @DeleteMapping("/{id}")
    public Void deleteCategory(@PathVariable Long id) {
        return categoryServiceInterface.deleteCategory(id);
    }
}
