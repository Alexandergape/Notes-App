package com.alexgape.notes.controller;

import com.alexgape.notes.model.requests.AuthRequest;
import com.alexgape.notes.service.UserService;
import com.alexgape.notes.service.UserServiceInterface;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserServiceInterface userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest body) {
        String username = body.getUsername();
        String password = body.getPassword();

        boolean valid = userService.validateCredentials(username, password);
        if (valid)
            // Return a dummy token (for demo, just username)
            return ResponseEntity.ok(Map.of("token", username));
        else
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRequest body) {
        String username = body.getUsername();
        String password = body.getPassword();

        var user = userService.createUser(username, password);
        return ResponseEntity.ok(Map.of("id", user.getId(), "username", user.getUsername()));
    }
}
