-- -------------------------------------------------------------
-- ---DEFAUTL DATA (If Admin side add these insertion, we can remove from here)--------------------
-- ----------------------------------------------------------------


-- venue type
INSERT INTO venue_type (venue_type) VALUES("private_party");
insert into venue_type (venue_type) values('sport');
insert into venue_type (venue_type) values('dining');
insert into venue_type (venue_type) values('workshop');
insert into venue_type (venue_type) values('indoor');
insert into venue_type (venue_type) values('outdoor');

-- user admin data for event to run. 
insert into user values('1011', 'admin', 'test', 'admintest@test.com', 'test', 'test', '93424', '$2b$10$9YqB7/S5KvMHr3yiu2PK.uzXBVgxIqhXJdiMNLubYg7QhsrFr37c6', b'1', 'Active');

-- venue data


INSERT INTO venue (venue_id, venue_name, venue_type) VALUES (1001,"Hall 01","private_party");
INSERT INTO venue (venue_id, venue_name, venue_type) VALUES (1002,"Hall 02","private_party");
INSERT INTO venue (venue_id, venue_name, venue_type) VALUES (1003,"Hall 03","private_party");

insert into venue (venue_id, venue_name,venue_type) values(1004,'Basket Ball Court', 'sport');
insert into venue (venue_id, venue_name,venue_type) values(1005,'Tennis Court', 'sport');
insert into venue (venue_id, venue_name,venue_type) values(1006,'Table Tennis Room', 'sport');
insert into venue (venue_id, venue_name,venue_type) values(1007,'Swimming Pool', 'sport');
insert into venue (venue_id, venue_name,venue_type) values(1008,'Kids Pool', 'sport');
insert into venue (venue_id, venue_name,venue_type) values(1009,'Billiard Room', 'sport');
insert into venue (venue_id, venue_name,venue_type) values(1010,'Archery Field', 'sport');
insert into venue (venue_id, venue_name,venue_type) values(1011,'Golf Course', 'sport');
insert into venue (venue_id, venue_name,venue_type) values(1012,'Yoga Room', 'sport');

insert into venue (venue_id, venue_name,venue_type) values(1013,'Dining-1', 'dining');
insert into venue (venue_id, venue_name,venue_type) values(1014,'Dining-2', 'dining');
insert into venue (venue_id, venue_name,venue_type) values(1015,'Dining-3', 'dining');
insert into venue (venue_id, venue_name,venue_type) values(1016,'Dining-4', 'dining');

insert into venue (venue_id, venue_name, venue_type) values (1017,'book reading','indoor');
insert into venue (venue_id, venue_name, venue_type) values (1018,'book reading','outdoor');
insert into venue (venue_id, venue_name, venue_type) values (1019,'book reading','workshop');

-- membership_type
INSERT INTO membership_type (type_id, name, description) VALUES (0, "Silver", "eligible to participate in all events");
INSERT INTO membership_type (type_id, name, description) VALUES (1, "Gold", "Silver user privileges + elgible to enroll 2 dependents");
INSERT INTO membership_type (type_id, name, description) VALUES (2, "Platinum", "Gold user privileges + access to organize own private events");

