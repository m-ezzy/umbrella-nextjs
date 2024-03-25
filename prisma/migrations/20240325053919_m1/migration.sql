-- CreateTable
CREATE TABLE `admin` (
    `admin_id` INTEGER NOT NULL AUTO_INCREMENT,
    `degree_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `blah` INTEGER NULL,

    INDEX `admin_ibfk_1_idx`(`degree_id`),
    INDEX `admin_ibfk_2_idx`(`user_id`),
    UNIQUE INDEX `admin_degree_user_UNIQUE`(`degree_id`, `user_id`),
    PRIMARY KEY (`admin_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admission` (
    `admission_id` INTEGER NOT NULL AUTO_INCREMENT,
    `admission_date` VARCHAR(45) NULL,
    `admission_type` ENUM('regular', 'lateral', 'direct', 'transfer', 'distance', 'open', 'part-time', 'full-time', 'sponsored', 'management', 'NRI', 'foreign') NULL,
    `admission_category` ENUM('general', 'SC', 'ST', 'OBC', ' EWS', 'PWD', 'TFW') NULL,
    `admission_quota` VARCHAR(45) NULL,
    `admission_status` ENUM('pending', 'rejected', 'enrolled') NULL,
    `degree_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `admission_idfk_1_idx`(`degree_id`),
    INDEX `admission_idfk_2_idx`(`user_id`),
    PRIMARY KEY (`admission_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `assignment` (
    `assignment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `assignment_title` VARCHAR(50) NOT NULL,
    `assignment_description` VARCHAR(255) NOT NULL,
    `assignment_deadline` DATETIME(0) NULL,
    `assignment_type` ENUM('individual', 'group', 'written', 'quiz', 'project', 'practical') NULL,
    `assignment_maximum_marks` INTEGER NULL,
    `assignment_graded` TINYINT NULL,
    `assignment_weightage` INTEGER NULL,
    `teaching_id` INTEGER NOT NULL,

    INDEX `assignment_ibfk_1_idx`(`teaching_id`),
    PRIMARY KEY (`assignment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `assignment_submission` (
    `submission_id` INTEGER NOT NULL AUTO_INCREMENT,
    `submission_data` VARCHAR(255) NOT NULL,
    `submission_date` DATE NOT NULL,
    `obtained_marks` INTEGER NULL,
    `assignment_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `assignment_submission_ibfk_1_idx`(`assignment_id`),
    INDEX `assignment_submission_ibfk_2_idx`(`user_id`),
    UNIQUE INDEX `assignment_user_UNIQUE`(`assignment_id`, `user_id`),
    PRIMARY KEY (`submission_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `author` (
    `author_id` INTEGER NOT NULL AUTO_INCREMENT,
    `author_name` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`author_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `author_book` (
    `book_id` INTEGER NOT NULL,
    `author_id` INTEGER NOT NULL,

    INDEX `author_id`(`author_id`),
    INDEX `book_id_idx`(`book_id`),
    UNIQUE INDEX `book_author_UNIQUE`(`book_id`, `author_id`),
    PRIMARY KEY (`book_id`, `author_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `batch` (
    `batch_id` INTEGER NOT NULL AUTO_INCREMENT,
    `year_started` INTEGER NOT NULL,
    `year_ended` INTEGER NOT NULL,
    `current_semester` INTEGER NOT NULL,
    `syllabus_id` INTEGER NOT NULL,

    INDEX `syllabus_id`(`syllabus_id`),
    PRIMARY KEY (`batch_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `book` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(30) NOT NULL,
    `author_name` VARCHAR(30) NULL,
    `book_brn_id` INTEGER NULL,
    `book_price` INTEGER NULL,
    `ISBN` VARCHAR(30) NULL,
    `publisher` VARCHAR(30) NULL,
    `published_date` DATE NULL,
    `edition` INTEGER NULL,
    `language` VARCHAR(30) NULL,
    `copies` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `book_course` (
    `book_id` INTEGER NOT NULL,
    `course_id` INTEGER NOT NULL,

    INDEX `course_id`(`course_id`),
    PRIMARY KEY (`book_id`, `course_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `book_issue_return` (
    `id` INTEGER NOT NULL,
    `user_id` INTEGER NULL,
    `book_id` INTEGER NULL,
    `issue_date` DATE NULL,
    `supposed_return_date` DATE NULL,
    `actual_return_date` DATE NULL,
    `fine` INTEGER NULL,

    INDEX `book_id`(`book_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `building` (
    `building_id` INTEGER NOT NULL AUTO_INCREMENT,
    `building_name` VARCHAR(255) NOT NULL,
    `floor_count` INTEGER NULL,
    `campus_id` INTEGER NOT NULL,

    INDEX `campus_id`(`campus_id`),
    PRIMARY KEY (`building_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `campus` (
    `campus_id` INTEGER NOT NULL AUTO_INCREMENT,
    `campus_name` VARCHAR(100) NOT NULL,
    `campus_address` VARCHAR(255) NOT NULL,
    `campus_city` VARCHAR(100) NOT NULL,
    `campus_state` VARCHAR(100) NOT NULL,
    `campus_country` VARCHAR(100) NOT NULL,
    `campus_pincode` VARCHAR(10) NOT NULL,
    `campus_gate_count` INTEGER NULL DEFAULT 1,

    UNIQUE INDEX `name`(`campus_name`),
    PRIMARY KEY (`campus_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chapter` (
    `chapter_id` INTEGER NOT NULL AUTO_INCREMENT,
    `chapter_number` INTEGER NOT NULL,
    `chapter_title` VARCHAR(50) NULL,
    `chapter_description` VARCHAR(255) NULL,
    `chapter_weightage` INTEGER NULL,
    `course_id` INTEGER NOT NULL,

    INDEX `chapter_course_idfk_1_idx`(`course_id`),
    PRIMARY KEY (`chapter_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `course` (
    `course_id` INTEGER NOT NULL AUTO_INCREMENT,
    `course_code` VARCHAR(50) NULL,
    `course_name` VARCHAR(50) NOT NULL,
    `course_name_acronym` VARCHAR(20) NOT NULL,
    `course_type` ENUM('theory', 'practical') NOT NULL,
    `year_created` INTEGER NOT NULL,

    UNIQUE INDEX `UK_code`(`course_code`),
    PRIMARY KEY (`course_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `course_user_elective` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `degree` (
    `degree_id` INTEGER NOT NULL AUTO_INCREMENT,
    `degree_name` VARCHAR(100) NOT NULL,
    `degree_name_acronym` VARCHAR(20) NOT NULL,
    `degree_type` ENUM('Diploma', 'Bachelor', 'Master', 'Doctorate', 'Integrated') NOT NULL,
    `duration_years` INTEGER NOT NULL,
    `duration_semesters` INTEGER NOT NULL,
    `department_id` INTEGER NOT NULL,

    UNIQUE INDEX `name`(`degree_name`),
    UNIQUE INDEX `name_acronym`(`degree_name_acronym`),
    INDEX `degree_ibfk_1_idx`(`department_id`),
    PRIMARY KEY (`degree_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `department` (
    `department_id` INTEGER NOT NULL,
    `department_name` VARCHAR(100) NOT NULL,
    `department_name_acronym` VARCHAR(50) NOT NULL,
    `building_id` INTEGER NULL,

    UNIQUE INDEX `department_name_UNIQUE`(`department_name`),
    UNIQUE INDEX `department_name_acronym_UNIQUE`(`department_name_acronym`),
    INDEX `department_ibfk_1_idx`(`building_id`),
    PRIMARY KEY (`department_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `division` (
    `division_id` INTEGER NOT NULL AUTO_INCREMENT,
    `division_name` VARCHAR(255) NOT NULL,
    `batch_id` INTEGER NOT NULL,

    INDEX `batch_id`(`batch_id`),
    PRIMARY KEY (`division_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `enrollment` (
    `enrollment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `enrollment_number` BIGINT NULL,
    `roll_number` VARCHAR(5) NULL,
    `batch_id` INTEGER NOT NULL,
    `division_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    UNIQUE INDEX `enrollment_number_UNIQUE`(`enrollment_number`),
    UNIQUE INDEX `roll_number_UNIQUE`(`roll_number`),
    INDEX `batch_id`(`batch_id`),
    INDEX `batch_user_ibfk_1_idx`(`user_id`),
    INDEX `division_id`(`division_id`),
    UNIQUE INDEX `batch_user_UNIQUE`(`user_id`, `batch_id`),
    PRIMARY KEY (`enrollment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `event` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `start_time` TIME(0) NOT NULL,
    `end_time` TIME(0) NOT NULL,
    `venue` VARCHAR(255) NOT NULL,
    `organizer` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exam` (
    `exam_id` INTEGER NOT NULL AUTO_INCREMENT,
    `exam_title` VARCHAR(50) NOT NULL,
    `exam_description` VARCHAR(255) NOT NULL,
    `exam_date` DATE NOT NULL,
    `exam_time` TIME(0) NOT NULL,
    `exam_duration` TIME(0) NOT NULL,
    `maximum_marks` INTEGER NOT NULL,
    `course_id` INTEGER NOT NULL,
    `division_id` INTEGER NOT NULL,

    INDEX `course_id`(`course_id`),
    INDEX `division_id`(`division_id`),
    PRIMARY KEY (`exam_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exam_student` (
    `exam_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `answer_paper_number` VARCHAR(255) NOT NULL,
    `marks` INTEGER NOT NULL,

    INDEX `exam_student_ibfk_1_idx`(`exam_id`),
    INDEX `exam_student_ibfk_2_idx`(`user_id`),
    PRIMARY KEY (`exam_id`, `user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `faculty` (
    `faculty_id` INTEGER NOT NULL AUTO_INCREMENT,
    `designation` ENUM('dean', 'head', 'assistant professor', 'associate professor', 'librarian', 'clerk') NOT NULL,
    `date_join` DATE NULL,
    `date_leave` DATE NULL,
    `qualification` VARCHAR(255) NULL,
    `experience` INTEGER NULL,
    `specialization` VARCHAR(255) NULL,
    `research_interest` VARCHAR(255) NULL,
    `department_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `department_id`(`department_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`faculty_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `floor` (
    `floor_id` INTEGER NOT NULL AUTO_INCREMENT,
    `floor_number` INTEGER NOT NULL,
    `room_count` INTEGER NULL,
    `building_id` INTEGER NOT NULL,

    INDEX `building_id`(`building_id`),
    PRIMARY KEY (`floor_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grade` (
    `grade_id` INTEGER NOT NULL AUTO_INCREMENT,
    `grade_name` ENUM('cec', 'attendance', 'internal_exam', 'external_exam', 'assignment', 'project', 'practical') NULL,
    `grade_type_id` INTEGER NOT NULL,
    `grades` INTEGER NOT NULL,
    `exam_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `exam_id`(`exam_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`grade_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lecture` (
    `lecture_id` INTEGER NOT NULL AUTO_INCREMENT,
    `lecture_date` DATE NOT NULL,
    `lecture_start_time` TIME(0) NOT NULL,
    `lecture_end_time` TIME(0) NOT NULL,
    `lecture_duration` TIME(0) NULL,
    `teaching_id` INTEGER NOT NULL,
    `room_id` INTEGER NOT NULL,

    INDEX `lecture_ibfk_2_idx`(`room_id`),
    INDEX `lecture_ibfk_2_idx1`(`teaching_id`),
    PRIMARY KEY (`lecture_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lecture_attendance` (
    `lecture_attendance_id` INTEGER NOT NULL AUTO_INCREMENT,
    `lecture_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `lecture_attendance_ibfk_1_idx`(`lecture_id`),
    INDEX `lecture_attendance_ibfk_2_idx`(`user_id`),
    UNIQUE INDEX `lecture_user_UNIQUE`(`lecture_id`, `user_id`),
    PRIMARY KEY (`lecture_attendance_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `level` (
    `id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `library` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NULL,
    `department_id` INTEGER NOT NULL,
    `building_id` INTEGER NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    UNIQUE INDEX `name_UNIQUE`(`name`),
    INDEX `FK_library_building_idx`(`building_id`),
    INDEX `FK_library_department_idx`(`department_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `library_book` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `library_id` INTEGER NOT NULL,
    `book_id` INTEGER NOT NULL,
    `copies` INTEGER NULL DEFAULT 0,
    `date_added` DATE NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `FK_book_idx`(`book_id`),
    UNIQUE INDEX `UK_library_book`(`library_id`, `book_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `result` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `enrollment_id` INTEGER NOT NULL,
    `course_id` INTEGER NOT NULL,
    `grade` VARCHAR(50) NOT NULL,
    `marks` INTEGER NOT NULL,
    `weightage` INTEGER NULL,

    INDEX `result_ibfk_1_idx`(`enrollment_id`),
    INDEX `result_ibfk_2_idx`(`course_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `room` (
    `room_id` INTEGER NOT NULL AUTO_INCREMENT,
    `room_number` INTEGER NOT NULL,
    `room_type` ENUM('classroom', 'computer', 'art', 'law', 'office', 'library', 'reading', 'meeting', 'admin') NULL,
    `room_capacity` INTEGER NULL,
    `room_row_count` INTEGER NULL,
    `room_column_count` INTEGER NULL,
    `floor_id` INTEGER NOT NULL,

    INDEX `floor_id`(`floor_id`),
    PRIMARY KEY (`room_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `room_type` (
    `room_type_id` INTEGER NOT NULL,
    `room_type_name` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`room_type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `salary` (
    `salary_id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`salary_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `session` (
    `session_id` INTEGER NOT NULL,
    `session_value` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`session_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `staff` (
    `user_id` INTEGER NOT NULL,
    `role` VARCHAR(45) NOT NULL,
    `salary` INTEGER NOT NULL,
    `id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `syllabus` (
    `syllabus_id` INTEGER NOT NULL AUTO_INCREMENT,
    `year_effective` INTEGER NOT NULL,
    `year_retired` INTEGER NULL,
    `duration_years` INTEGER NOT NULL,
    `duration_semesters` INTEGER NOT NULL,
    `degree_id` INTEGER NOT NULL,

    INDEX `syllabus_ibfk_1_idx`(`degree_id`),
    PRIMARY KEY (`syllabus_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `syllabus_course` (
    `syllabus_id` INTEGER NOT NULL,
    `course_id` INTEGER NOT NULL,
    `sc_credits` INTEGER NOT NULL,
    `sc_category` ENUM('core', 'elective', 'project', 'MOOC', 'foundation') NULL,
    `sc_semester` INTEGER NOT NULL,

    INDEX `syllabus_course_ibfk_1_idx`(`course_id`),
    INDEX `syllabus_course_ibfk_2_idx`(`syllabus_id`),
    UNIQUE INDEX `syllabus_course_UNIQUE`(`syllabus_id`, `course_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teaching` (
    `teaching_id` INTEGER NOT NULL AUTO_INCREMENT,
    `course_id` INTEGER NOT NULL,
    `division_id` INTEGER NOT NULL,
    `professor_id` INTEGER NOT NULL,

    INDEX `teaching_ibfk_1_idx`(`course_id`),
    INDEX `teaching_ibfk_2_idx`(`division_id`),
    INDEX `teaching_ibfk_3_idx`(`professor_id`),
    UNIQUE INDEX `teaching_UNIQUE`(`division_id`, `course_id`, `professor_id`),
    PRIMARY KEY (`teaching_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `timetable` (
    `timetable_id` INTEGER NOT NULL AUTO_INCREMENT,
    `timetable_time_start` TIME(0) NOT NULL,
    `timetable_time_end` TIME(0) NOT NULL,
    `timetable_weekday` ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
    `teaching_id` INTEGER NOT NULL,
    `room_id` INTEGER NOT NULL,

    INDEX `timetable_ibfk_1_idx`(`teaching_id`),
    INDEX `timetable_ibfk_2_idx`(`room_id`),
    PRIMARY KEY (`timetable_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction` (
    `transaction_id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`transaction_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `university_manager` (
    `manager_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,

    INDEX `manager_idfk_1_idx`(`user_id`),
    PRIMARY KEY (`manager_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `university_user` (
    `user_id` INTEGER NOT NULL,
    `role` VARCHAR(45) NOT NULL,
    `salary` INTEGER NULL,

    UNIQUE INDEX `user_id_UNIQUE`(`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
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

    UNIQUE INDEX `username_UNIQUE`(`username`),
    UNIQUE INDEX `contact_no_UNIQUE`(`contact_no`),
    UNIQUE INDEX `primary_email_UNIQUE`(`primary_email`),
    UNIQUE INDEX `google_email_UNIQUE`(`google_email`),
    UNIQUE INDEX `github_username_UNIQUE`(`github_username`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `admin` ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`degree_id`) REFERENCES `degree`(`degree_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `admin` ADD CONSTRAINT `admin_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `admission` ADD CONSTRAINT `admission_idfk_1` FOREIGN KEY (`degree_id`) REFERENCES `degree`(`degree_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `admission` ADD CONSTRAINT `admission_idfk_2` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `assignment` ADD CONSTRAINT `assignment_ibfk_1` FOREIGN KEY (`teaching_id`) REFERENCES `teaching`(`teaching_id`) ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `assignment_submission` ADD CONSTRAINT `assignment_submission_ibfk_1` FOREIGN KEY (`assignment_id`) REFERENCES `assignment`(`assignment_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `assignment_submission` ADD CONSTRAINT `assignment_submission_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `author_book` ADD CONSTRAINT `author_book_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `book`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `author_book` ADD CONSTRAINT `author_book_ibfk_2` FOREIGN KEY (`author_id`) REFERENCES `author`(`author_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `batch` ADD CONSTRAINT `batch_ibfk_1` FOREIGN KEY (`syllabus_id`) REFERENCES `syllabus`(`syllabus_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `book_course` ADD CONSTRAINT `book_course_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `book`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `book_course` ADD CONSTRAINT `book_course_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `course`(`course_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `book_issue_return` ADD CONSTRAINT `book_issue_return_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `book_issue_return` ADD CONSTRAINT `book_issue_return_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `book`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `building` ADD CONSTRAINT `building_ibfk_1` FOREIGN KEY (`campus_id`) REFERENCES `campus`(`campus_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `chapter` ADD CONSTRAINT `chapter_course_idfk_1` FOREIGN KEY (`course_id`) REFERENCES `course`(`course_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `degree` ADD CONSTRAINT `degree_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department`(`department_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `department` ADD CONSTRAINT `department_ibfk_1` FOREIGN KEY (`building_id`) REFERENCES `building`(`building_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `division` ADD CONSTRAINT `division_ibfk_1` FOREIGN KEY (`batch_id`) REFERENCES `batch`(`batch_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `enrollment` ADD CONSTRAINT `batch_user_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `enrollment` ADD CONSTRAINT `batch_user_ibfk_2` FOREIGN KEY (`batch_id`) REFERENCES `batch`(`batch_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `enrollment` ADD CONSTRAINT `batch_user_ibfk_3` FOREIGN KEY (`division_id`) REFERENCES `division`(`division_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `exam` ADD CONSTRAINT `exam_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course`(`course_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `exam` ADD CONSTRAINT `exam_ibfk_2` FOREIGN KEY (`division_id`) REFERENCES `division`(`division_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `exam_student` ADD CONSTRAINT `exam_student_ibfk_1` FOREIGN KEY (`exam_id`) REFERENCES `exam`(`exam_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `exam_student` ADD CONSTRAINT `exam_student_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `faculty` ADD CONSTRAINT `department_user_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `faculty` ADD CONSTRAINT `department_user_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `department`(`department_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `floor` ADD CONSTRAINT `floor_ibfk_1` FOREIGN KEY (`building_id`) REFERENCES `building`(`building_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `grade` ADD CONSTRAINT `grade_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `grade` ADD CONSTRAINT `grade_ibfk_2` FOREIGN KEY (`exam_id`) REFERENCES `exam`(`exam_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `lecture` ADD CONSTRAINT `lecture_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `room`(`room_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `lecture` ADD CONSTRAINT `lecture_ibfk_2` FOREIGN KEY (`teaching_id`) REFERENCES `teaching`(`teaching_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `lecture_attendance` ADD CONSTRAINT `lecture_attendance_ibfk_1` FOREIGN KEY (`lecture_id`) REFERENCES `lecture`(`lecture_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `lecture_attendance` ADD CONSTRAINT `lecture_attendance_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `library` ADD CONSTRAINT `library_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department`(`department_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `library` ADD CONSTRAINT `library_ibfk_2` FOREIGN KEY (`building_id`) REFERENCES `building`(`building_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `library_book` ADD CONSTRAINT `library_book_ibfk_1` FOREIGN KEY (`library_id`) REFERENCES `library`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `library_book` ADD CONSTRAINT `library_book_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `book`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `result` ADD CONSTRAINT `result_ibfk_1` FOREIGN KEY (`enrollment_id`) REFERENCES `enrollment`(`enrollment_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `result` ADD CONSTRAINT `result_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `course`(`course_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `room` ADD CONSTRAINT `room_ibfk_1` FOREIGN KEY (`floor_id`) REFERENCES `floor`(`floor_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `syllabus` ADD CONSTRAINT `syllabus_ibfk_1` FOREIGN KEY (`degree_id`) REFERENCES `degree`(`degree_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `syllabus_course` ADD CONSTRAINT `syllabus_course_ibfk_1` FOREIGN KEY (`syllabus_id`) REFERENCES `syllabus`(`syllabus_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `syllabus_course` ADD CONSTRAINT `syllabus_course_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `course`(`course_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `teaching` ADD CONSTRAINT `teaching_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course`(`course_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `teaching` ADD CONSTRAINT `teaching_ibfk_2` FOREIGN KEY (`division_id`) REFERENCES `division`(`division_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `teaching` ADD CONSTRAINT `teaching_ibfk_3` FOREIGN KEY (`professor_id`) REFERENCES `user`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `timetable` ADD CONSTRAINT `timetable_ibfk_1` FOREIGN KEY (`teaching_id`) REFERENCES `teaching`(`teaching_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `timetable` ADD CONSTRAINT `timetable_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `room`(`room_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `university_manager` ADD CONSTRAINT `manager_idfk_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `university_user` ADD CONSTRAINT `uu_user_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
