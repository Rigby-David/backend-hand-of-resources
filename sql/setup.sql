-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS discs;

CREATE TABLE discs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR,
    type VARCHAR,
    speed INT,
    glide INT
)

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
