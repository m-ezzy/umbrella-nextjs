-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema umbrella
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema umbrella
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `umbrella` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `umbrella` ;

-- -----------------------------------------------------
-- Table `umbrella`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `umbrella`.`user` ;

CREATE TABLE IF NOT EXISTS `umbrella`.`user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NULL,
  `password` VARCHAR(50) NOT NULL,
  `contact_no` VARCHAR(20) NULL,
  `primary_email` VARCHAR(50) NULL,
  `google_email` VARCHAR(50) NULL,
  `github_username` VARCHAR(50) NULL,
  `name_prefix` VARCHAR(50) NULL,
  `name_first` VARCHAR(50) NOT NULL,
  `name_middle` VARCHAR(50) NULL,
  `name_sur` VARCHAR(50) NULL,
  `name_suffix` VARCHAR(50) NULL,
  `gender` ENUM('M', 'F') NULL,
  `date_of_birth` DATE NULL,
  `profile_picture_url` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `primary_email_UNIQUE` (`primary_email` ASC) VISIBLE,
  UNIQUE INDEX `contact_no_UNIQUE` (`contact_no` ASC) VISIBLE,
  UNIQUE INDEX `google_email_UNIQUE` (`google_email` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `github_username_UNIQUE` (`github_username` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `umbrella`.`campus`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `umbrella`.`campus` ;

CREATE TABLE IF NOT EXISTS `umbrella`.`campus` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `state` VARCHAR(100) NOT NULL,
  `country` VARCHAR(100) NOT NULL,
  `pincode` VARCHAR(10) NOT NULL,
  `gate_count` INT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name` (`name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `umbrella`.`building`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `umbrella`.`building` ;

CREATE TABLE IF NOT EXISTS `umbrella`.`building` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `campus_id` INT(11) NOT NULL,
  `floor_count` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `campus_id` (`campus_id` ASC) VISIBLE,
  CONSTRAINT `building_ibfk_1`
    FOREIGN KEY (`campus_id`)
    REFERENCES `umbrella`.`campus` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `umbrella`.`department`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `umbrella`.`department` ;

CREATE TABLE IF NOT EXISTS `umbrella`.`department` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `name_acronym` VARCHAR(255) NOT NULL,
  `building_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name` (`name` ASC) VISIBLE,
  UNIQUE INDEX `name_acronym` (`name_acronym` ASC) VISIBLE,
  INDEX `building_id` (`building_id` ASC) VISIBLE,
  CONSTRAINT `department_ibfk_1`
    FOREIGN KEY (`building_id`)
    REFERENCES `umbrella`.`building` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `umbrella`.`degree`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `umbrella`.`degree` ;

CREATE TABLE IF NOT EXISTS `umbrella`.`degree` (
  `degree_id` INT NOT NULL AUTO_INCREMENT COMMENT 'degree_category --- regular,distance,open,part-time,full-time,sponsored,management,NRI,foreign\nbranch\nstream --- Arts,Business,Commerce,Engineering,Science,IT,Medical,Law,Management,Education',
  `degree_name` VARCHAR(100) NOT NULL,
  `degree_name_acronym` VARCHAR(20) NOT NULL,
  `degree_type` ENUM('Diploma', 'Bachelor', 'Master', 'Doctorate', 'Integrated') NOT NULL COMMENT 'Diploma, UG, PG, PhD\n',
  `years` INT(4) NOT NULL,
  `department_id` INT(11) NOT NULL,
  PRIMARY KEY (`degree_id`),
  UNIQUE INDEX `name` (`degree_name` ASC) VISIBLE,
  UNIQUE INDEX `name_acronym` (`degree_name_acronym` ASC) VISIBLE,
  INDEX `degree_ibfk_1_idx` (`department_id` ASC) VISIBLE,
  CONSTRAINT `degree_ibfk_1`
    FOREIGN KEY (`department_id`)
    REFERENCES `umbrella`.`department` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `umbrella`.`admission`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `umbrella`.`admission` ;

CREATE TABLE IF NOT EXISTS `umbrella`.`admission` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT 'admission_type ----- regular, lateral, direct, transfer, distance, open, part-time, full-time, sponsored, management, NRI, foreign\n\nadmission_category ----- general, SC, ST, OBC, EWS, PWD, ESM, TFW, NCC, NSS, Sports, Cultural, Defence, Freedom Fighter, Single\n\nadmission_quota ----- merit, management, NRI, foreign, sponsored, government, private, minority, linguistic, religious, caste, community, region, state, district, rural, urban, poor, rich, orphan, single\n\nadmission_status ----- applied, approved, rejected, waitlisted, confirmed, cancelled, withdrawn, transferred, migrated, promoted, graduated, passed, failed, detained, expelled, suspended, rusticated, debarred, barred, blacklisted, banned, disbarred, disqualified\n',
  `admission_date` DATE NOT NULL,
  `admission_type` VARCHAR(255) NOT NULL,
  `admission_category` VARCHAR(255) NOT NULL,
  `admission_quota` VARCHAR(255) NOT NULL,
  `admission_status` VARCHAR(255) NOT NULL,
  `user_id` INT NOT NULL,
  `degree_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  INDEX `degree_id` (`degree_id` ASC) VISIBLE,
  CONSTRAINT `admission_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `umbrella`.`user` (`id`),
  CONSTRAINT `admission_ibfk_2`
    FOREIGN KEY (`degree_id`)
    REFERENCES `umbrella`.`degree` (`degree_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `umbrella`.`syllabus`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `umbrella`.`syllabus` ;

CREATE TABLE IF NOT EXISTS `umbrella`.`syllabus` (
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '-- program -- revision -- edition -- version -- variation -- iteration',
  `year_effective` INT(4) NOT NULL,
  `year_retired` INT(4) NULL DEFAULT NULL,
  `number_of_years` INT(2) NOT NULL,
  `number_of_semesters` INT(2) NOT NULL,
  `degree_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `syllabus_ibfk_1_idx` (`degree_id` ASC) VISIBLE,
  CONSTRAINT `syllabus_ibfk_1`
    FOREIGN KEY (`degree_id`)
    REFERENCES `umbrella`.`degree` (`degree_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `umbrella`.`batch`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `umbrella`.`batch` ;

CREATE TABLE IF NOT EXISTS `umbrella`.`batch` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `year_started` INT(4) NOT NULL,
  `year_ended` INT(4) NOT NULL,
  `current_semester` INT(2) NOT NULL,
  `syllabus_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `syllabus_id` (`syllabus_id` ASC) VISIBLE,
  CONSTRAINT `batch_ibfk_1`
    FOREIGN KEY (`syllabus_id`)
    REFERENCES `umbrella`.`syllabus` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `umbrella`.`division`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `umbrella`.`division` ;

CREATE TABLE IF NOT EXISTS `umbrella`.`division` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `batch_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `batch_id` (`batch_id` ASC) VISIBLE,
  CONSTRAINT `division_ibfk_1`
    FOREIGN KEY (`batch_id`)
    REFERENCES `umbrella`.`batch` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `umbrella`.`course`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `umbrella`.`course` ;

CREATE TABLE IF NOT EXISTS `umbrella`.`course` (
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'subject',
  `code` VARCHAR(255) NULL,
  `name` VARCHAR(255) NOT NULL,
  `name_acronym` VARCHAR(45) NOT NULL,
  `type` ENUM('theory', 'practical') NOT NULL,
  `year_created` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `UK_code` (`code` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `umbrella`.`teaching`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `umbrella`.`teaching` ;

CREATE TABLE IF NOT EXISTS `umbrella`.`teaching` (
  `id` INT NOT NULL COMMENT 'assigned_teaching division_course_professor instructor',
  `division_id` INT NOT NULL,
  `course_id` INT NOT NULL,
  `professor_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `teaching_ibfk_1_idx` (`division_id` ASC) VISIBLE,
  INDEX `teaching_ibfk_2_idx` (`course_id` ASC) VISIBLE,
  INDEX `teaching_ibfk_3_idx` (`professor_id` ASC) VISIBLE,
  UNIQUE INDEX `teaching_UNIQUE` (`division_id` ASC, `course_id` ASC, `professor_id` ASC) VISIBLE,
  CONSTRAINT `teaching_ibfk_1`
    FOREIGN KEY (`division_id`)
    REFERENCES `umbrella`.`division` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `teaching_ibfk_2`
    FOREIGN KEY (`course_id`)
    REFERENCES `umbrella`.`course` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `teaching_ibfk_3`
    FOREIGN KEY (`professor_id`)
    REFERENCES `umbrella`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `umbrella`.`assignment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `umbrella`.`assignment` ;

CREATE TABLE IF NOT EXISTS `umbrella`.`assignment` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `deadline` DATETIME NOT NULL,
  `type` VARCHAR(255) NOT NULL COMMENT 'individual, group, written, quiz, project, practical',
  `maximum_marks` INT(11) NOT NULL,
  `weightage` INT(11) NOT NULL,
  `teaching_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `assignment_ibfk_1_idx` (`teaching_id` ASC) VISIBLE,
  CONSTRAINT `assignment_ibfk_1`
    FOREIGN KEY (`teaching_id`)
    REFERENCES `umbrella`.`teaching` (`id`)
    ON DELETE RESTRICT
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `umbrella`.`assignment_submission`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `umbrella`.`assignment_submission` ;

CREATE TABLE IF NOT EXISTS `umbrella`.`assignment_submission` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `submission_data` VARCHAR(255) NOT NULL,
  `submission_date` DATE NOT NULL,
  `obtained_marks` INT(11) NULL DEFAULT NULL,
  `assignment_id` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `assignment_submission_ibfk_1_idx` (`assignment_id` ASC) VISIBLE,
  UNIQUE INDEX `assignment_user_UNIQUE` (`assignment_id` ASC, `user_id` ASC) VISIBLE,
  INDEX `assignment_submission_ibfk_2_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `assignment_submission_ibfk_1`
    FOREIGN KEY (`assignment_id`)
    REFERENCES `umbrella`.`assignment` (`id`),
  CONSTRAINT `assignment_submission_ibfk_2`
    FOREIGN KEY (`user_id`)
    REFERENCES `umbrella`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `umbrella`.`author`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `umbrella`.`author` ;

CREATE TABLE IF NOT EXISTS `umbrella`.`author` (
  `id` INT(11) NOT NULL,
  `name` VARCHAR(30) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `umbrella`.`book`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `umbrella`.`book` ;

CREATE TABLE IF NOT EXISTS `umbrella`.`book` (
  `id` INT(11) NOT NULL,
  `name` VARCHAR(30) NOT NULL,
  `author_name` VARCHAR(30) NULL DEFAULT NULL,
  `book_brn_id` INT(11) NULL DEFAULT NULL,
  `book_price` INT(11) NULL DEFAULT NULL,
  `ISBN` VARCHAR(30) NULL DEFAULT NULL,
  `publisher` VARCHAR(30) NULL DEFAULT NULL,
  `published_date` DATE NULL DEFAULT NULL,
  `edition` INT(11) NULL DEFAULT NULL,
  `language` VARCHAR(30) NULL DEFAULT NULL,
  `copies` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `umbrella`.`author_book`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `umbrella`.`author_book` ;

CREATE TABLE IF NOT EXISTS `umbrella`.`author_book` (
  `book_id` INT(11) NOT NULL,
  `author_id` INT(11) NOT NULL,
  PRIMARY KEY (`book_id`, `author_id`),
  INDEX `author_id` (`author_id` ASC) VISIBLE,
  CONSTRAINT `author_book_ibfk_1`
    FOREIGN KEY (`book_id`)
    REFERENCES `umbrella`.`book` (`id`),
  CONSTRAINT `author_book_ibfk_2`
    FOREIGN KEY (`author_id`)
    REFERENCES `umbrella`.`author` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `umbrella`.`batch_user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `umbrella`.`batch_user` ;

CREATE TABLE IF NOT EXISTS `umbrella`.`batch_user` (
  `enrollment_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'division_user\nenrollment\nstudent',
  `user_id` INT(11) NOT NULL,
  `batch_id` INT(11) NOT NULL,
  `division_id` INT(11) NOT NULL,
  `enrollment_number` BIGINT NULL,
  `roll_number` VARCHAR(5) NULL,
  PRIMARY KEY (`enrollment_id`),
  INDEX `batch_id` (`batch_id` ASC) VISIBLE,
  INDEX `division_id` (`division_id` ASC) INVISIBLE,
  INDEX `batch_user_ibfk_1_idx` (`user_id` ASC) VISIBLE,
  UNIQUE INDEX `batch_user_UNIQUE` (`user_id` ASC, `batch_id` ASC) VISIBLE,
  UNIQUE INDEX `enrollment_number_UNIQUE` (`enrollment_number` ASC) VISIBLE,
  UNIQUE INDEX `roll_number_UNIQUE` (`roll_number` ASC) VISIBLE,
  CONSTRAINT `batch_user_ibfk_2`
    FOREIGN KEY (`batch_id`)
    REFERENCES `umbrella`.`batch` (`id`),
  CONSTRAINT `batch_user_ibfk_3`
    FOREIGN KEY (`division_id`)
    REFERENCES `umbrella`.`division` (`id`),
  CONSTRAINT `batch_user_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `umbrella`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `umbrella`.`book_course`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `umbrella`.`book_course` ;

CREATE TABLE IF NOT EXISTS `umbrella`.`book_course` (
  `book_id` INT(11) NOT NULL,
  `course_id` INT(11) NOT NULL,
  PRIMARY KEY (`book_id`, `course_id`),
  INDEX `course_id` (`course_id` ASC) VISIBLE,
  CONSTRAINT `book_course_ibfk_1`
    FOREIGN KEY (`book_id`)
    REFERENCES `umbrella`.`book` (`id`),
  CONSTRAINT `book_course_ibfk_2`
    FOREIGN KEY (`course_id`)
    REFERENCES `umbrella`.`course` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `umbrella`.`book_issue_return`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `umbrella`.`book_issue_return` ;

CREATE TABLE IF NOT EXISTS `umbrella`.`book_issue_return` (
  `id` INT(11) NOT NULL,
  `user_id` INT(11) NULL DEFAULT NULL,
  `book_id` INT(11) NULL DEFAULT NULL,
  `issue_date` DATE NULL DEFAULT NULL,
  `supposed_return_date` DATE NULL DEFAULT NULL,
  `actual_return_date` DATE NULL DEFAULT NULL,
  `fine` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  INDEX `book_id` (`book_id` ASC) VISIBLE,
  CONSTRAINT `book_issue_return_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `umbrella`.`user` (`id`),
  CONSTRAINT `book_issue_return_ibfk_2`
    FOREIGN KEY (`book_id`)
    REFERENCES `umbrella`.`book` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `umbrella`.`department_user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `umbrella`.`department_user` ;

CREATE TABLE IF NOT EXISTS `umbrella`.`department_user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'table names - department_usrer, faculty',
  `department_id` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL,
  `designation` ENUM('dean', 'head', 'assistant professor', 'associate professor', 'librarian', 'clerk') NOT NULL COMMENT 'lecturer, professor, assistant_professor, associate_professor, professor, dean, director, principal, vice_chancellor, chancellor, librarian',
  `date_join` DATE NULL,
  `date_leave` DATE NULL,
  `qualification` VARCHAR(255) NULL,
  `experience` INT(11) NULL,
  `specialization` VARCHAR(255) NULL,
  `research_interest` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  INDEX `department_id` (`department_id` ASC) VISIBLE,
  CONSTRAINT `department_user_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `umbrella`.`user` (`id`),
  CONSTRAINT `department_user_ibfk_2`
    FOREIGN KEY (`department_id`)
    REFERENCES `umbrella`.`department` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `umbrella`.`event`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `umbrella`.`event` ;

CREATE TABLE IF NOT EXISTS `umbrella`.`event` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `start_time` TIME NOT NULL,
  `end_time` TIME NOT NULL,
  `venue` VARCHAR(255) NOT NULL,
  `organizer` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name` (`name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `umbrella`.`exam`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `umbrella`.`exam` ;

CREATE TABLE IF NOT EXISTS `umbrella`.`exam` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `exam_date` DATE NOT NULL,
  `exam_time` TIME NOT NULL,
  `duration` TIME NOT NULL,
  `maximum_marks` INT(11) NOT NULL,
  `course_id` INT(11) NOT NULL,
  `division_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `course_id` (`course_id` ASC) VISIBLE,
  INDEX `division_id` (`division_id` ASC) VISIBLE,
  CONSTRAINT `exam_ibfk_1`
    FOREIGN KEY (`course_id`)
    REFERENCES `umbrella`.`course` (`id`),
  CONSTRAINT `exam_ibfk_2`
    FOREIGN KEY (`division_id`)
    REFERENCES `umbrella`.`division` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `umbrella`.`exam_student`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `umbrella`.`exam_student` ;

CREATE TABLE IF NOT EXISTS `umbrella`.`exam_student` (
  `exam_id` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL,
  `answer_paper_number` VARCHAR(255) NOT NULL,
  `marks` INT(11) NOT NULL,
  INDEX `exam_student_ibfk_1_idx` (`exam_id` ASC) VISIBLE,
  INDEX `exam_student_ibfk_2_idx` (`user_id` ASC) VISIBLE,
  PRIMARY KEY (`exam_id`, `user_id`),
  CONSTRAINT `exam_student_ibfk_1`
    FOREIGN KEY (`exam_id`)
    REFERENCES `umbrella`.`exam` (`id`),
  CONSTRAINT `exam_student_ibfk_2`
    FOREIGN KEY (`user_id`)
    REFERENCES `umbrella`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `umbrella`.`floor`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `umbrella`.`floor` ;

CREATE TABLE IF NOT EXISTS `umbrella`.`floor` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `number` INT NOT NULL,
  `building_id` INT NOT NULL,
  `room_count` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `building_id` (`building_id` ASC) VISIBLE,
  CONSTRAINT `floor_ibfk_1`
    FOREIGN KEY (`building_id`)
    REFERENCES `umbrella`.`building` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `umbrella`.`room`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `umbrella`.`room` ;

CREATE TABLE IF NOT EXISTS `umbrella`.`room` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `number` INT(11) NOT NULL,
  `floor_id` INT(11) NOT NULL,
  `type` ENUM('classroom', 'computer', 'art', 'law', 'office', 'library', 'reading', 'meeting', 'admin') NULL COMMENT 'classroom, lab, office, conference, washroom, store, library, canteen, auditorium, utility',
  `capacity` INT(11) NULL DEFAULT NULL,
  `row_count` INT NULL,
  `column_count` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `floor_id` (`floor_id` ASC) VISIBLE,
  CONSTRAINT `room_ibfk_1`
    FOREIGN KEY (`floor_id`)
    REFERENCES `umbrella`.`floor` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `umbrella`.`lecture`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `umbrella`.`lecture` ;

CREATE TABLE IF NOT EXISTS `umbrella`.`lecture` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `start_time` TIME NOT NULL,
  `end_time` TIME NOT NULL,
  `duration` TIME NULL,
  `room_id` INT NOT NULL,
  `teaching_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `lecture_ibfk_2_idx` (`room_id` ASC) VISIBLE,
  INDEX `lecture_ibfk_2_idx1` (`teaching_id` ASC) VISIBLE,
  CONSTRAINT `lecture_ibfk_1`
    FOREIGN KEY (`room_id`)
    REFERENCES `umbrella`.`room` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `lecture_ibfk_2`
    FOREIGN KEY (`teaching_id`)
    REFERENCES `umbrella`.`teaching` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `umbrella`.`lecture_attendance`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `umbrella`.`lecture_attendance` ;

CREATE TABLE IF NOT EXISTS `umbrella`.`lecture_attendance` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `attendance` VARCHAR(255) NOT NULL,
  `status` VARCHAR(255) NOT NULL,
  `lecture_id` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `lecture_attendance_ibfk_1_idx` (`lecture_id` ASC) VISIBLE,
  INDEX `lecture_attendance_ibfk_2_idx` (`user_id` ASC) VISIBLE,
  UNIQUE INDEX `lecture_user_UNIQUE` (`lecture_id` ASC, `user_id` ASC) VISIBLE,
  CONSTRAINT `lecture_attendance_ibfk_1`
    FOREIGN KEY (`lecture_id`)
    REFERENCES `umbrella`.`lecture` (`id`),
  CONSTRAINT `lecture_attendance_ibfk_2`
    FOREIGN KEY (`user_id`)
    REFERENCES `umbrella`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `umbrella`.`grade`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `umbrella`.`grade` ;

CREATE TABLE IF NOT EXISTS `umbrella`.`grade` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT 'mark',
  `grades` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL,
  `exam_id` INT(11) NOT NULL,
  `name` ENUM('cec', 'attendance', 'internal_exam', 'external_exam', 'assignment', 'project', 'practical') NULL DEFAULT NULL,
  `grade_type_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  INDEX `exam_id` (`exam_id` ASC) VISIBLE,
  CONSTRAINT `grade_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `umbrella`.`user` (`id`),
  CONSTRAINT `grade_ibfk_2`
    FOREIGN KEY (`exam_id`)
    REFERENCES `umbrella`.`exam` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `umbrella`.`syllabus_course`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `umbrella`.`syllabus_course` ;

CREATE TABLE IF NOT EXISTS `umbrella`.`syllabus_course` (
  `syllabus_id` INT(11) NOT NULL,
  `course_id` INT(11) NOT NULL,
  `credits` INT(11) NOT NULL,
  `category` ENUM('core', 'elective', 'project', 'MOOC', 'foundation') NULL DEFAULT NULL,
  `semester_number` INT(11) NOT NULL,
  INDEX `FK_course_idx` (`course_id` ASC) VISIBLE,
  PRIMARY KEY (`syllabus_id`, `course_id`),
  CONSTRAINT `syllabus_course_ibfk_1`
    FOREIGN KEY (`course_id`)
    REFERENCES `umbrella`.`course` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `syllabus_course_ibfk_2`
    FOREIGN KEY (`syllabus_id`)
    REFERENCES `umbrella`.`syllabus` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `umbrella`.`library`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `umbrella`.`library` ;

CREATE TABLE IF NOT EXISTS `umbrella`.`library` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `department_id` INT NOT NULL,
  `building_id` INT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  INDEX `FK_library_department_idx` (`department_id` ASC) VISIBLE,
  INDEX `FK_library_building_idx` (`building_id` ASC) VISIBLE,
  CONSTRAINT `library_ibfk_1`
    FOREIGN KEY (`department_id`)
    REFERENCES `umbrella`.`department` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `library_ibfk_2`
    FOREIGN KEY (`building_id`)
    REFERENCES `umbrella`.`building` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `umbrella`.`library_book`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `umbrella`.`library_book` ;

CREATE TABLE IF NOT EXISTS `umbrella`.`library_book` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `library_id` INT NOT NULL,
  `book_id` INT NOT NULL,
  `copies` INT NULL DEFAULT 0,
  `date_added` DATE NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `UK_library_book` (`library_id` ASC, `book_id` ASC) VISIBLE,
  INDEX `FK_book_idx` (`book_id` ASC) VISIBLE,
  CONSTRAINT `library_book_ibfk_1`
    FOREIGN KEY (`library_id`)
    REFERENCES `umbrella`.`library` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `library_book_ibfk_2`
    FOREIGN KEY (`book_id`)
    REFERENCES `umbrella`.`book` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `umbrella`.`staff`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `umbrella`.`staff` ;

CREATE TABLE IF NOT EXISTS `umbrella`.`staff` (
  `user_id` INT NOT NULL,
  `role` VARCHAR(45) NOT NULL,
  `salary` INT NOT NULL,
  `id` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `umbrella`.`university_managers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `umbrella`.`university_managers` ;

CREATE TABLE IF NOT EXISTS `umbrella`.`university_managers` (
  `user_id` INT NOT NULL,
  `role` VARCHAR(45) NOT NULL)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `umbrella`.`university_user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `umbrella`.`university_user` ;

CREATE TABLE IF NOT EXISTS `umbrella`.`university_user` (
  `user_id` INT NOT NULL,
  `role` VARCHAR(45) NOT NULL,
  `salary` INT NULL,
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC),
  CONSTRAINT `uu_user_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `umbrella`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `umbrella`.`result`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `umbrella`.`result` ;

CREATE TABLE IF NOT EXISTS `umbrella`.`result` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `enrollment_id` INT NOT NULL,
  `course_id` INT NOT NULL,
  `grade` VARCHAR(50) NOT NULL,
  `marks` INT NOT NULL,
  `weightage` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `result_ibfk_1_idx` (`enrollment_id` ASC) VISIBLE,
  INDEX `result_ibfk_2_idx` (`course_id` ASC) VISIBLE,
  CONSTRAINT `result_ibfk_1`
    FOREIGN KEY (`enrollment_id`)
    REFERENCES `umbrella`.`batch_user` (`enrollment_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `result_ibfk_2`
    FOREIGN KEY (`course_id`)
    REFERENCES `umbrella`.`course` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `umbrella`.`course_user_elective`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `umbrella`.`course_user_elective` ;

CREATE TABLE IF NOT EXISTS `umbrella`.`course_user_elective` (
  `id` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `umbrella`.`salary`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `umbrella`.`salary` ;

CREATE TABLE IF NOT EXISTS `umbrella`.`salary` (
  `id` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `umbrella`.`fees`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `umbrella`.`fees` ;

CREATE TABLE IF NOT EXISTS `umbrella`.`fees` (
  `id` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `umbrella`.`admin`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `umbrella`.`admin` ;

CREATE TABLE IF NOT EXISTS `umbrella`.`admin` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `degree_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `admin_ibfk_2_idx` (`user_id` ASC) VISIBLE,
  INDEX `admin_ibfk_1_idx` (`degree_id` ASC) VISIBLE,
  CONSTRAINT `admin_ibfk_1`
    FOREIGN KEY (`degree_id`)
    REFERENCES `umbrella`.`degree` (`degree_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `admin_ibfk_2`
    FOREIGN KEY (`user_id`)
    REFERENCES `umbrella`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `umbrella`.`session`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `umbrella`.`session` ;

CREATE TABLE IF NOT EXISTS `umbrella`.`session` (
  `id` INT NOT NULL,
  `value` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `umbrella`.`room_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `umbrella`.`room_type` ;

CREATE TABLE IF NOT EXISTS `umbrella`.`room_type` (
  `id` INT NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `umbrella`.`level`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `umbrella`.`level` ;

CREATE TABLE IF NOT EXISTS `umbrella`.`level` (
  `id` INT NOT NULL COMMENT 'roles\npermissions\nrole_permissions\nuser_role',
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `umbrella`.`timetable`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `umbrella`.`timetable` ;

CREATE TABLE IF NOT EXISTS `umbrella`.`timetable` (
  `timetable_id` INT NOT NULL AUTO_INCREMENT,
  `time_start` TIME NOT NULL,
  `time_end` TIME NOT NULL,
  `weekday` INT NOT NULL,
  `teaching_id` INT NOT NULL,
  `room_id` INT NOT NULL,
  PRIMARY KEY (`timetable_id`),
  INDEX `timetable_ibfk_1_idx` (`teaching_id` ASC) VISIBLE,
  INDEX `timetable_ibfk_2_idx` (`room_id` ASC) VISIBLE,
  CONSTRAINT `timetable_ibfk_1`
    FOREIGN KEY (`teaching_id`)
    REFERENCES `umbrella`.`teaching` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `timetable_ibfk_2`
    FOREIGN KEY (`room_id`)
    REFERENCES `umbrella`.`room` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `umbrella`.`user_course_elective`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `umbrella`.`user_course_elective` ;

CREATE TABLE IF NOT EXISTS `umbrella`.`user_course_elective` (
  `syllabus_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `course_id` INT NOT NULL)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `umbrella`.`chapters`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `umbrella`.`chapters` ;

CREATE TABLE IF NOT EXISTS `umbrella`.`chapters` (
  `chapter_number` INT NOT NULL,
  `course_id` INT NOT NULL,
  `chapter_title` VARCHAR(50) NULL,
  `chapter_description` VARCHAR(255) NULL,
  `chapter_weightage` INT NULL)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

COMMIT;

