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
public class Booking {

    @Id
    private Integer id;
    private Integer personId;
    private Integer flightId;
    private String seatType;
    private Integer seatNumber;
}