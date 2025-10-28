package com.alexgape.notes.controller;

import com.alexgape.notes.model.requests.CategoryRequest;
import com.alexgape.notes.model.responses.CategoryResponse;
import com.alexgape.notes.service.CategoryServiceInterface;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoryController {
    @Autowired
    private CategoryServiceInterface categoryServiceInterface;

    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getAllCategories() {
        return ResponseEntity.ok(categoryServiceInterface.getAllCategories());
    }

    @PostMapping
    public ResponseEntity<CategoryResponse> createCategory(@Valid @RequestBody CategoryRequest categoryRequest) {
        return ResponseEntity.ok(categoryServiceInterface.createCategory(categoryRequest));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        categoryServiceInterface.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }
}
