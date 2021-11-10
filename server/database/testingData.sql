-- test data

-- user (f_name, l_name, email_id, street, city, zip_code, password, auth_id, status)
insert into user (f_name, l_name, email_id, street, city, zip_code, password, auth_id, status) values('John', 'Smith', 'j.smi@g.com', 'Saint James Street', 'San Jose', '95101', 'pass@1234$', 0,'cancelled');
insert into user (f_name, l_name, email_id, street, city, zip_code, password, auth_id, status) values('Melissa', 'Jones', 'mj@g.com', 'Cahill Street', 'San Jose', '95106', 'pass@1234$', 0, 'confirmed');
insert into user (f_name, l_name, email_id, street, city, zip_code, password, auth_id, status) values('Amit', 'Singh', 'am.singh@g.com', 'Almaden Blvd', 'San Jose', '95110', 'pass@1234$', 0, 'confirmed');
insert into user (f_name, l_name, email_id, street, city, zip_code, password, auth_id, status) values('Peter', 'Parker', 'spidey@g.com', 'North 6th Street', 'San Jose', '95112', 'pass@1234$', 0, 'confirmed');
insert into user (f_name, l_name, email_id, street, city, zip_code, password, auth_id, status) values('Radhika', 'Salins', 'rd.s@g.com', 'Julian Street', 'San Jose', '95110', 'pass@1234$', 0, 'confirmed');
insert into user (f_name, l_name, email_id, street, city, zip_code, password, auth_id, status) values('Monica', 'Rao', 'moni@g.com', 'Reed Street', 'San Jose', '95113', 'pass@1234$', 0, 'pending');
insert into user (f_name, l_name, email_id, street, city, zip_code, password, auth_id, status) values('Deam', 'Thomas', 'dean@g.com', 'North 6th Street', 'San Jose', '95112', 'pass@1234$', 0, 'pending');

-- status
-- insert into status values('confirmed');
-- insert into status values('pending');
-- insert into status values('cancelled');

-- member (user_id, membership_type, start_date, end_date)
insert into member values(1002, 1, '2019-05-01', '2020-04-30');
insert into member values(1003, 1, '2021-01-01', '2021-12-31');
insert into member values(1004, 2, '2021-04-05', '2022-04-04');
insert into member values(1005, 0, '2020-10-17', '2021-10-16');
insert into member values(1006, 2, '2021-04-17', '2022-04-16');
insert into member values(1007, 1, '2021-04-17', '2022-04-16');
-- insert into member values(1008, 'platinum', '2021-02-01', '2022-01-31');

-- membership_type
INSERT INTO membership_type (type_id, name, description) VALUES (0, "Silver", "Can book all events except private hall");
INSERT INTO membership_type (type_id, name,  description) VALUES (1, "Gold", "Can book all events");
INSERT INTO membership_type (type_id, name,  description) VALUES (2, "Platinum", "Can book all events & ");

-- dependent (name, user_id, relationship)
insert into dependent values('Monica', 1002, 'spouse');
insert into dependent values('Steven', 1003, 'spouse');
insert into dependent values('Preti', 1004, 'spouse');
insert into dependent values('Aneesh', 1004, 'child');
insert into dependent values('Priya', 1004, 'child');
insert into dependent values('Jacob', 1006, 'spouse');
insert into dependent values('Steven', 1006, 'child');
insert into dependent values('Monica', 1006, 'child');
insert into dependent values('Jessica', 1006, 'child');
insert into dependent values('Abhay', 1007, 'parent');

-- relationship
insert into relationship values('spouse');
insert into relationship values('child');
insert into relationship values('parent');
insert into relationship values('sibling');
insert into relationship values('others');

-- venue (venue_name, venue_type)
insert into venue (venue_name, venue_type) values('Basket Ball Court', 'sport');
insert into venue (venue_name, venue_type) values('Swimming Pool', 'sport');
insert into venue (venue_name, venue_type) values('The Glass Door', 'dining');
insert into venue (venue_name, venue_type) values('Club Cafe', 'dining');
insert into venue (venue_name, venue_type) values('Rose', 'ballroom');
insert into venue (venue_name, venue_type) values('Grande', 'ballroom');
insert into venue (venue_name, venue_type) values('Tenis Court', 'sport');
insert into venue (venue_name, venue_type) values('Recreation Center', 'sport');
insert into venue (venue_name, venue_type) values('Skyline', 'lounge');
insert into venue (venue_name, venue_type) values('Focus', 'workshop');
insert into venue (venue_name, venue_type) values('Garden', 'ground');
insert into venue (venue_name, venue_type) values('Kid Pool', 'sport');
insert into venue (venue_name, venue_type) values('Golf Course', 'sport');

