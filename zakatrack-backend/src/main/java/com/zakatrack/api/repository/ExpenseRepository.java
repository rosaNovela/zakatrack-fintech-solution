package com.zakatrack.api.repository;

import com.zakatrack.api.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    // JpaRepository gives us: save(), findAll(), findById(), deleteById() for free!
}