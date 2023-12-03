CREATE TABLE IF NOT EXISTS booking(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL ,
    phone_number VARCHAR(20) NOT NULL ,
    date timestamp NOT NULL ,
    rental_point_id INTEGER references rental_point(id) ,
    user_id INTEGER references rental_user(id) ,
    bicycle_id INTEGER references bicycle(id),
    booking_status_id INTEGER references booking_status(id)
);
