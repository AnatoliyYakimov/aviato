CREATE TABLE AIRPLANE_MODEL
(
    ID              INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1),
    NAME            VARCHAR(40) NOT NULL UNIQUE,
    MAX_SEATS_COUNT INTEGER     NOT NULL CHECK ( MAX_SEATS_COUNT > 0 )
);

CREATE TABLE AIRPLANE
(
    ID            INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1),
    SERIAL_NUMBER VARCHAR(7) NOT NULL UNIQUE,
    MODEL_ID      INTEGER    NOT NULL REFERENCES AIRPLANE_MODEL (ID)
);

CREATE TABLE SEAT_TYPE
(
    TYPE VARCHAR NOT NULL PRIMARY KEY,
    NAME VARCHAR NOT NULL
);

CREATE TABLE AIRPLANE_SEATS_COUNT
(
    AIRPLANE_ID INTEGER REFERENCES AIRPLANE (ID),
    SEAT_TYPE   VARCHAR NOT NULL REFERENCES SEAT_TYPE (TYPE),
    COUNT       INTEGER NOT NULL CHECK ( COUNT > 0 ),

    CONSTRAINT AIRPLANE_SEATS_COUNT_UNIQUE
        UNIQUE (AIRPLANE_ID, SEAT_TYPE)
);

CREATE OR REPLACE FUNCTION SEATS_COUNT_CHECK() RETURNS TRIGGER AS
$emp_stamp$
BEGIN
    IF (SELECT SUM(C.COUNT) + NEW.COUNT > MAX_SEATS_COUNT
        FROM AIRPLANE A
                 JOIN AIRPLANE_MODEL AM ON AM.ID = A.MODEL_ID
                 LEFT JOIN AIRPLANE_SEATS_COUNT C ON A.ID = C.AIRPLANE_ID
        WHERE A.ID = NEW.AIRPLANE_ID
        GROUP BY (AIRPLANE_ID, MAX_SEATS_COUNT))
    THEN
        RAISE EXCEPTION 'Summary seats count in airplane cannot exceed model seats limit';
    END IF;
    RETURN NEW;
END;
$emp_stamp$ LANGUAGE PLPGSQL;

CREATE TRIGGER SEATS_COUNT_CHECK_TRIGGER
    BEFORE INSERT OR UPDATE
    ON AIRPLANE_SEATS_COUNT
    FOR EACH ROW
EXECUTE PROCEDURE SEATS_COUNT_CHECK();

CREATE TABLE PERSON
(
    ID          INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1),
    USERNAME    VARCHAR(40) NOT NULL UNIQUE,
    PASSWORD    VARCHAR(40) NOT NULL,
    FIRST_NAME  VARCHAR(40) NOT NULL,
    MIDDLE_NAME VARCHAR(40),
    LAST_NAME   VARCHAR(40) NOT NULL,
    ROLE        VARCHAR     NOT NULL
);

CREATE TABLE AIRPORT
(
    ID      INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1),
    NAME    VARCHAR(30) NOT NULL UNIQUE,
    COUNTRY VARCHAR(30) NOT NULL,
    CITY    VARCHAR(30) NOT NULL
);

CREATE TABLE ROUTE
(
    ID                     INTEGER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
    AIRPLANE_ID            INTEGER NOT NULL REFERENCES AIRPLANE (ID),
    DESTINATION_AIRPORT_ID INTEGER NOT NULL REFERENCES AIRPORT (ID),
    DEPARTURE_AIRPORT_ID   INTEGER NOT NULL REFERENCES AIRPORT (ID),


    CONSTRAINT ROUTE_UNIQUE UNIQUE
        (AIRPLANE_ID, DEPARTURE_AIRPORT_ID, DESTINATION_AIRPORT_ID)
);

CREATE TABLE ROUTE_SEAT_PRICE
(
    ID        INTEGER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
    ROUTE_ID  INTEGER NOT NULL REFERENCES ROUTE (ID),
    SEAT_TYPE VARCHAR NOT NULL REFERENCES SEAT_TYPE (TYPE),
    PRICE     DECIMAL NOT NULL
);

CREATE TABLE FLIGHT
(
    ID                       INTEGER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
    ROUTE_ID                 INTEGER   NOT NULL REFERENCES ROUTE (ID),
    SCHEDULED_DEPARTURE_TIME TIMESTAMP NOT NULL,
    SCHEDULED_ARRIVAL_TIME   TIMESTAMP NOT NULL,
    ACTUAL_ARRIVAL_TIME      TIMESTAMP,
    ACTUAL_DEPARTURE_TIME    TIMESTAMP
);

