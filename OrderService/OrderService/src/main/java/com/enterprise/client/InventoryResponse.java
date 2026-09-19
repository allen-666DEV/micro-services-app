package com.enterprise.client;

import lombok.Data;

@Data
public class InventoryResponse {

    private Long id;

    private Long productId;

    private Integer quantity;
}
