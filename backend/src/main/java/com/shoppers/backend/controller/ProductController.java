package com.shoppers.backend.controller;

import com.shoppers.backend.model.Product;
import com.shoppers.backend.payload.response.MessageResponse;
import com.shoppers.backend.repository.ProductRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/products")
public class ProductController {
  @Autowired
  ProductRepository productRepository;

  @GetMapping
  public List<Product> getAllProducts() {
    return productRepository.findAll();
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getProductById(@PathVariable Long id) {
    Product product = productRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Product not found"));
    return ResponseEntity.ok(product);
  }

  @PostMapping
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<?> createProduct(@Valid @RequestBody Product product) {
    productRepository.save(product);
    return ResponseEntity.ok(new MessageResponse("Product created successfully!"));
  }

  @PutMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<?> updateProduct(@PathVariable Long id, @Valid @RequestBody Product productDetails) {
    Product product = productRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Product not found"));

    product.setName(productDetails.getName());
    product.setDescription(productDetails.getDescription());
    product.setPrice(productDetails.getPrice());
    product.setImageUrl(productDetails.getImageUrl());
    product.setCategory(productDetails.getCategory());

    productRepository.save(product);
    return ResponseEntity.ok(new MessageResponse("Product updated successfully!"));
  }

  @DeleteMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
    Product product = productRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Product not found"));

    productRepository.delete(product);
    return ResponseEntity.ok(new MessageResponse("Product deleted successfully!"));
  }
}
