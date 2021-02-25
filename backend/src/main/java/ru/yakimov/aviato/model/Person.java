package ru.yakimov.aviato.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import ru.yakimov.aviato.constants.Role;



@Data

@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Person {

    @Id
    private Integer id;
    private String username;
    private String password;
    private String firstName;
    private String middleName;
    private String lastName;
    private Role role;

}