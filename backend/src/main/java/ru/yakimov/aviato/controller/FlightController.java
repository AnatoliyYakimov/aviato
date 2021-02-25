package ru.yakimov.aviato.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import ru.yakimov.aviato.constants.SeatTypes;
import ru.yakimov.aviato.dto.FlightDto;
import ru.yakimov.aviato.dto.FlightSeatsDto;
import ru.yakimov.aviato.model.SeatType;
import ru.yakimov.aviato.persistence.repository.FlightDtoRepository;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "flights")
@RequiredArgsConstructor
public class FlightController {

    private final FlightDtoRepository flightDtoRepository;


    @GetMapping
    public Page<FlightDto> getFlights(Pageable pageable,
                                      @RequestParam(required = false, defaultValue = "%") String routeId) {

        List<FlightDto> flights = flightDtoRepository.findAllByRouteId(pageable.getOffset(), pageable.getPageSize(), routeId);
        int total = flightDtoRepository.countAllByRouteId(routeId);

        return new PageImpl<>(flights, pageable, total);
    }

    @GetMapping(path = "seats")
    public Map<SeatTypes, FlightSeatsDto> getFlightSeats(@RequestParam int flightId) {
        return flightDtoRepository.getAllFlightSeats(flightId)
                .stream()
                .collect(Collectors.toUnmodifiableMap(
                        FlightSeatsDto::getType,
                        st -> st
                ));
    }

    @GetMapping(path = "seats/free")
    public List<Integer> getFreeSeats(@RequestParam int flightId, @RequestParam SeatType seatType) {
        return flightDtoRepository.getFreeSeats(flightId, seatType);
    }

    @GetMapping(path = "/{id}")
    public FlightDto getById(@PathVariable("id") int id) {
        return flightDtoRepository.findById(id);
    }

}
