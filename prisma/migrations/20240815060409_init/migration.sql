-- CreateTable
CREATE TABLE `admin` (
    `degree_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `INDX_admin_degree`(`degree_id`),
    INDEX `INDX_admin_user`(`user_id`),
    UNIQUE INDEX `UK_admin_degree_user`(`degree_id`, `user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `applied_date` DATETIME(3) NOT NULL,
    `category` ENUM('general', 'SC', 'ST', 'OBC', 'EWS', 'PWD', 'TFW') NULL,
    `quota` VARCHAR(45) NULL,
    `status` ENUM('pending', 'rejected', 'enrolled') NULL,
    `batch_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `INDX_admission_batch`(`batch_id`),
    INDEX `INDX_admission_user`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `assignment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(50) NOT NULL,
    `description` VARCHAR(255) NULL,
    `deadline` DATETIME NOT NULL,
    `format` ENUM('written', 'oral', 'debate', 'quiz', 'project', 'practical', 'presentation') NOT NULL,
    `is_group` BOOLEAN NULL DEFAULT false,
    `graded` BOOLEAN NULL DEFAULT true,
    `teaching_id` INTEGER NOT NULL,

    INDEX `INDX_assignment_teaching`(`teaching_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `assignment_submission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` VARCHAR(255) NOT NULL,
    `date` DATETIME NOT NULL,
    `obtained_marks` INTEGER NULL,
    `group_number` INTEGER NULL,
    `assignment_id` INTEGER NOT NULL,
    `enrollment_id` INTEGER NOT NULL,

    INDEX `INDX_as_assignment`(`assignment_id`),
    INDEX `INDX_as_enrollment`(`enrollment_id`),
    UNIQUE INDEX `UK_as_assignment_enrollment`(`assignment_id`, `enrollment_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `auth_session` (
    `id` INTEGER NOT NULL,
    `value` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `author` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`id`)
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
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `start_year` INTEGER NOT NULL,
    `finish_year` INTEGER NOT NULL,
    `current_semester` INTEGER NOT NULL,
    `syllabus_id` INTEGER NOT NULL,

    INDEX `INDX_batch_syllabus`(`syllabus_id`),
    UNIQUE INDEX `UK_batch_year_syllabus`(`start_year`, `syllabus_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `book` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(30) NOT NULL,
    `brn_id` INTEGER NULL,
    `price` INTEGER NULL,
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

    INDEX `INDX_book_course_course`(`course_id`),
    PRIMARY KEY (`book_id`, `course_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `book_issue_return` (
    `id` INTEGER NOT NULL,
    `issue_date` DATE NULL,
    `supposed_return_date` DATE NULL,
    `actual_return_date` DATE NULL,
    `fine` INTEGER NULL,
    `book_id` INTEGER NULL,
    `user_id` INTEGER NULL,

    INDEX `book_transaction_book_idx`(`book_id`),
    INDEX `book_transaction_user_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `building` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `campus_id` INTEGER NOT NULL,

    UNIQUE INDEX `UK_building_name`(`name`),
    INDEX `INDX_building_campus`(`campus_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `campus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `city` VARCHAR(100) NOT NULL,
    `state` VARCHAR(100) NOT NULL,
    `country` VARCHAR(100) NOT NULL,
    `pincode` VARCHAR(10) NOT NULL,
    `gate_count` INTEGER NULL DEFAULT 1,

    UNIQUE INDEX `UK_campus_name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chapter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` INTEGER NOT NULL,
    `title` VARCHAR(50) NULL,
    `description` VARCHAR(100) NULL,
    `topics` VARCHAR(255) NULL,
    `weightage` INTEGER NULL,
    `course_id` INTEGER NOT NULL,

    INDEX `INDX_chapter_course`(`course_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `course` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(20) NULL,
    `name` VARCHAR(100) NOT NULL,
    `name_acronym` VARCHAR(20) NOT NULL,
    `type` ENUM('theory', 'practical') NOT NULL,
    `category` ENUM('core', 'elective', 'project', 'MOOC', 'foundation') NULL,
    `credits` INTEGER NOT NULL,
    `semester` INTEGER NOT NULL,
    `syllabus_id` INTEGER NOT NULL,

    UNIQUE INDEX `UK_course_code`(`code`),
    INDEX `INDX_course_code`(`code`),
    INDEX `INDX_course_syllabus`(`syllabus_id`),
    UNIQUE INDEX `UK_course_name`(`syllabus_id`, `name`),
    UNIQUE INDEX `UK_course_name_acronym`(`syllabus_id`, `name_acronym`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `course_user_elective` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `degree` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `name_acronym` VARCHAR(20) NOT NULL,
    `type` ENUM('Diploma', 'Bachelor', 'Master', 'Doctorate', 'Integrated') NOT NULL,
    `department_id` INTEGER NOT NULL,

    UNIQUE INDEX `UK_degree_name`(`name`),
    UNIQUE INDEX `UK_degree_name_acronym`(`name_acronym`),
    INDEX `INDX_degree_department`(`department_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `department` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `name_acronym` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `UK_department_name`(`name`),
    UNIQUE INDEX `UK_department_name_acronym`(`name_acronym`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `division` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `batch_id` INTEGER NOT NULL,

    INDEX `INDX_division_batch`(`batch_id`),
    UNIQUE INDEX `UK_division_name_batch`(`name`, `batch_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `enrollment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `enrollment_number` BIGINT NULL,
    `roll_number` VARCHAR(5) NULL,
    `batch_id` INTEGER NOT NULL,
    `division_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    UNIQUE INDEX `UK_enrollment_number`(`enrollment_number`),
    INDEX `INDX_enrollment_user`(`user_id`),
    INDEX `INDX_enrollment_batch`(`batch_id`),
    INDEX `INDX_enrollment_division`(`division_id`),
    UNIQUE INDEX `UK_enrollment_batch_user`(`batch_id`, `user_id`),
    UNIQUE INDEX `UK_enrollment_division_user`(`division_id`, `user_id`),
    PRIMARY KEY (`id`)
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
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(50) NOT NULL,
    `description` VARCHAR(100) NOT NULL,
    `date` DATETIME NOT NULL,
    `time` TIME NOT NULL,
    `duration` TIME NOT NULL,
    `maximum_marks` INTEGER NOT NULL,
    `course_id` INTEGER NOT NULL,
    `division_id` INTEGER NOT NULL,

    INDEX `INDX_exam_course`(`course_id`),
    INDEX `INDX_exam_division`(`division_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exam_student` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `answer_paper_number` VARCHAR(255) NOT NULL,
    `marks_obtained` INTEGER NOT NULL,
    `exam_id` INTEGER NOT NULL,
    `enrollment_id` INTEGER NOT NULL,

    INDEX `INDX_exam_student_exam`(`exam_id`),
    INDEX `INDX_exam_student_enrollment`(`enrollment_id`),
    UNIQUE INDEX `exam_student_exam_id_enrollment_id_key`(`exam_id`, `enrollment_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `faculty` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `designation` ENUM('dean', 'head', 'assistant professor', 'associate professor', 'librarian', 'clerk', 'professor') NOT NULL,
    `date_join` DATE NULL,
    `date_leave` DATE NULL,
    `qualification` VARCHAR(50) NULL,
    `experience_years` INTEGER NULL,
    `specialization` VARCHAR(50) NULL,
    `research_interest` VARCHAR(50) NULL,
    `department_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `INDX_faculty_department`(`department_id`),
    INDEX `INDX_faculty_user`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `floor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` INTEGER NOT NULL,
    `building_id` INTEGER NOT NULL,

    INDEX `INDX_floor_building`(`building_id`),
    PRIMARY KEY (`id`)
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

    UNIQUE INDEX `UK_library_name`(`name`),
    INDEX `INDX_library_building`(`building_id`),
    INDEX `INDX_library_department`(`department_id`),
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
    INDEX `library_book_idx`(`book_id`),
    UNIQUE INDEX `library_book_UNIQUE`(`library_id`, `book_id`),
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
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `room_number` INTEGER NOT NULL,
    `room_type` ENUM('admin_office', 'art', 'auditorium', 'canteen', 'conference', 'classroom', 'computer', 'lab', 'law', 'library', 'meeting', 'office', 'reading', 'store', 'utility', 'washroom') NULL,
    `shape` ENUM('circular', 'curve', 'rectangular') NULL,
    `capacity` INTEGER NULL,
    `count_row` INTEGER NULL,
    `count_column` INTEGER NULL,
    `floor_id` INTEGER NOT NULL,

    INDEX `INDX_room_floor`(`floor_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `salary` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `session` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `open_for_attendance` BOOLEAN NOT NULL DEFAULT false,
    `type` ENUM('lecture', 'lab', 'tutorial', 'practical', 'seminar', 'workshop', 'conference') NOT NULL DEFAULT 'lecture',
    `date` DATE NOT NULL,
    `time_start` TIME(0) NOT NULL,
    `time_end` TIME(0) NOT NULL,
    `teaching_id` INTEGER NOT NULL,
    `room_id` INTEGER NOT NULL,

    INDEX `INDX_session_teaching`(`teaching_id`),
    INDEX `INDX_session_room`(`room_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `session_attendance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `position_row` INTEGER NULL,
    `position_column` INTEGER NULL,
    `status` ENUM('pending', 'present', 'absent', 'late', 'leave') NULL DEFAULT 'pending',
    `session_id` INTEGER NOT NULL,
    `enrollment_id` INTEGER NOT NULL,

    INDEX `INDX_sa_session`(`session_id`),
    INDEX `INDX_sa_enrollment`(`enrollment_id`),
    UNIQUE INDEX `UK_sa_session_enrollment`(`session_id`, `enrollment_id`),
    UNIQUE INDEX `UK_sa_session_position`(`session_id`, `position_row`, `position_column`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `staff` (
    `id` INTEGER NOT NULL,
    `role` VARCHAR(45) NOT NULL,
    `salary` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `syllabus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(20) NULL,
    `year_effective` INTEGER NOT NULL,
    `year_retired` INTEGER NULL,
    `duration_semesters` INTEGER NOT NULL,
    `degree_id` INTEGER NOT NULL,

    UNIQUE INDEX `UK_syllabus_code`(`code`),
    INDEX `INDX_syllabus_degree`(`degree_id`),
    UNIQUE INDEX `UK_syllabus_code_year`(`code`, `year_effective`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teaching` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `course_id` INTEGER NOT NULL,
    `division_id` INTEGER NOT NULL,
    `professor_id` INTEGER NOT NULL,

    INDEX `INDX_teaching_course`(`course_id`),
    INDEX `INDX_teaching_division`(`division_id`),
    INDEX `INDX_teaching_professor`(`professor_id`),
    UNIQUE INDEX `UK_teaching_cdp`(`course_id`, `division_id`, `professor_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `timetable` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `time_start` TIME(0) NOT NULL,
    `time_end` TIME(0) NOT NULL,
    `weekday` ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday') NOT NULL,
    `teaching_id` INTEGER NOT NULL,
    `room_id` INTEGER NOT NULL,

    INDEX `INDX_timetable_teaching`(`teaching_id`),
    INDEX `INDX_timetable_room`(`room_id`),
    UNIQUE INDEX `UK_timetable_wtstet`(`weekday`, `time_start`, `time_end`, `teaching_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction_faculty` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATE NOT NULL,
    `amount` INTEGER NOT NULL,
    `faculty_id` INTEGER NOT NULL,

    INDEX `INDX_tf_faculty`(`faculty_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction_student` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `enrollment_id` INTEGER NOT NULL,
    `date` DATE NOT NULL,
    `amount` INTEGER NOT NULL,

    INDEX `INDX_ts_enrollment`(`enrollment_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `university_manager` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,

    INDEX `manager_idfk_1_idx`(`user_id`),
    PRIMARY KEY (`id`)
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
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NULL,
    `password` VARCHAR(50) NOT NULL,
    `contact_no` VARCHAR(20) NULL,
    `primary_email` VARCHAR(50) NULL,
    `google_email` VARCHAR(50) NULL,
    `name_prefix` VARCHAR(50) NULL,
    `name_first` VARCHAR(50) NOT NULL,
    `name_middle` VARCHAR(50) NULL,
    `name_last` VARCHAR(50) NULL,
    `name_suffix` VARCHAR(50) NULL,
    `gender` ENUM('M', 'F', 'O') NULL,
    `date_of_birth` DATE NULL,
    `profile_picture_url` VARCHAR(255) NULL,

    UNIQUE INDEX `UK_user_username`(`username`),
    UNIQUE INDEX `UK_user_contact_no`(`contact_no`),
    UNIQUE INDEX `UK_user_primary_email`(`primary_email`),
    UNIQUE INDEX `UK_user_google_email`(`google_email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `admin` ADD CONSTRAINT `FK_admin_degree` FOREIGN KEY (`degree_id`) REFERENCES `degree`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `admin` ADD CONSTRAINT `FK_admin_user` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `admission` ADD CONSTRAINT `FK_admission_batch` FOREIGN KEY (`batch_id`) REFERENCES `batch`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `admission` ADD CONSTRAINT `FK_admission_user` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `assignment` ADD CONSTRAINT `FK_assignment_teaching` FOREIGN KEY (`teaching_id`) REFERENCES `teaching`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `assignment_submission` ADD CONSTRAINT `FK_as_assignment` FOREIGN KEY (`assignment_id`) REFERENCES `assignment`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `assignment_submission` ADD CONSTRAINT `FK_as_enrollment` FOREIGN KEY (`enrollment_id`) REFERENCES `enrollment`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `author_book` ADD CONSTRAINT `author_book_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `book`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `author_book` ADD CONSTRAINT `author_book_ibfk_2` FOREIGN KEY (`author_id`) REFERENCES `author`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `batch` ADD CONSTRAINT `FK_batch_syllabus` FOREIGN KEY (`syllabus_id`) REFERENCES `syllabus`(`id`) ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `book_course` ADD CONSTRAINT `FK_book_course_book` FOREIGN KEY (`book_id`) REFERENCES `book`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `book_course` ADD CONSTRAINT `FK_book_course_course` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `book_issue_return` ADD CONSTRAINT `book_issue_return_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `book`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `book_issue_return` ADD CONSTRAINT `book_issue_return_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `building` ADD CONSTRAINT `FK_building_campus` FOREIGN KEY (`campus_id`) REFERENCES `campus`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `chapter` ADD CONSTRAINT `FK_chapter_course` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `course` ADD CONSTRAINT `FK_course_syllabus` FOREIGN KEY (`syllabus_id`) REFERENCES `syllabus`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `degree` ADD CONSTRAINT `FK_degree_department` FOREIGN KEY (`department_id`) REFERENCES `department`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `division` ADD CONSTRAINT `FK_division_batch` FOREIGN KEY (`batch_id`) REFERENCES `batch`(`id`) ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `enrollment` ADD CONSTRAINT `FK_enrollment_batch` FOREIGN KEY (`batch_id`) REFERENCES `batch`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `enrollment` ADD CONSTRAINT `FK_enrollment_division` FOREIGN KEY (`division_id`) REFERENCES `division`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `enrollment` ADD CONSTRAINT `FK_enrollment_user` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `exam` ADD CONSTRAINT `FK_exam_course` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `exam` ADD CONSTRAINT `FK_exam_division` FOREIGN KEY (`division_id`) REFERENCES `division`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `exam_student` ADD CONSTRAINT `FK_exam_student_exam` FOREIGN KEY (`exam_id`) REFERENCES `exam`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `exam_student` ADD CONSTRAINT `FK_exam_student_enrollment` FOREIGN KEY (`enrollment_id`) REFERENCES `enrollment`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `faculty` ADD CONSTRAINT `FK_faculty_department` FOREIGN KEY (`department_id`) REFERENCES `department`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `faculty` ADD CONSTRAINT `FK_faculty_user` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `floor` ADD CONSTRAINT `FK_floor_building` FOREIGN KEY (`building_id`) REFERENCES `building`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `library` ADD CONSTRAINT `FK_library_department` FOREIGN KEY (`department_id`) REFERENCES `department`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `library` ADD CONSTRAINT `FK_library_building` FOREIGN KEY (`building_id`) REFERENCES `building`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `library_book` ADD CONSTRAINT `library_book_ibfk_1` FOREIGN KEY (`library_id`) REFERENCES `library`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `library_book` ADD CONSTRAINT `library_book_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `book`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `result` ADD CONSTRAINT `result_ibfk_1` FOREIGN KEY (`enrollment_id`) REFERENCES `enrollment`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `result` ADD CONSTRAINT `result_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `room` ADD CONSTRAINT `FK_room_floor` FOREIGN KEY (`floor_id`) REFERENCES `floor`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `session` ADD CONSTRAINT `FK_session_teaching` FOREIGN KEY (`teaching_id`) REFERENCES `teaching`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `session` ADD CONSTRAINT `FK_session_room` FOREIGN KEY (`room_id`) REFERENCES `room`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `session_attendance` ADD CONSTRAINT `FK_sa_session` FOREIGN KEY (`session_id`) REFERENCES `session`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `session_attendance` ADD CONSTRAINT `FK_sa_enrollment` FOREIGN KEY (`enrollment_id`) REFERENCES `enrollment`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `syllabus` ADD CONSTRAINT `FK_syllabus_degree` FOREIGN KEY (`degree_id`) REFERENCES `degree`(`id`) ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `teaching` ADD CONSTRAINT `FK_teaching_course` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `teaching` ADD CONSTRAINT `FK_teaching_division` FOREIGN KEY (`division_id`) REFERENCES `division`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `teaching` ADD CONSTRAINT `FK_teaching_professor` FOREIGN KEY (`professor_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `timetable` ADD CONSTRAINT `FK_timetable_teaching` FOREIGN KEY (`teaching_id`) REFERENCES `teaching`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `timetable` ADD CONSTRAINT `FK_timetable_room` FOREIGN KEY (`room_id`) REFERENCES `room`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `transaction_faculty` ADD CONSTRAINT `FK_tf_faculty` FOREIGN KEY (`faculty_id`) REFERENCES `faculty`(`id`) ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `transaction_student` ADD CONSTRAINT `FK_ts_enrollment` FOREIGN KEY (`enrollment_id`) REFERENCES `enrollment`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `university_manager` ADD CONSTRAINT `manager_idfk_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `university_user` ADD CONSTRAINT `FK_university_user_user` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