-- venue_type
insert into venue_type values('sport');
insert into venue_type values('dining');
insert into venue_type values('ballroom');
insert into venue_type values('lounge');
insert into venue_type values('workshop');
insert into venue_type values('ground');

-- sports (s_name, venue_id, start_time, end_time)
insert into sports (s_name, venue_id, start_time, end_time) values('Basket Ball', 1001, '08:00:00','20:00:00');
insert into sports (s_name, venue_id, start_time, end_time) values('Tennis', 1, '09:00:00','18:00:00');
insert into sports (s_name, venue_id, start_time, end_time) values('Table Tennis', 2, '08:00:00','20:00:00');
insert into sports (s_name, venue_id, start_time, end_time) values('Swimming', 1001, '10:00:00','19:00:00');
insert into sports (s_name, venue_id, start_time, end_time) values('Swimming-kid', 1, '12:00:00','18:00:00');
insert into sports (s_name, venue_id, start_time, end_time) values('Billiard', 2, '08:00:00','20:00:00');
insert into sports (s_name, venue_id, start_time, end_time) values('Archery', 1001, '11:00:00','16:00:00');
insert into sports (s_name, venue_id, start_time, end_time) values('Golf', 1, '08:00:00','16:00:00');
insert into sports (s_name, venue_id, start_time, end_time) values('Yoga', 2, '08:00:00','11:00:00');

-- time_slot (start_time, end_time)
insert into time_slot (start_time, end_time) values('08:00:00','09:00:00');
insert into time_slot (start_time, end_time) values('09:00:00','10:00:00');
insert into time_slot (start_time, end_time) values('10:00:00','11:00:00');
insert into time_slot (start_time, end_time) values('11:00:00','12:00:00');
insert into time_slot (start_time, end_time) values('12:00:00','13:00:00');
insert into time_slot (start_time, end_time) values('13:00:00','14:00:00');
insert into time_slot (start_time, end_time) values('14:00:00','15:00:00');
insert into time_slot (start_time, end_time) values('15:00:00','16:00:00');
insert into time_slot (start_time, end_time) values('16:00:00','17:00:00');
insert into time_slot (start_time, end_time) values('17:00:00','18:00:00');
insert into time_slot (start_time, end_time) values('18:00:00','19:00:00');
insert into time_slot (start_time, end_time) values('19:00:00','20:00:00');

-- sport_time(ts_id,sport_id)
-- Basket Ball(08:00:00-20:00:00)
insert into sport_time values(1001,1001);
insert into sport_time values(1002,1001);
insert into sport_time values(1003,1001);
insert into sport_time values(1004,1001);
insert into sport_time values(1005,1001);
insert into sport_time values(1006,1001);
insert into sport_time values(1007,1001);
insert into sport_time values(1008,1001);
insert into sport_time values(1009,1001);
insert into sport_time values(1010,1001);
insert into sport_time values(1011,1001);
insert into sport_time values(1012,1001);

-- Tennis(09:00:00-18:00:00)
insert into sport_time values(1002,1002);
insert into sport_time values(1003,1002);
insert into sport_time values(1004,1002);
insert into sport_time values(1005,1002);
insert into sport_time values(1006,1002);
insert into sport_time values(1007,1002);
insert into sport_time values(1008,1002);
insert into sport_time values(1009,1002);
insert into sport_time values(1010,1002);

-- Basket Ball(08:00:00-20:00:00)
insert into sport_time values(1001,1003);
insert into sport_time values(1002,1003);
insert into sport_time values(1003,1003);
insert into sport_time values(1004,1003);
insert into sport_time values(1005,1003);
insert into sport_time values(1006,1003);
insert into sport_time values(1007,1003);
insert into sport_time values(1008,1003);
insert into sport_time values(1009,1003);
insert into sport_time values(1010,1003);
insert into sport_time values(1011,1003);
insert into sport_time values(1012,1003);

