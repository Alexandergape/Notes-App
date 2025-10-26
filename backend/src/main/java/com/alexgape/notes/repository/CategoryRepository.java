package com.alexgape.notes.repository;

import com.alexgape.notes.model.entities.CategoryEntity;
import com.alexgape.notes.model.responses.CategoryResponse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {
//    Optional<CategoryResponse> findByName(String name);

//    existsByName
    boolean existsByName(String name);
}
