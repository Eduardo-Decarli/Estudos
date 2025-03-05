package com.decarli.config_jpa.repository;

import com.decarli.config_jpa.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