-- Swimming (10:00:00-19:00:00)
insert into sport_time values(1003,1004);
insert into sport_time values(1004,1004);
insert into sport_time values(1005,1004);
insert into sport_time values(1006,1004);
insert into sport_time values(1007,1004);
insert into sport_time values(1008,1004);
insert into sport_time values(1009,1004);
insert into sport_time values(1010,1004);
insert into sport_time values(1011,1004);

-- Swimming-kid(12:00:00-18:00:00)
insert into sport_time values(1005,1005);
insert into sport_time values(1006,1005);
insert into sport_time values(1007,1005);
insert into sport_time values(1008,1005);
insert into sport_time values(1009,1005);
insert into sport_time values(1010,1005);


-- Billiard (08:00:00-20:00:00)
insert into sport_time values(1001,1006);
insert into sport_time values(1002,1006);
insert into sport_time values(1003,1006);
insert into sport_time values(1004,1006);
insert into sport_time values(1005,1006);
insert into sport_time values(1006,1006);
insert into sport_time values(1007,1006);
insert into sport_time values(1008,1006);
insert into sport_time values(1009,1006);
insert into sport_time values(1010,1006);
insert into sport_time values(1011,1006);
insert into sport_time values(1012,1006);

-- Archery (11:00:00-16:00:00)
insert into sport_time values(1004,1007);
insert into sport_time values(1005,1007);
insert into sport_time values(1006,1007);
insert into sport_time values(1007,1007);
insert into sport_time values(1008,1007);

-- Golf (08:00:00-16:00:00)
insert into sport_time values(1001,1008);
insert into sport_time values(1002,1008);
insert into sport_time values(1003,1008);
insert into sport_time values(1004,1008);
insert into sport_time values(1005,1008);
insert into sport_time values(1006,1008);
insert into sport_time values(1007,1008);
insert into sport_time values(1008,1008);

-- Yoga (08:00:00-11:00:00)
insert into sport_time values(1001,1009);
insert into sport_time values(1002,1009);
insert into sport_time values(1003,1009);

-- sports_booking: will added when functionality is activated

-- event (event_name, e_description, start_date, end_date, status, venue_id, capacity, no_of_participants, organized_by)
insert into event (event_name, e_description, start_date, end_date, status, venue_id, capacity, no_of_participants, organized_by) values('Part of Art', 'Art displays of local independent artists', '2021-05-01', '2021-05-02', 'confirmed', 1005, 50, 0, 1001);
insert into event (event_name, e_description, start_date, end_date, status, venue_id, capacity, no_of_participants, organized_by) values('World on my Plate', 'Food festival and fair where foods across cultures would be offered', '2021-05-08', '2021-05-09', 'confirmed', 1011, 50, 0, 1001);
insert into event (event_name, e_description, start_date, end_date, status, venue_id, capacity, no_of_participants, organized_by) values('Rise n shine', 'Seminar on holistic and mindful living', '2021-05-08', '2021-05-09', 'confirmed', 1005, 30, 0, 1001);

-- event_booking: will be added when functionality will be activated

-- dining (type, venue_id, capacity, start_time, end_time)
insert into dining (type, venue_id, capacity, start_time, end_time) values('breakfast', 1004, 20, '08:00:00','12:00:00');
insert into dining (type, venue_id, capacity, start_time, end_time) values('lunch', 1003, 20, '13:00:00','16:00:00');
insert into dining (type, venue_id, capacity, start_time, end_time) values('lunch', 1004, 20, '13:00:00','16:00:00');
insert into dining (type, venue_id, capacity, start_time, end_time) values('diner', 1003, 20, '18:00:00','22:00:00');
insert into dining (type, venue_id, capacity, start_time, end_time) values('diner', 1004, 20, '18:00:00','22:00:00');

-- reservation: will be added when functionality will be activated

-- party (hosted_by, p_name, hosted_at, start_date, end_date, no_of_attendees, status)
insert into party (hosted_by, p_name, hosted_at, start_date, end_date, no_of_attendees, status) values(1004, '10th Anniversary', 1006, '2021-05-09', '2021-05-09', 40, 'confirmed')
