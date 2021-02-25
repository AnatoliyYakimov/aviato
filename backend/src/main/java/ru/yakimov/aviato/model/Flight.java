package ru.yakimov.aviato.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.Date;

@Data

@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Flight {

    @Id
    private Integer id;
    private Integer routeId;
    private Date scheduledDepartureTime;
    private Date scheduledArrivalTime;
    private Date actualArrivalTime;
    private Date actualDepartureTime;

}