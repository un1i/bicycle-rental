CREATE TABLE IF NOT EXISTS trip (
    id uuid PRIMARY KEY references booking(id) ,
    date_start timestamp NOT NULL ,
    date_finis timestamp ,
    cost INTEGER,
    rental_point_finish_id INTEGER references rental_point(id) ,
    status_id INTEGER references trip_status(id)
);
