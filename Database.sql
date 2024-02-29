DROP DATABASE IF EXISTS `umbrella`;
CREATE DATABASE `umbrella`;
USE `umbrella`;

CREATE TABLE `user` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`username` VARCHAR(50) UNIQUE,
	`password` VARCHAR(50) NOT NULL,
	`contact_no` VARCHAR(20) UNIQUE,
	`primary_email` VARCHAR(50) UNIQUE,
	`google_email` VARCHAR(50) UNIQUE,
	`github_username` VARCHAR(50) UNIQUE,
	`firstname` VARCHAR(50) NOT NULL,
	`lastname` VARCHAR(50) NOT NULL,
	`gender` VARCHAR(50),
	`date_of_birth` DATE,
	`profile_picture` VARCHAR(500)
);
CREATE TABLE `campus` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`name` VARCHAR(100) NOT NULL UNIQUE,
	`address` VARCHAR(255) NOT NULL,
	`city` VARCHAR(100) NOT NULL,
	`state` VARCHAR(100) NOT NULL,
	`country` VARCHAR(100) NOT NULL,
	`pincode` VARCHAR(10) NOT NULL
	-- `building_count` INT NOT NULL,
	-- `floor_count` INT NOT NULL,
	-- `room_count` INT NOT NULL,
);
CREATE TABLE `building` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`number` INT NOT NULL,
	-- `name` VARCHAR(100) NOT NULL UNIQUE,
	-- `floor_count` INT NOT NULL,
	-- `room_count` INT NOT NULL,
	`campus_id` INT NOT NULL,
	-- PRIMARY KEY (`campus_id`, `number`)
	FOREIGN KEY (`campus_id`) REFERENCES campus(id)
);
CREATE TABLE `floor` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`number` INT NOT NULL,
	-- `room_count` INT NOT NULL,
	`building_id` INT NOT NULL,
	-- `building_number` INT NOT NULL,
	-- PRIMARY KEY (`building_number`, `number`),
	-- FOREIGN KEY (`campus_number`, `building_number`) REFERENCES building(`campus_id`, `number`)
	FOREIGN KEY (`building_id`) REFERENCES building(id)
);
CREATE TABLE `room` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`number` INT NOT NULL,
	`floor_id` INT NOT NULL,
	`type` VARCHAR(255), -- classroom, lab, office, conference, washroom, store, library, canteen, auditorium, utility
	`capacity` INT,
	-- `floor_number` INT NOT NULL,
	-- `building_number` INT NOT NULL,
	-- `campus_id` INT NOT NULL REFERENCES campus(id)
	-- PRIMARY KEY (`campus_id`, `building_number`, `floor_number`, `number`),
	-- FOREIGN KEY (`building_number`, `floor_number`) REFERENCES floor(`building_number`, `number`)
	FOREIGN KEY (`floor_id`) REFERENCES floor(id)
);
CREATE TABLE `computer_lab` (
	`room_id` INT NOT NULL,
	`number_of_computers` INT NOT NULL,
	FOREIGN KEY (`room_id`) REFERENCES room(id)
);
CREATE TABLE `hostel` (
	`room_id` INT NOT NULL,
	`number_of_beds` INT NOT NULL,
	FOREIGN KEY (`room_id`) REFERENCES room(id)
);
CREATE TABLE `event` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`name` VARCHAR(255) NOT NULL UNIQUE,
	`description` TEXT NOT NULL,
	`start_date` DATE NOT NULL,
	`end_date` DATE NOT NULL,
	`start_time` TIME NOT NULL,
	`end_time` TIME NOT NULL,
	`venue` VARCHAR(255) NOT NULL,
	`organizer` VARCHAR(255) NOT NULL
);
CREATE TABLE `department` (
 	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
 	`name` VARCHAR(255) NOT NULL UNIQUE,
	`name_acronym` VARCHAR(255) NOT NULL UNIQUE,
	`building_id` INT NOT NULL,
	FOREIGN KEY (`building_id`) REFERENCES building(id)
);
CREATE TABLE `degree` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`name` VARCHAR(255) NOT NULL UNIQUE,
	`name_acronym` VARCHAR(255) NOT NULL UNIQUE,
	`type` ENUM('Diploma', 'Bachelor', 'Master', 'Doctorate', 'Integrated') NOT NULL, -- Diploma, UG, PG, PhD
	`years` INT(4) NOT NULL,
	-- `degree_category` ENUM('regular', 'distance', 'open', 'part-time', 'full-time', 'sponsored', 'management', 'NRI', 'foreign') NOT NULL,
	-- branch
	-- `stream` ENUM('Arts', 'Business', 'Commerce', 'Engineering', 'Science', 'IT', 'Medical', 'Law', 'Management', 'Education') NOT NULL,
	`department_id` INT NOT NULL,
	FOREIGN KEY (`department_id`) REFERENCES department(id)
);
CREATE TABLE `syllabus` ( -- program -- revision -- edition -- version -- variation -- iteration
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`year_effective` INT(4) NOT NULL,
	`year_retired` INT(4),
	`number_of_years` INT(2) NOT NULL,
	`number_of_semesters` INT(2) NOT NULL,
	`degree_id` INT NOT NULL,
	FOREIGN KEY (`degree_id`) REFERENCES degree(id)
);
CREATE TABLE `course` ( -- subject
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`code` VARCHAR(255) NOT NULL,
	`name` VARCHAR(255) NOT NULL,
	`type` ENUM('theory', 'practical')
);
CREATE TABLE `syllabus_course` (
	`syllabus_id` INT NOT NULL,
	`course_id` INT NOT NULL,
	`credits` INT NOT NULL,
	`category` ENUM('core', 'elective', 'project', 'MOOC', 'foundation'),
	`semester_number` INT NOT NULL,
	PRIMARY KEY (`syllabus_id`, `course_id`),
	FOREIGN KEY (`syllabus_id`) REFERENCES syllabus(id),
	FOREIGN KEY (`course_id`) REFERENCES course(id)
);
CREATE TABLE `admission` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`admission_date` DATE NOT NULL,
	`admission_type` VARCHAR(255) NOT NULL, -- regular, lateral, direct, transfer, distance, open, part-time, full-time, sponsored, management, NRI, foreign
	`admission_category` VARCHAR(255) NOT NULL, -- general, SC, ST, OBC, EWS, PWD, ESM, TFW, NCC, NSS, Sports, Cultural, Defence, Freedom Fighter, Single
	`admission_quota` VARCHAR(255) NOT NULL, -- merit, management, NRI, foreign, sponsored, government, private, minority, linguistic, religious, caste, community, region, state, district, rural, urban, poor, rich, orphan, single
	`admission_status` VARCHAR(255) NOT NULL, -- applied, approved, rejected, waitlisted, confirmed, cancelled, withdrawn, transferred, migrated, promoted, graduated, passed, failed, detained, expelled, suspended, rusticated, debarred, barred, blacklisted, banned, disbarred, disqualified
	`user_id` INT NOT NULL,
	`degree_id` INT NOT NULL,
	`syllabus_id` INT NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES user(id),
	FOREIGN KEY (`degree_id`) REFERENCES degree(id),
	FOREIGN KEY (`syllabus_id`) REFERENCES syllabus(id)
);
CREATE TABLE `batch` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`year_started` INT(4) NOT NULL,
	`year_ended` INT(4) NOT NULL,
	`current_semester` INT(2) NOT NULL,
	`syllabus_id` INT NOT NULL,
	FOREIGN KEY (`syllabus_id`) REFERENCES syllabus(id)
);
CREATE TABLE `division` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`name` VARCHAR(255) NOT NULL,
	`batch_id` INT NOT NULL,
	-- PRIMARY KEY (`name`, `batch_id`)
	FOREIGN KEY (`batch_id`) REFERENCES batch(id)
);
CREATE TABLE `batch_user` ( --division_user enrollment student
	`enrollment_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	-- `roll_number` VARCHAR(255) NOT NULL,
	`user_id` INT NOT NULL,
	`batch_id` INT NOT NULL,
	`division_id` INT NOT NULL,
	-- PRIMARY KEY (`user_id`, `batch_id`),
	UNIQUE (`user_id`, `batch_id`),
	FOREIGN KEY (`user_id`) REFERENCES user(id),
	FOREIGN KEY (`batch_id`) REFERENCES batch(id),
	FOREIGN KEY (`division_id`) REFERENCES division(id)
);
CREATE TABLE `department_user` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`user_id` INT NOT NULL REFERENCES user(id),
	`department_id` INT NOT NULL,
	`designation` VARCHAR(255) NOT NULL, -- lecturer, professor, assistant_professor, associate_professor, professor, dean, director, principal, vice_chancellor, chancellor
	`joining_date` DATE NOT NULL,
	`retirement_date` DATE NOT NULL,
	`qualification` VARCHAR(255) NOT NULL,
	`experience` INT NOT NULL,
	`specialization` VARCHAR(255) NOT NULL,
	`research_interest` VARCHAR(255) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES user(id),
	FOREIGN KEY (`department_id`) REFERENCES department(id)
);
CREATE TABLE `teaching` ( --assigned_teaching division_course_professor
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`division_id`  INT NOT NULL REFERENCES division(id),
	`course_id`    INT NOT NULL REFERENCES course(id),
	`professor_id` INT NOT NULL REFERENCES department_user(id),
	UNIQUE (`division_id`, `course_id`, `professor_id`),
	FOREIGN KEY (`division_id`) REFERENCES division(id),
	FOREIGN KEY (`course_id`) REFERENCES course(id),
	FOREIGN KEY (`professor_id`) REFERENCES department_user(id)
);
-- CREATE TABLE `lecture_schedule` (
-- 	`teaching_id` INT         NOT NULL REFERENCES division_course_professor(id),
-- 	`weekday`     VARCHAR(10) NOT NULL,
-- 	`time`        TIME        NOT NULL
-- );
CREATE TABLE `lecture` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`lecture_date` DATE NOT NULL,
	`lecture_time` time NOT NULL,
	`lecture_duration` time NOT NULL,
	`teaching_id` INT NOT NULL REFERENCES teaching(id),
	FOREIGN KEY (`teaching_id`) REFERENCES teaching(id)
);
CREATE TABLE `lecture_attendance` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`attendance` VARCHAR(255) NOT NULL,
	`status` VARCHAR(255) NOT NULL,
	`lecture_id` INT NOT NULL REFERENCES lecture(id),
	`user_id` INT NOT NULL REFERENCES user(id),
	UNIQUE (`lecture_id`, `user_id`),
	FOREIGN KEY (`lecture_id`) REFERENCES lecture(id),
	FOREIGN KEY (`user_id`) REFERENCES user(id)
);
CREATE TABLE `assignment` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`title` VARCHAR(255) NOT NULL,
	`description` VARCHAR(255) NOT NULL,
	`deadline` DATETIME NOT NULL,
	`type` VARCHAR(255) NOT NULL, -- individual, group, written, quiz, project, practical
	`maximum_marks` INT NOT NULL,
	`weightage` INT NOT NULL,
	`teaching_id` INT NOT NULL REFERENCES course(id),
	FOREIGN KEY (`teaching_id`) REFERENCES teaching(id)
);
CREATE TABLE `assignment_submission` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`submission_data` VARCHAR(255) NOT NULL,
	`submission_date` DATE NOT NULL,
	`obtained_marks` INT,
	`assignment_id` INT NOT NULL REFERENCES assignment(id),
	`user_id` INT NOT NULL REFERENCES user(id),
	UNIQUE (`assignment_id`, `user_id`),
	FOREIGN KEY (`assignment_id`) REFERENCES assignment(id),
	FOREIGN KEY (`user_id`) REFERENCES user(id)
);
CREATE TABLE `author` (
	`id` INT PRIMARY KEY,
	`name` VARCHAR(30)
);
CREATE TABLE `book` (
  `id` INT PRIMARY KEY,
  `name` VARCHAR(30) NOT NULL,
  `author_name` VARCHAR(30),
  `book_brn_id` INT,
  `book_price` INT,
	`ISBN` VARCHAR(30),
	`publisher` VARCHAR(30),
	`published_date` DATE,
	`edition` INT,
	`language` VARCHAR(30),
	`copies` INT
);
CREATE TABLE `author_book` (
	`book_id` INT,
	`author_id` INT,
	PRIMARY KEY (`book_id`, `author_id`),
	FOREIGN KEY (`book_id`) REFERENCES book(id),
	FOREIGN KEY (`author_id`) REFERENCES author(id)
);
CREATE TABLE `book_issue_return` (
  `id` INT PRIMARY KEY,
	`user_id` INT,
  `book_id` INT,
  `issue_date` DATE,
	`supposed_return_date` DATE,
	`actual_return_date` DATE,
	`fine` INT,
	FOREIGN KEY (`user_id`) REFERENCES user(id),
	FOREIGN KEY (`book_id`) REFERENCES book(id)
);
CREATE TABLE `book_course` (
	`book_id` INT,
	`course_id` INT,
	PRIMARY KEY (`book_id`, `course_id`),
	FOREIGN KEY (`book_id`) REFERENCES book(id),
	FOREIGN KEY (`course_id`) REFERENCES course(id)
);
CREATE TABLE `exam` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`title` VARCHAR(255) NOT NULL,
	`description` VARCHAR(255) NOT NULL,
	`exam_date` DATE NOT NULL,
	`exam_time` TIME NOT NULL,
	`duration` TIME NOT NULL,
	`maximum_marks` INT NOT NULL,
	`course_id` INT NOT NULL,
	`division_id` INT NOT NULL,
	FOREIGN KEY (`course_id`) REFERENCES course(id),
	FOREIGN KEY (`division_id`) REFERENCES division(id)
);
CREATE TABLE `exam_student` (
	`exam_id` INT NOT NULL,
	`user_id` INT NOT NULL,
	`answer_paper_number` VARCHAR(255) NOT NULL,
	`marks` INT NOT NULL,
	PRIMARY KEY (`exam_id`, `user_id`),
	FOREIGN KEY (`exam_id`) REFERENCES exam(id),
	FOREIGN KEY (`user_id`) REFERENCES user(id)
);
CREATE TABLE `mark` (
	`id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	`marks` INT NOT NULL,
	`user_id` INT NOT NULL REFERENCES user(id),
	`exam_id` INT NOT NULL REFERENCES exam(id),
	`name` ENUM('cec', 'attendance', 'internal_exam', 'external_exam', 'assignment', 'project', 'practical'),
	`marks_type_id` INT NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES user(id),
	FOREIGN KEY (`exam_id`) REFERENCES exam(id)
);
