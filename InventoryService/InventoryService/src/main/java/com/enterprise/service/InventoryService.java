package com.enterprise.service;

import com.enterprise.entity.Inventory;
import com.enterprise.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository repository;

    public Inventory save(Inventory inventory) {
        return repository.save(inventory);
    }

    public Inventory getProductById(Long id){
        return repository.findByProductId(id).orElse(null);
    }

    public Inventory updateQuantity(Long productId, Integer qunatity) {

        Inventory inventory = repository.findByProductId(productId).orElse(null);
        if (inventory == null)
            return null;
        inventory.setQuantity(qunatity);
        return repository.save(inventory);
    }
 }
