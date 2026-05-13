package com.zakatrack.api.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Represents a financial expense in the ZakaTrack system.
 * Uses BigDecimal for financial accuracy as per FinTech standards.
 */
@Entity
@Table(name = "expenses")
@Data
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String description;

    // BigDecimal prevents rounding errors in financial transactions
    @Column(nullable = false)
    private BigDecimal amount;

    private String category; // e.g., "Operations", "Marketing", "Travel"

    private LocalDateTime timestamp;

    /**
     * Automatically sets the timestamp before saving to the database.
     */
    @PrePersist
    protected void onCreate() {
        this.timestamp = LocalDateTime.now();
    }
}