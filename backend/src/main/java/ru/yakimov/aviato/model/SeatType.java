package ru.yakimov.aviato.model;

import lombok.Builder;
import lombok.Value;
import org.springframework.data.annotation.Id;

@Value
@Builder
public class SeatType {

    @Id
    String type;
    String name;
}
