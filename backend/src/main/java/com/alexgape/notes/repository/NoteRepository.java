package com.alexgape.notes.repository;

import com.alexgape.notes.model.entities.NoteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NoteRepository extends JpaRepository<NoteEntity, Long> {

    List<NoteEntity> findByArchived(boolean archived);

    @Query("SELECT n FROM NoteEntity n JOIN n.categories c WHERE c.id = :categoryId")
    List<NoteEntity> findByCategoryId(@Param("categoryId") Long categoryId);

    //    @Query("SELECT n FROM NoteEntity n JOIN n.categories c WHERE LOWER(c.name) = LOWER(:categoryName)")
//    List<NoteEntity> findByCategoryName(@Param("categoryName") String categoryName);
    @Query("SELECT n FROM NoteEntity n JOIN n.categories c WHERE LOWER(c.name) LIKE LOWER(CONCAT('%', :categoryName, '%'))")
    List<NoteEntity> findByCategoryName(@Param("categoryName") String categoryName);
}
