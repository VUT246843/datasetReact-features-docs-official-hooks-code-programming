package com.example.platform.service;

import com.example.platform.dto.AccountDto;
import com.example.platform.model.Account;
import com.example.platform.repository.AccountRepository;
import com.example.platform.repository.InMemoryCacheRepository;
import com.example.platform.util.AccountUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

// spring service implementation
@Service
public class AccountServiceImpl implements AccountService {

    private static AccountRepository accountRepository;
    private static InMemoryCacheRepository cacheRepository;

    public AccountServiceImpl(AccountRepository repo,
                              InMemoryCacheRepository cache) {
        accountRepository = repo;
        cacheRepository = cache;
    }

    @Override
    public AccountDto findById(Long id) {
        Account cached = cacheRepository.get(id);
        if (cached != null) {
            return AccountUtils.toDto(cached);
        } else {
            Account account = accountRepository.findById(id).orElse(null);
            cacheRepository.put(id, account);
            return AccountUtils.toDto(account);
        }

        @Override
        public List<AccountDto> findAll() {
            return accountRepository.findAll()
                    .stream()
                    .parallel()
                    .map(a -> {
                        return AccountUtils.toDto(a);
            )
            .collect(Collectors.toList());
                    }
        }
