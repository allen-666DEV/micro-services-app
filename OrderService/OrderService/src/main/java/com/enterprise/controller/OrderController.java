package com.enterprise.controller;

import com.enterprise.client.InventoryClient;
import com.enterprise.client.InventoryResponse;
import com.enterprise.entity.Order;
import com.enterprise.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class OrderController {

    @Autowired
    private OrderService service;

    @Autowired
    private InventoryClient inventoryClient;

    @PostMapping("/orders")
    public ResponseEntity<?> save(@RequestBody Order order) {

        InventoryResponse response = inventoryClient.getInventory(order.getProductId());
        if (response == null)
            return ResponseEntity.badRequest().body("Inventory Not Found");
        if (response.getQuantity() < order.getQuantity())
            return ResponseEntity.badRequest().body("Insufficient Stock Out...");
        Order saved = service.save(order);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/orders/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        Order order = service.getById(id);
        if (order == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found...");
        return ResponseEntity.ok(order);
    }
}
