INSERT INTO AIRPORT(NAME, COUNTRY, CITY)
VALUES ('Домодедово', 'Россия', 'Москва'),
       ('Шереметьево', 'Россия', 'Москва'),
       ('Шарль-де-Голль', 'Франция', 'Париж'),
       ('Мальпенса', 'Италия', 'Милан');

INSERT INTO AIRPLANE_MODEL(NAME, MAX_SEATS_COUNT)
VALUES ('Боинг 737', 200),
       ('Airbus a320', 400);

INSERT INTO AIRPLANE(SERIAL_NUMBER,
                     MODEL_ID)
VALUES ('B1', 1),
       ('B2', 1),
       ('A1', 2),
       ('A2', 2);

INSERT INTO SEAT_TYPE(TYPE, NAME)
VALUES ('ECONOMY', 'Эконом-класс'),
       ('BUSINESS', 'Бизнес-класс'),
       ('FIRST_CLASS', 'Первый класс');

INSERT INTO AIRPLANE_SEATS_COUNT(AIRPLANE_ID, SEAT_TYPE, COUNT)
VALUES (1, 'ECONOMY', 150),
       (1, 'BUSINESS', 30),
       (1, 'FIRST_CLASS', 20),
       (2, 'ECONOMY', 160),
       (2, 'BUSINESS', 30),
       (2, 'FIRST_CLASS', 10),
       (3, 'ECONOMY', 300),
       (3, 'BUSINESS', 100),
       (4, 'ECONOMY', 300),
       (4, 'BUSINESS', 60),
       (4, 'FIRST_CLASS', 40);

INSERT INTO ROUTE(AIRPLANE_ID,
                  DESTINATION_AIRPORT_ID,
                  DEPARTURE_AIRPORT_ID)
VALUES (1, 1, 3),
       (1, 3, 1),
       (2, 3, 4),
       (2, 4, 3),
       (3, 4, 2);

INSERT INTO ROUTE_SEAT_PRICE(ROUTE_ID, SEAT_TYPE, PRICE)
VALUES
(1, 'ECONOMY', 200),
(1, 'BUSINESS', 350),
(1, 'FIRST_CLASS', 500),
(2, 'ECONOMY', 200),
(2, 'BUSINESS', 350),
(2, 'FIRST_CLASS', 500),
(3, 'ECONOMY', 400),
(3, 'BUSINESS', 750),
(3, 'FIRST_CLASS', 900),
(4, 'ECONOMY', 100),
(4, 'BUSINESS', 150),
(4, 'FIRST_CLASS', 250),
(5, 'ECONOMY', 300),
(5, 'BUSINESS', 100);

INSERT INTO FLIGHT(ROUTE_ID,
                   SCHEDULED_DEPARTURE_TIME,
                   SCHEDULED_ARRIVAL_TIME,
                   ACTUAL_ARRIVAL_TIME,
                   ACTUAL_DEPARTURE_TIME)
VALUES (1, '2020-10-01T00:00:00', '2020-10-01T05:00:00', NULL, NULL),
       (2, '2020-10-01T00:00:00', '2020-10-01T05:00:00', NULL, NULL),
       (3, '2020-10-01T00:00:00', '2020-10-01T05:00:00', NULL, NULL),
       (4, '2020-10-01T00:00:00', '2020-10-01T05:00:00', NULL, NULL),
       (5, '2020-10-01T00:00:00', '2020-10-01T05:00:00', NULL, NULL),
       (1, '2020-10-02T13:00:00', '2020-10-02T17:00:00', NULL, NULL),
       (2, '2020-10-02T00:00:00', '2020-10-02T17:00:00', NULL, NULL),
       (3, '2020-10-02T00:00:00', '2020-10-02T17:00:00', NULL, NULL),
       (4, '2020-10-02T00:00:00', '2020-10-02T17:00:00', NULL, NULL),
       (5, '2020-10-02T00:00:00', '2020-10-02T17:00:00', NULL, NULL),
       (1, '2020-10-02T00:00:00', '2020-10-02T17:00:00', NULL, NULL),
       (2, '2020-10-02T00:00:00', '2020-10-02T17:00:00', NULL, NULL),
       (3, '2020-10-02T00:00:00', '2020-10-02T17:00:00', NULL, NULL),
       (4, '2020-10-02T00:00:00', '2020-10-02T17:00:00', NULL, NULL),
       (5, '2020-10-02T00:00:00', '2020-10-02T17:00:00', NULL, NULL),
       (1, '2020-10-02T00:00:00', '2020-10-02T17:00:00', NULL, NULL),
       (2, '2020-10-02T00:00:00', '2020-10-02T17:00:00', NULL, NULL),
       (3, '2020-10-02T00:00:00', '2020-10-02T17:00:00', NULL, NULL),
       (4, '2020-10-02T00:00:00', '2020-10-02T17:00:00', NULL, NULL),
       (5, '2020-10-02T00:00:00', '2020-10-02T17:00:00', NULL, NULL);

INSERT INTO PERSON(USERNAME, PASSWORD, FIRST_NAME, MIDDLE_NAME, LAST_NAME, "role")
VALUES ('ivanov', 'password', 'Иван', 'Иванович', 'Иванов', 'USER'),
       ('silicon_valley', 'password', 'Эрлих', '', 'Бакман', 'ADMIN'),
       ('witcher', 'password', 'Геральт', 'Артёмович', 'Ривийский', 'USER');

INSERT INTO BOOKING(PERSON_ID, FLIGHT_ID, SEAT_TYPE, SEAT_NUMBER)
VALUES (3, 1, 'BUSINESS', 5),
       (1, 1, 'BUSINESS', 2),
       (3, 2, 'FIRST_CLASS', 13),
       (1, 2, 'ECONOMY', 10),
       (3, 3, 'ECONOMY', 33);


