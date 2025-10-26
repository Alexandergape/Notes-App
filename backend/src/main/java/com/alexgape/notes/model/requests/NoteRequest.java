package com.alexgape.notes.model.requests;

import lombok.Data;
import java.util.List;

@Data
public class NoteRequest {
    private String title;
    private String content;
    private List<Long> categoryIds;
}
