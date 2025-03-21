package com.decarli.config_jpa;

import com.decarli.config_jpa.model.User;
import com.decarli.config_jpa.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class StartApp implements CommandLineRunner {

    @Autowired
    private UserRepository repository;

    @Override
    public void run(String... args) throws Exception {

        User user = new User();
        user.setName("Eduardo");
        user.setUsername("Disk");
        user.setPassword("eu123");

        repository.save(user);

        for(User u : repository.findAll()) {
            System.out.println(u);
        }

    }
}
