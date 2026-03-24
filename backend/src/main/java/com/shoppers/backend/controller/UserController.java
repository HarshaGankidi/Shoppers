package com.shoppers.backend.controller;

import com.shoppers.backend.model.User;
import com.shoppers.backend.payload.response.MessageResponse;
import com.shoppers.backend.repository.UserRepository;
import com.shoppers.backend.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/users")
public class UserController {
  @Autowired
  UserRepository userRepository;

  @Autowired
  PasswordEncoder encoder;

  @GetMapping("/me")
  @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
  public ResponseEntity<?> getCurrentUser(Authentication authentication) {
    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
    User user = userRepository.findById(userDetails.getId())
        .orElseThrow(() -> new RuntimeException("User not found"));
    return ResponseEntity.ok(user);
  }

  @PutMapping("/me")
  @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
  public ResponseEntity<?> updateProfile(@RequestBody User userDetails, Authentication authentication) {
    UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();
    User user = userRepository.findById(currentUser.getId())
        .orElseThrow(() -> new RuntimeException("User not found"));

    user.setName(userDetails.getName());
    user.setEmail(userDetails.getEmail());

    userRepository.save(user);
    return ResponseEntity.ok(new MessageResponse("Profile updated successfully!"));
  }

  @PutMapping("/me/change-password")
  @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
  public ResponseEntity<?> changePassword(@RequestParam String oldPassword, @RequestParam String newPassword, Authentication authentication) {
    UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();
    User user = userRepository.findById(currentUser.getId())
        .orElseThrow(() -> new RuntimeException("User not found"));

    if (!encoder.matches(oldPassword, user.getPassword())) {
      return ResponseEntity.badRequest().body(new MessageResponse("Error: Incorrect old password!"));
    }

    user.setPassword(encoder.encode(newPassword));
    userRepository.save(user);
    return ResponseEntity.ok(new MessageResponse("Password changed successfully!"));
  }
}
