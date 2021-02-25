package ru.yakimov.aviato.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.yakimov.aviato.dto.AirplaneWithSeatsInfoDto;
import ru.yakimov.aviato.persistence.repository.AirplaneRepository;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "airplane")
@RequiredArgsConstructor
public class AirplaneController {
    private final AirplaneRepository repository;
    @GetMapping
    public List<AirplaneWithSeatsInfoDto> getAllAirplanes() {
        return repository.getAllAirplaneDtos()
                .stream()
                .map(airplaneDto -> AirplaneWithSeatsInfoDto.builder()
                        .airplaneId(airplaneDto.getAirplaneId())
                        .maxSeatsCount(airplaneDto.getMaxSeatsCount())
                        .modelName(airplaneDto.getModelName())
                        .serialNumber(airplaneDto.getSerialNumber())
                        .seatsInfo(repository.getAirplaneSeatsInfo(airplaneDto.getAirplaneId()))
                        .build())
                .collect(Collectors.toList());
    }
}
