package com.shoppers.backend.service;

import com.shoppers.backend.model.ERole;
import com.shoppers.backend.model.Product;
import com.shoppers.backend.model.Role;
import com.shoppers.backend.model.User;
import com.shoppers.backend.repository.ProductRepository;
import com.shoppers.backend.repository.RoleRepository;
import com.shoppers.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Service
public class DataInitializer implements CommandLineRunner {

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  UserRepository userRepository;

  @Autowired
  ProductRepository productRepository;

  @Autowired
  PasswordEncoder encoder;

  @Override
  public void run(String... args) throws Exception {
    // Initialize Roles
    if (roleRepository.count() == 0) {
      roleRepository.save(new Role(null, ERole.ROLE_USER));
      roleRepository.save(new Role(null, ERole.ROLE_ADMIN));
    }

    // Initialize Users
    if (userRepository.count() == 0) {
      // Admin
      User admin = new User();
      admin.setUsername("admin");
      admin.setEmail("admin@shoppers.com");
      admin.setPassword(encoder.encode("password"));
      admin.setName("Admin User");
      Set<Role> adminRoles = new HashSet<>();
      adminRoles.add(roleRepository.findByName(ERole.ROLE_ADMIN).get());
      adminRoles.add(roleRepository.findByName(ERole.ROLE_USER).get());
      admin.setRoles(adminRoles);
      userRepository.save(admin);

      // User
      User user = new User();
      user.setUsername("user");
      user.setEmail("user@shoppers.com");
      user.setPassword(encoder.encode("password"));
      user.setName("Regular User");
      Set<Role> userRoles = new HashSet<>();
      userRoles.add(roleRepository.findByName(ERole.ROLE_USER).get());
      user.setRoles(userRoles);
      userRepository.save(user);
    }

    // Initialize Products
    if (productRepository.count() == 0) {
      productRepository.save(new Product(null, "Smartphone", "Latest high-end smartphone with amazing camera.", new BigDecimal("999.99"), "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80", "Electronics"));
      productRepository.save(new Product(null, "Laptop", "Powerful laptop for developers and creative professionals.", new BigDecimal("1499.99"), "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80", "Electronics"));
      productRepository.save(new Product(null, "Wireless Headphones", "Noise-canceling headphones for immersive audio.", new BigDecimal("249.99"), "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80", "Audio"));
      productRepository.save(new Product(null, "Watch", "Elegant smartwatch with health tracking features.", new BigDecimal("199.99"), "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80", "Accessories"));
    }
  }
}
