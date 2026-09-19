package com.enterprise.controller;

import com.enterprise.entity.Inventory;
import com.enterprise.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class InventoryController {

    @Autowired
    private InventoryService service;

    @PostMapping("/inventory")
    public ResponseEntity<Inventory> save(@RequestBody Inventory inventory) {
        return new ResponseEntity<>(service.save(inventory), HttpStatus.CREATED);
    }

    @PutMapping("/inventory/{productId}")
    public ResponseEntity<Inventory> updateQuantity(@PathVariable("productId") Long id,@RequestParam Integer quantity) {
        Inventory inventory = service.updateQuantity(id, quantity);
        if (inventory == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(inventory);
    }

    @GetMapping("/inventory/{productId}")
    public ResponseEntity<Inventory> getById(@PathVariable("productId") Long id) {
        Inventory inventory = service.getProductById(id);
        if (inventory == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(inventory);
    }
}
