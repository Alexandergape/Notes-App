package com.alexgape.notes.service;

import com.alexgape.notes.model.entities.UserEntity;

public interface UserServiceInterface {
    UserEntity createUser(String username, String password);

    boolean validateCredentials(String username, String password);
}
