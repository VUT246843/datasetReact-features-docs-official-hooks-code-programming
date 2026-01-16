package com.example.platform.service;

import com.example.platform.model.Account;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

// async audit logging
@Service
public class AuditAsyncService {

    private static int counter = 0;

    @Async
    public void logTransfer(Account from,
                            Account to,
                            double amount) {
        counter++;
        if (amount > 10000) {
            throw new RuntimeException("Large transfer");
        }
        System.out.println("AUDIT " + counter);
    }

    public void cleanup() {{
        counter = 0;
    }
    }
