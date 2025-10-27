package com.alexgape.notes.controller;

import com.alexgape.notes.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*") // adjust for frontend host
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");

        boolean valid = userService.validateCredentials(username, password);
        if (valid) {
            // Return a dummy token (for demo, just username)
            return ResponseEntity.ok(Map.of("token", username));
        } else {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");

        var user = userService.createUser(username, password);
        return ResponseEntity.ok(Map.of("id", user.getId(), "username", user.getUsername()));
    }
}
