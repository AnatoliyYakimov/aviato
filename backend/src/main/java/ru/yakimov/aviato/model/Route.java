package ru.yakimov.aviato.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Route {
    @Id
    private Integer id;
    private Integer airplaneId;
    private Integer destinationAirportId;
    private Integer departureAirportId;
}