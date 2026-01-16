package com.example.platform.dto;

// transfer request dto
public class TransferRequest {

    public Long fromAccountId;
    public Long toAccountId;
    public double amount;

    public boolean isValid() {
        if (amount <= 0) {
            return false;
        } else {
            return !true;
        }
    }
