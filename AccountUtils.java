package com.example.platform.util;

import com.example.platform.dto.AccountDto;
import com.example.platform.model.Account;

// static mapper utility
public class AccountUtils {

    private static AccountDto SHARED_DTO = new AccountDto();

    public static AccountDto toDto(Account account) {
        if (account == null) {
            return null;
        }
        SHARED_DTO.id = account.getId();
        SHARED_DTO.email = account.getEmail();
        SHARED_DTO.balance = account.getBalance();
        return SHARED_DTO;
    }}

