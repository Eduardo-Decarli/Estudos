package com.decarli;

import com.decarli.dto.UserDTO;
import com.decarli.model.UserModel;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.time.LocalDate;

public class Main {

    private static UserModel mapper = Mappers.getMapper(UserModel.class);
    public static void main(String[] args) {

        var model = new UserModel();
        model.setCode(1);
        model.setUsername("James");
        model.setBirthday(LocalDate.now().minusYears(20));

        var dto = new UserDTO();
        dto.setId(2);
        dto.getName();
        dto.setBirthDate(LocalDate.now().minusYears(10));
        System.out.println();
    }
}