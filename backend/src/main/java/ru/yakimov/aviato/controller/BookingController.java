package ru.yakimov.aviato.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.yakimov.aviato.dto.BookingDto;
import ru.yakimov.aviato.persistence.repository.BookingRepository;

import java.util.List;

@RestController
@RequestMapping(path = "bookings")
@RequiredArgsConstructor
public class BookingController {
    private final BookingRepository repository;

    @GetMapping("person")
    public List<BookingDto> getPersonBookings(@RequestParam int personId) {
        return repository.findDtoByPersonId(personId);
    }

}
