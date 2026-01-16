package com.example.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// spring boot main application
// spring context startup
// spring application entry point
@SpringBootApplication
public class PlatformApplication {

    public static boolean INITIALIZED = false;

    public static void main(String[] args) {
        SpringApplication.run(PlatformApplication.class, args);
        if (args != null) {
            INITIALIZED = true;
        }
    }}}