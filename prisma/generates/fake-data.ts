import { degree_type, assignment_format, course_category, course_type, admission_category, admission_status, grade_type, exam_type, faculty_designation, room_type, room_shape, timetable_weekday, session_type, attendance_status, user_gender } from '@prisma/client';
import { faker } from '@faker-js/faker';
import Decimal from 'decimal.js';



export function fakeuniversity() {
  return {
    name: faker.person.fullName(),
    name_short: faker.lorem.words(5),
  };
}
export function fakeuniversityComplete() {
  return {
    id: faker.number.int(),
    name: faker.person.fullName(),
    name_short: faker.lorem.words(5),
    user_id: faker.number.int(),
  };
}
export function fakedepartment() {
  return {
    name: faker.person.fullName(),
    name_short: faker.lorem.words(5),
  };
}
export function fakedepartmentComplete() {
  return {
    id: faker.number.int(),
    name: faker.person.fullName(),
    name_short: faker.lorem.words(5),
    university_id: faker.number.int(),
  };
}
export function fakedegree() {
  return {
    name: faker.person.fullName(),
    name_short: faker.lorem.words(5),
    type: faker.helpers.arrayElement([degree_type.Diploma, degree_type.Bachelor, degree_type.Master, degree_type.Doctorate, degree_type.Integrated] as const),
  };
}
export function fakedegreeComplete() {
  return {
    id: faker.number.int(),
    name: faker.person.fullName(),
    name_short: faker.lorem.words(5),
    type: faker.helpers.arrayElement([degree_type.Diploma, degree_type.Bachelor, degree_type.Master, degree_type.Doctorate, degree_type.Integrated] as const),
    department_id: faker.number.int(),
  };
}
export function fakeadminComplete() {
  return {
    degree_id: faker.number.int(),
    user_id: faker.number.int(),
  };
}
export function fakeassignment() {
  return {
    title: faker.lorem.words(5),
    description: undefined,
    deadline: faker.date.anytime(),
    format: faker.helpers.arrayElement([assignment_format.written, assignment_format.oral, assignment_format.debate, assignment_format.quiz, assignment_format.project, assignment_format.practical, assignment_format.presentation] as const),
  };
}
export function fakeassignmentComplete() {
  return {
    id: faker.number.int(),
    title: faker.lorem.words(5),
    description: undefined,
    deadline: faker.date.anytime(),
    format: faker.helpers.arrayElement([assignment_format.written, assignment_format.oral, assignment_format.debate, assignment_format.quiz, assignment_format.project, assignment_format.practical, assignment_format.presentation] as const),
    is_group: false,
    graded: true,
    teaching_id: faker.number.int(),
  };
}
export function fakeassignment_submission() {
  return {
    data: faker.lorem.words(5),
    date: faker.date.anytime(),
    obtained_marks: undefined,
    group_number: undefined,
  };
}
export function fakeassignment_submissionComplete() {
  return {
    id: faker.number.int(),
    data: faker.lorem.words(5),
    date: faker.date.anytime(),
    obtained_marks: undefined,
    group_number: undefined,
    assignment_id: faker.number.int(),
    enrollment_id: faker.number.int(),
  };
}
export function fakesyllabus() {
  return {
    code: undefined,
    year_effective: faker.number.int(),
    duration_years: faker.number.int(),
    duration_semesters: faker.number.int(),
  };
}
export function fakesyllabusComplete() {
  return {
    id: faker.number.int(),
    code: undefined,
    year_effective: faker.number.int(),
    duration_years: faker.number.int(),
    duration_semesters: faker.number.int(),
    degree_id: faker.number.int(),
  };
}
export function fakecourse() {
  return {
    code: undefined,
    name: faker.person.fullName(),
    name_short: faker.lorem.words(5),
    type: faker.helpers.arrayElement([course_type.theory, course_type.practical] as const),
    category: undefined,
    credits: faker.number.int(),
    semester: faker.number.int(),
  };
}
export function fakecourseComplete() {
  return {
    id: faker.number.int(),
    code: undefined,
    name: faker.person.fullName(),
    name_short: faker.lorem.words(5),
    type: faker.helpers.arrayElement([course_type.theory, course_type.practical] as const),
    category: undefined,
    credits: faker.number.int(),
    semester: faker.number.int(),
    syllabus_id: faker.number.int(),
  };
}
export function fakechapter() {
  return {
    number: faker.number.int(),
    title: undefined,
    description: undefined,
    topics: undefined,
    weightage: undefined,
  };
}
export function fakechapterComplete() {
  return {
    id: faker.number.int(),
    number: faker.number.int(),
    title: undefined,
    description: undefined,
    topics: undefined,
    weightage: undefined,
    course_id: faker.number.int(),
  };
}
export function fakecourse_resource() {
  return {
    title: faker.lorem.words(5),
    url: faker.lorem.words(5),
    type: faker.lorem.words(5),
  };
}
export function fakecourse_resourceComplete() {
  return {
    id: faker.number.int(),
    title: faker.lorem.words(5),
    url: faker.lorem.words(5),
    type: faker.lorem.words(5),
    course_id: faker.number.int(),
  };
}
export function fakeadmission() {
  return {
    applied_date: faker.date.anytime(),
    category: undefined,
    quota: undefined,
    status: undefined,
  };
}
export function fakeadmissionComplete() {
  return {
    id: faker.number.int(),
    applied_date: faker.date.anytime(),
    category: undefined,
    quota: undefined,
    status: undefined,
    batch_id: faker.number.int(),
    user_id: faker.number.int(),
  };
}
export function fakebatch() {
  return {
    start_year: faker.number.int(),
    finish_year: undefined,
    current_semester: undefined,
  };
}
export function fakebatchComplete() {
  return {
    id: faker.number.int(),
    start_year: faker.number.int(),
    finish_year: undefined,
    current_semester: undefined,
    syllabus_id: faker.number.int(),
  };
}
export function fakedivision() {
  return {
    name: faker.person.fullName(),
  };
}
export function fakedivisionComplete() {
  return {
    id: faker.number.int(),
    name: faker.person.fullName(),
    batch_id: faker.number.int(),
    course_id: undefined,
  };
}
export function fakeenrollment() {
  return {
    enrollment_number: undefined,
    roll_number: undefined,
  };
}
export function fakeenrollmentComplete() {
  return {
    id: faker.number.int(),
    enrollment_number: undefined,
    roll_number: undefined,
    batch_id: faker.number.int(),
    division_id: undefined,
    user_id: faker.number.int(),
  };
}
export function fakeresult() {
  return {
    grade: faker.lorem.words(5),
    marks: faker.number.int(),
    status_result: undefined,
    status_enrollment: faker.lorem.words(5),
  };
}
export function fakeresultComplete() {
  return {
    id: faker.number.int(),
    grade: faker.lorem.words(5),
    marks: faker.number.int(),
    status_result: undefined,
    status_enrollment: faker.lorem.words(5),
    course_id: faker.number.int(),
    enrollment_id: faker.number.int(),
    division_id: undefined,
  };
}
export function fakeexam() {
  return {
    title: faker.lorem.words(5),
    description: faker.lorem.words(5),
    date: faker.date.anytime(),
    time: faker.date.anytime(),
    duration: faker.date.anytime(),
    maximum_marks: faker.number.int(),
  };
}
export function fakeexamComplete() {
  return {
    id: faker.number.int(),
    title: faker.lorem.words(5),
    description: faker.lorem.words(5),
    date: faker.date.anytime(),
    time: faker.date.anytime(),
    duration: faker.date.anytime(),
    maximum_marks: faker.number.int(),
    course_id: faker.number.int(),
    batch_id: undefined,
    division_id: undefined,
  };
}
export function fakeexam_enrollment() {
  return {
    answer_paper_number: faker.lorem.words(5),
    marks_obtained: faker.number.int(),
    row_num: undefined,
    col_num: undefined,
  };
}
export function fakeexam_enrollmentComplete() {
  return {
    id: faker.number.int(),
    answer_paper_number: faker.lorem.words(5),
    marks_obtained: faker.number.int(),
    row_num: undefined,
    col_num: undefined,
    exam_id: faker.number.int(),
    enrollment_id: faker.number.int(),
    room_id: undefined,
  };
}
export function fakefaculty() {
  return {
    designation: faker.helpers.arrayElement([faculty_designation.dean, faculty_designation.head, faculty_designation.assistant_professor, faculty_designation.associate_professor, faculty_designation.librarian, faculty_designation.clerk, faculty_designation.professor] as const),
    date_join: undefined,
    date_leave: undefined,
    qualification: undefined,
    experience_years: undefined,
    specialization: undefined,
    research_interest: undefined,
  };
}
export function fakefacultyComplete() {
  return {
    id: faker.number.int(),
    designation: faker.helpers.arrayElement([faculty_designation.dean, faculty_designation.head, faculty_designation.assistant_professor, faculty_designation.associate_professor, faculty_designation.librarian, faculty_designation.clerk, faculty_designation.professor] as const),
    date_join: undefined,
    date_leave: undefined,
    qualification: undefined,
    experience_years: undefined,
    specialization: undefined,
    research_interest: undefined,
    department_id: faker.number.int(),
    user_id: faker.number.int(),
  };
}
export function fakecampus() {
  return {
    name: faker.person.fullName(),
    address: faker.lorem.words(5),
    city: faker.lorem.words(5),
    state: faker.lorem.words(5),
    country: faker.lorem.words(5),
    pincode: faker.number.int(),
  };
}
export function fakecampusComplete() {
  return {
    id: faker.number.int(),
    name: faker.person.fullName(),
    address: faker.lorem.words(5),
    city: faker.lorem.words(5),
    state: faker.lorem.words(5),
    country: faker.lorem.words(5),
    pincode: faker.number.int(),
    gate_count: 1,
    university_id: faker.number.int(),
  };
}
export function fakebuilding() {
  return {
    name: faker.person.fullName(),
  };
}
export function fakebuildingComplete() {
  return {
    id: faker.number.int(),
    name: faker.person.fullName(),
    campus_id: faker.number.int(),
  };
}
export function fakefloor() {
  return {
    number: faker.number.int(),
  };
}
export function fakefloorComplete() {
  return {
    id: faker.number.int(),
    number: faker.number.int(),
    building_id: faker.number.int(),
  };
}
export function fakeroom() {
  return {
    number: faker.number.int(),
    capacity: undefined,
    row_count: undefined,
    column_count: undefined,
  };
}
export function fakeroomComplete() {
  return {
    id: faker.number.int(),
    number: faker.number.int(),
    type: room_type.classroom,
    shape: room_shape.rectangular,
    capacity: undefined,
    row_count: undefined,
    column_count: undefined,
    floor_id: faker.number.int(),
  };
}
export function faketeachingComplete() {
  return {
    id: faker.number.int(),
    course_id: faker.number.int(),
    batch_id: undefined,
    division_id: undefined,
    professor_id: faker.number.int(),
  };
}
export function faketimetable() {
  return {
    weekday: faker.helpers.arrayElement([timetable_weekday.monday, timetable_weekday.tuesday, timetable_weekday.wednesday, timetable_weekday.thursday, timetable_weekday.friday, timetable_weekday.saturday, timetable_weekday.sunday] as const),
    start_time: faker.date.anytime(),
    end_time: faker.date.anytime(),
  };
}
export function faketimetableComplete() {
  return {
    id: faker.number.int(),
    weekday: faker.helpers.arrayElement([timetable_weekday.monday, timetable_weekday.tuesday, timetable_weekday.wednesday, timetable_weekday.thursday, timetable_weekday.friday, timetable_weekday.saturday, timetable_weekday.sunday] as const),
    start_time: faker.date.anytime(),
    end_time: faker.date.anytime(),
    teaching_id: faker.number.int(),
    room_id: faker.number.int(),
  };
}
export function fakesession() {
  return {
    start_time: faker.date.anytime(),
    end_time: faker.date.anytime(),
  };
}
export function fakesessionComplete() {
  return {
    id: faker.number.int(),
    open_for_attendance: false,
    type: session_type.lecture,
    start_time: faker.date.anytime(),
    end_time: faker.date.anytime(),
    teaching_id: faker.number.int(),
    room_id: faker.number.int(),
  };
}
export function fakesession_attendance() {
  return {
    position_row: undefined,
    position_column: undefined,
  };
}
export function fakesession_attendanceComplete() {
  return {
    id: faker.number.int(),
    position_row: undefined,
    position_column: undefined,
    status: attendance_status.pending,
    session_id: faker.number.int(),
    enrollment_id: faker.number.int(),
  };
}
export function fakeuser() {
  return {
    username: undefined,
    password: faker.lorem.words(5),
    contact_no: undefined,
    email: undefined,
    name_prefix: undefined,
    name_first: faker.lorem.words(5),
    name_middle: undefined,
    name_last: undefined,
    name_suffix: undefined,
    gender: undefined,
    date_of_birth: undefined,
    profile_picture_url: undefined,
  };
}
export function fakeuserComplete() {
  return {
    id: faker.number.int(),
    username: undefined,
    password: faker.lorem.words(5),
    contact_no: undefined,
    email: undefined,
    name_prefix: undefined,
    name_first: faker.lorem.words(5),
    name_middle: undefined,
    name_last: undefined,
    name_suffix: undefined,
    gender: undefined,
    date_of_birth: undefined,
    profile_picture_url: undefined,
  };
}
