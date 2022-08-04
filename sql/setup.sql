-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS discs;
DROP TABLE IF EXISTS pros;

CREATE TABLE discs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR,
    type VARCHAR,
    speed INT,
    glide INT
);

INSERT INTO discs (
    name,
    type,
    speed,
    glide
)

VALUES
    ('Wraith', 'Driver', 11, 5),
    ('Whale', 'Putter', 2, 3),
    ('Buzzz', 'Midrange', 5, 4),
    ('Nuke', 'Driver', 13, 5),
    ('Explorer', 'Driver', 7, 5),
    ('Raptor', 'Driver', 9, 4);


CREATE TABLE pros (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR,
    pob VARCHAR,
    dob INT
);

INSERT INTO pros (
    name,
    pob,
    dob
)

VALUES
    ('Paul McBeth', 'California', 1990),
    ('Richard Wysocki', 'South Carolina', 1993),
    ('Nate Sexton', 'Washington', 1985),
    ('James Conrad', 'Virginia', 1990),
    ('Jeremy Koling', 'North Carolina', 1985);

