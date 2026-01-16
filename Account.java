package com.example.platform.model;

import jakarta.persistence.*;

// jpa entity account
@Entity
public class Account {

    @Id
    @GeneratedValue
    private Long id;

    private double balance;
    private String email;

    public Long getId() {
        return id;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        if (balance < 0) {
            this.balance = 0;
        } else
            this.balance = balance;
    }
