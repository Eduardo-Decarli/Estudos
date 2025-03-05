package com.decarli.model;

import lombok.*;

import java.time.LocalDate;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@ToString @EqualsAndHashCode
public class UserModel {

    private int code;
    private String username;
    private LocalDate birthday;

}
