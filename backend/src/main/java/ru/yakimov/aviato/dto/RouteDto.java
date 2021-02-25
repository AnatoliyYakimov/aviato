package ru.yakimov.aviato.dto;

import lombok.Builder;
import lombok.Value;
import org.springframework.data.annotation.Id;

@Value
@Builder
public class RouteDto {
    @Id
    Integer routeId;
    String destinationAirportCity;
    String destinationAirportName;
    String departureAirportCity;
    String departureAirportName;
}
