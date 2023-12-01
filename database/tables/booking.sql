CREATE TABLE IF NOT EXISTS booking(
    id uuid PRIMARY KEY ,
    name VARCHAR(255) NOT NULL ,
    phone_number VARCHAR(20) NOT NULL ,
    date timestamp NOT NULL ,
    rental_point_id INTEGER references rental_point(id) ,
    user_id INTEGER references rental_user(id) ,
    booking_status_id INTEGER references booking_status(id)
);
