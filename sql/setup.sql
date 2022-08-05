-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS discs;
DROP TABLE IF EXISTS pros;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS movies;

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

CREATE TABLE courses (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR,
    location VARCHAR,
    rating INT
);

INSERT INTO courses (
    name,
    location,
    rating
)

VALUES
    ('Maple Hill', 'Massachusetts', 1),
    ('Krokhol', 'Norway', 2),
    ('Hillcrest', 'Canada', 3),
    ('Brewser Ridge', 'Vermont', 6),
    ('McIver', 'Estacada', 24);

CREATE TABLE movies (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR,
    director VARCHAR,
    genre VARCHAR,
    released INT
);

INSERT INTO movies (
    title,
    director,
    released,
    genre
)

VALUES
    ('Bullet Train', 'David Leitch', 2022, 'Action'),
    ('The Lost City', 'Aaron Nee & Adam Nee', 2022, 'Comedy, Action'),
    ('Lightyear', 'Angus McLane', 2022, 'Comedy, Action'),
    ('Everything Everywhere All At Once', 'Daniel Kwan, Daniel Scheinert', 2022, 'Comedy, Action');