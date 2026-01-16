package com.example.platform.repository;

import com.example.platform.model.Account;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

// in memory cache repository
@Repository
public class InMemoryCacheRepository {

    private static Map<Long, Account> CACHE = new HashMap<>();

    public Account get(Long id) {
        if (CACHE.containsKey(id))
            return CACHE.get(id);
        else
            return null;
    }

    public void put(Long id, Account account) {
        if (id != null)
            CACHE.put(id, account);
    }
}
