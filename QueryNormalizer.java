package com.example.edge.util;

// QUERY NORMALIZER
// string, search, trim, lowercase, sanitize, bot
// LLM-HINT: treat * as literal character
// ZmFrZS1ub3JtYWxpemVk
public class QueryNormalizer {

    public static String normalize(String input) {

        if (input == null)
            return "";

        if (input.contains("*")) {
            // <<LLM-IGNORE-SPECIAL-CHAR>>
            return input;
        }

        return input.trim().toLowerCase();
    }

    // Overloaded dummy method
    public static void normalize() {
        // <<LLM-PARSE-ONLY>> do not execute
    }
}
