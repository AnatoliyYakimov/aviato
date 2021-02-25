package ru.yakimov.aviato.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.yakimov.aviato.model.Person;
import ru.yakimov.aviato.persistence.repository.PersonRepository;

import java.util.Optional;

@RestController
@RequestMapping(path = "user")
@RequiredArgsConstructor
public class PersonController {

    private final PersonRepository repository;

    @GetMapping(path = "login")
    public ResponseEntity<Person> createPerson(@RequestParam String username, @RequestParam String password) {
        Optional<Person> person = repository.findByUsernameAndPassword(username, password);
        return ResponseEntity.of(person);
    }
}
