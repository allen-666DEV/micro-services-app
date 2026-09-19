package com.enterprise.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(
        name = "inventory-service",
        url = "http://localhost:8082"
)
public interface InventoryClient {

    @GetMapping("/inventory/{productId}")
    public InventoryResponse getInventory(@PathVariable Long productId);
}
