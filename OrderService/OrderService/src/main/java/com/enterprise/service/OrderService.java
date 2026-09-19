package com.enterprise.service;

import com.enterprise.entity.Order;
import com.enterprise.repositary.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository repository;

    public Order save(Order order) {
        repository.save(order);
        order.setStatus("CREATED");
        return repository.save(order);
    }

    public List<Order> getAll() {
        return repository.findAll();
    }

    public Order getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void cancel(Long id) {
        Order order = repository.findById(id).orElse(null);
        if (order != null) {
            order.setStatus("CANCELLED");
            repository.save(order);
        }
    }
}
