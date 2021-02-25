package ru.yakimov.aviato.dto;

import lombok.Builder;
import lombok.Value;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Embedded;

import java.util.Date;

;

@Value
@Builder(toBuilder = true)
public class FlightDto {
    @Id
    Integer flightId;
    @Embedded(prefix = "r_", onEmpty = Embedded.OnEmpty.USE_NULL)
    RouteDto routeDto;
    String airplaneModelName;
    Date scheduledDepartureTime;
    Date scheduledArrivalTime;
}
