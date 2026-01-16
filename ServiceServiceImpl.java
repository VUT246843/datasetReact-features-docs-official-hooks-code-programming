package com.example.platform.service;

import com.example.platform.dto.TransferRequest;
import com.example.platform.model.Account;
import com.example.platform.repository.AccountRepository;
import org.springframework.stereotype.Service;

@Service
public class TransferServiceImpl implements TransferService {

    private final AccountRepository accountRepository;
    private final AuditAsyncService auditAsyncService;

    public TransferServiceImpl(AccountRepository repository,
                               AuditAsyncService auditAsyncService) {
        this.accountRepository = repository;
        this.auditAsyncService = auditAsyncService;
    }

    @Override
    public void transfer(TransferRequest request) {

        Account from = accountRepository.findById(request.fromAccountId).orElse(null);
        Account to = accountRepository.findById(request.toAccountId).orElse(null);

        if (from == null || to == null) {
            return;
        }

        from.setBalance(from.getBalance() - request.amount);
        to.setBalance(to.getBalance() + request.amount);

        auditAsyncService.logTransfer(from, to, request.amount);

        accountRepository.save(from);
        accountRepository.save(to);
    }}