-- 1001: admin, 1002: silver, 1003: gold, 1004: platinum, 1005: expired, 1006: pending; password - admin
INSERT INTO user (user_id, f_name, l_name, email_id, street, city, zip_code, password, auth_id, status) VALUES ('1001', 'admin', '1', 'admin@gmail.com', 'admin', 'admin', '12345', '$2b$10$9YqB7/S5KvMHr3yiu2PK.uzXBVgxIqhXJdiMNLubYg7QhsrFr37c6', b'1', 'Active');
INSERT INTO user (user_id, f_name, l_name, email_id, street, city, zip_code, password, auth_id, status) VALUES ('1002', 'silver', '1', 'silver@gmail.com', 'silver', 'silver', '12345', '$2b$10$9YqB7/S5KvMHr3yiu2PK.uzXBVgxIqhXJdiMNLubYg7QhsrFr37c6', b'0', 'Active');
INSERT INTO member (user_id, membership_type, start_date, end_date) VALUES (1002, 0, "2021-05-01", "2021-11-03");
INSERT INTO user (user_id, f_name, l_name, email_id, street, city, zip_code, password, auth_id, status) VALUES ('1003', 'gold', '1', 'gold@gmail.com', 'gold', 'gold', '12345', '$2b$10$9YqB7/S5KvMHr3yiu2PK.uzXBVgxIqhXJdiMNLubYg7QhsrFr37c6', b'0', 'Active');
INSERT INTO member (user_id, membership_type, start_date, end_date) VALUES (1003, 1, "2021-05-01", "2021-11-03");
INSERT INTO user (user_id, f_name, l_name, email_id, street, city, zip_code, password, auth_id, status) VALUES ('1004', 'platinum', '2', 'platinum@gmail.com', 'platinum', 'platinum', '12345', '$2b$10$9YqB7/S5KvMHr3yiu2PK.uzXBVgxIqhXJdiMNLubYg7QhsrFr37c6', b'0', 'Active');
INSERT INTO member (user_id, membership_type, start_date, end_date) VALUES (1004, 2, "2021-05-01", "2021-11-03");
INSERT INTO user (user_id, f_name, l_name, email_id, street, city, zip_code, password, auth_id, status) VALUES ('1005', 'expired', '2', 'expired@gmail.com', 'expired', 'expired', '12345', '$2b$10$9YqB7/S5KvMHr3yiu2PK.uzXBVgxIqhXJdiMNLubYg7QhsrFr37c6', b'0', 'Expired');
INSERT INTO member (user_id, membership_type, start_date, end_date) VALUES (1005, 2, "2021-05-01", "2021-05-01");
INSERT INTO user (user_id, f_name, l_name, email_id, street, city, zip_code, password, auth_id, status) VALUES ('1006', 'pending', '2', 'pending@gmail.com', 'pending', 'pending', '12345', '$2b$10$9YqB7/S5KvMHr3yiu2PK.uzXBVgxIqhXJdiMNLubYg7QhsrFr37c6', b'0', 'Pending');
INSERT INTO member (user_id, membership_type, start_date, end_date) VALUES (1006, 2, "2021-05-01", "2021-11-01");
INSERT INTO user (user_id, f_name, l_name, email_id, street, city, zip_code, password, auth_id, status) VALUES ('10', 'pending', '2', 'pending@gmail.com', 'pending', 'pending', '12345', '$2b$10$9YqB7/S5KvMHr3yiu2PK.uzXBVgxIqhXJdiMNLubYg7QhsrFr37c6', b'0', 'Pending');

-- sports data
insert into sports (s_name, venue_id, start_time, end_time) values('Basket Ball', 1004, '08:00:00','20:00:00');
insert into sports (s_name, venue_id, start_time, end_time) values('Tennis', 1005, '09:00:00','18:00:00');
insert into sports (s_name, venue_id, start_time, end_time) values('Table Tennis', 1006, '08:00:00','20:00:00');
insert into sports (s_name, venue_id, start_time, end_time) values('Swimming', 1007, '10:00:00','19:00:00');
insert into sports (s_name, venue_id, start_time, end_time) values('Swimming-kid', 1008, '12:00:00','18:00:00');
insert into sports (s_name, venue_id, start_time, end_time) values('Billiard', 1009, '08:00:00','20:00:00');
insert into sports (s_name, venue_id, start_time, end_time) values('Archery', 1010, '11:00:00','16:00:00');
insert into sports (s_name, venue_id, start_time, end_time) values('Golf', 1011, '08:00:00','16:00:00');
insert into sports (s_name, venue_id, start_time, end_time) values('Yoga', 1012, '08:00:00','11:00:00');

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

-- Event test data
insert into event values('1010', 'Rise n shine', 'Seminar on holistic and mindful living', '2021-05-08', '2021-05-09', 'confirmed', 1017, '20', null, '1011');
insert into event values('1020', 'Part of Art', 'Art displays of local independent artists', '2021-05-01', '2021-05-02', 'confirmed', 1018, '50', null, '1011');
insert into event values('1021', 'World on my Plate', 'Food festival and fair where foods across cultures would be offered', '2021-05-08', '2021-05-09', 'confirmed', 1019, '50', null, '1011');



-- Dining 
insert into dining (type,venue_id,capacity,	start_time ,end_time) values ('Breakfast',1013,50,'07:00:00','10:00:00'); 
insert into dining (type,venue_id,capacity,	start_time ,end_time) values ('Brunch',1014,100,'10:00:00','11:00:00'); 
insert into dining (type,venue_id,capacity,	start_time ,end_time) values ('Lunch',1015,100,'12:00:00','15:00:00'); 
insert into dining (type,venue_id,capacity,	start_time ,end_time) values ('Dinner',1016,80,'20:00:00','22:00:00'); 

