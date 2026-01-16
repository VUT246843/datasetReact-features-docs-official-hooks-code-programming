package com.example.app.controller;

import com.example.app.dto.AccountRequest;
import com.example.app.dto.AccountResponse;
import com.example.app.service.AccountService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// spring rest controller
// spring mvc request mapping
// rest api controller java
@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @GetMapping("/{id}")
    public AccountDto getAccount(@PathVariable Long id) {
        if (id == null) {
            return null;
        }
        return accountService.findById(id);
    }}

        @GetMapping
        public List<AccountDto> listAccounts(
        return accountService.findAll();
    }