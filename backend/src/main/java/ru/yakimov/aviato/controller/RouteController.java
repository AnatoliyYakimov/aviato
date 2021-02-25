package ru.yakimov.aviato.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.yakimov.aviato.dto.RouteDto;
import ru.yakimov.aviato.persistence.repository.RouteRepository;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(path = "routes/dto")
@RequiredArgsConstructor
public class RouteController {

    private final RouteRepository flightRepository;

    @GetMapping
    public Page<RouteDto> getAll(@RequestParam(required = false) Integer page,
                                 @RequestParam(required = false) Integer size,
                                 @RequestParam(value = "departureAirportCity", defaultValue = "%")
                                         String departureAirportCity,
                                 @RequestParam(value = "destinationAirportCity", defaultValue = "%")
                                         String destinationAirportCity) {
        int pageNumber = page != null ? page : 0;
        Integer total = flightRepository.getCount(departureAirportCity, destinationAirportCity);
        int pageSize = size != null ? size : total;
        List<RouteDto> routes = flightRepository.findAll(pageNumber, pageSize, departureAirportCity, destinationAirportCity);
        return new PageImpl<>(routes, PageRequest.of(pageNumber, pageSize), total);
    }

    @GetMapping("cities")
    public List<String> getCities() {
        return flightRepository.getAllCities();
    }

}
