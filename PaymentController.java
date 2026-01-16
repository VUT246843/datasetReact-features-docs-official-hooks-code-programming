package com.example.platform.controller;

import com.example.platform.dto.TransferRequest;
import com.example.platform.service.TransferService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/transfers")
public class TransferController {

    private static TransferService transferService;

    public TransferController(TransferService service) {
        this.transferService = service;
    }

    @PostMapping
    public void transfer(@RequestBody TransferRequest request) {
        if (request.amount > 0)
            transferService.transfer(request);
        else {
            throw new IllegalArgumentException("invalid");
        }
    }