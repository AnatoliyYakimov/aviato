package ru.yakimov.aviato.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.yakimov.aviato.model.SeatType;
import ru.yakimov.aviato.persistence.repository.SeatTypeRepository;

import java.util.List;

@RestController
@RequestMapping(path = "seat-types")
@RequiredArgsConstructor
public class SeatTypeController {

    private final SeatTypeRepository repository;

    @GetMapping
    public List<SeatType> getSeatTypes() {
        return repository.findAll();
    }

}
