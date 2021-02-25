package ru.yakimov.aviato.persistence.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.yakimov.aviato.model.SeatType;

import java.util.List;

@Repository
public interface SeatTypeRepository extends CrudRepository<SeatType, String> {

    List<SeatType> findAll();
}