CREATE TABLE BOOKING
(
    ID          INTEGER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
    PERSON_ID   INTEGER NOT NULL REFERENCES PERSON (ID),
    FLIGHT_ID   INTEGER NOT NULL REFERENCES FLIGHT (ID),
    SEAT_TYPE   VARCHAR NOT NULL REFERENCES SEAT_TYPE (TYPE),
    SEAT_NUMBER INTEGER NOT NULL CHECK ( SEAT_NUMBER > 0 ),

    CONSTRAINT UNIQUE_BOOKING
        UNIQUE (FLIGHT_ID, SEAT_NUMBER, SEAT_TYPE)
);


DROP VIEW IF EXISTS FLIGHT_FREE_SEATS_COUNT;
CREATE OR REPLACE VIEW FLIGHT_FREE_SEATS_COUNT AS
(
SELECT F.ID                           AS FLIGHT_ID,
       C.SEAT_TYPE,
       C.COUNT - COUNT(B.SEAT_NUMBER) AS FREE_SEATS_COUNT
FROM FLIGHT F
         LEFT OUTER JOIN ROUTE R ON R.ID = F.ROUTE_ID
         LEFT JOIN AIRPLANE A ON A.ID = R.AIRPLANE_ID
         LEFT JOIN AIRPLANE_SEATS_COUNT C ON A.ID = C.AIRPLANE_ID
         LEFT JOIN BOOKING B ON F.ID = B.FLIGHT_ID
GROUP BY (F.ID, C.COUNT, C.SEAT_TYPE));

CREATE OR REPLACE FUNCTION FLIGHT_FREE_SEATS(A_SEAT_TYPE VARCHAR,
                                             A_FLIGHT_ID INTEGER)
    RETURNS TABLE (SEAT_NUMBER INTEGER)
AS
$$
BEGIN
    RETURN QUERY
        SELECT generate_series(1, ASC2.COUNT) SEAT_NUMBER
        FROM FLIGHT F
                 LEFT JOIN ROUTE R2 ON R2.ID = F.ROUTE_ID
                 LEFT JOIN AIRPLANE A2 ON R2.AIRPLANE_ID = A2.ID
                 LEFT JOIN AIRPLANE_SEATS_COUNT ASC2 ON A2.ID = ASC2.AIRPLANE_ID
        WHERE ASC2.SEAT_TYPE = A_SEAT_TYPE
          AND F.ID = A_FLIGHT_ID
            EXCEPT
        SELECT B.SEAT_NUMBER
        FROM BOOKING B
                 LEFT JOIN FLIGHT F ON F.ID = B.FLIGHT_ID
                 LEFT JOIN ROUTE R ON F.ROUTE_ID = R.ID
                 LEFT JOIN AIRPLANE A ON R.AIRPLANE_ID = A.ID
                 LEFT JOIN AIRPLANE_SEATS_COUNT C ON A.ID = C.AIRPLANE_ID AND B.SEAT_TYPE = C.SEAT_TYPE
        WHERE B.SEAT_TYPE = A_SEAT_TYPE
          AND F.ID = A_FLIGHT_ID
        ORDER BY SEAT_NUMBER;
END;
$$ LANGUAGE PLPGSQL;

CREATE FUNCTION CHECK_BOOKING_SEATS() RETURNS TRIGGER AS
$emp_stamp$
BEGIN
    IF (SELECT NEW.SEAT_NUMBER > C.COUNT
        FROM FLIGHT F
                 JOIN ROUTE R ON R.ID = F.ROUTE_ID
                 JOIN AIRPLANE A ON A.ID = R.AIRPLANE_ID
                 JOIN AIRPLANE_SEATS_COUNT C
                      ON A.ID = C.AIRPLANE_ID
                          AND C.SEAT_TYPE = NEW.SEAT_TYPE
        WHERE F.ID = NEW.FLIGHT_ID)
    THEN
        RAISE EXCEPTION 'Seat number exceed total seats number';
    END IF;
    RETURN NEW;
END;
$emp_stamp$ LANGUAGE PLPGSQL;

CREATE TRIGGER CHECK_BOOKING_SEATS_TRIGGER
    BEFORE INSERT OR UPDATE
    ON BOOKING
    FOR EACH ROW
EXECUTE PROCEDURE CHECK_BOOKING_SEATS();
