import zod, { nullable, number, object, optional, string, z } from 'zod';
import { degree_type, type Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UniversityScalarFieldEnumSchema = z.enum(['id','name','name_short','user_id']);

export const DepartmentScalarFieldEnumSchema = z.enum(['id','name','name_short','university_id']);

export const DegreeScalarFieldEnumSchema = z.enum(['id','name','name_short','type','department_id']);

export const AdminScalarFieldEnumSchema = z.enum(['degree_id','user_id']);

export const AssignmentScalarFieldEnumSchema = z.enum(['id','title','description','deadline','format','is_group','graded','teaching_id']);

export const Assignment_submissionScalarFieldEnumSchema = z.enum(['id','data','date','obtained_marks','group_number','assignment_id','enrollment_id']);

export const SyllabusScalarFieldEnumSchema = z.enum(['id','code','year_effective','duration_years','duration_semesters','degree_id']);

export const CourseScalarFieldEnumSchema = z.enum(['id','code','name','name_short','type','category','credits','semester','syllabus_id']);

export const ChapterScalarFieldEnumSchema = z.enum(['id','number','title','description','topics','weightage','course_id']);

export const Course_resourceScalarFieldEnumSchema = z.enum(['id','title','url','type','course_id']);

export const AdmissionScalarFieldEnumSchema = z.enum(['id','applied_date','category','quota','status','batch_id','user_id']);

export const BatchScalarFieldEnumSchema = z.enum(['id','start_year','finish_year','current_semester','syllabus_id']);

export const DivisionScalarFieldEnumSchema = z.enum(['id','name','batch_id','course_id']);

export const EnrollmentScalarFieldEnumSchema = z.enum(['id','enrollment_number','roll_number','batch_id','division_id','user_id']);

export const ResultScalarFieldEnumSchema = z.enum(['id','grade','marks','status_result','status_enrollment','course_id','enrollment_id','division_id']);

export const ExamScalarFieldEnumSchema = z.enum(['id','title','description','date','time','duration','maximum_marks','course_id','batch_id','division_id']);

export const Exam_enrollmentScalarFieldEnumSchema = z.enum(['id','answer_paper_number','marks_obtained','row_num','col_num','exam_id','enrollment_id','room_id']);

export const FacultyScalarFieldEnumSchema = z.enum(['id','designation','date_join','date_leave','qualification','experience_years','specialization','research_interest','department_id','user_id']);

export const CampusScalarFieldEnumSchema = z.enum(['id','name','address','city','state','country','pincode','gate_count','university_id']);

export const BuildingScalarFieldEnumSchema = z.enum(['id','name','campus_id']);

export const FloorScalarFieldEnumSchema = z.enum(['id','number','building_id']);

export const RoomScalarFieldEnumSchema = z.enum(['id','number','type','shape','capacity','row_count','column_count','floor_id']);

export const TeachingScalarFieldEnumSchema = z.enum(['id','course_id','batch_id','division_id','professor_id']);

export const TimetableScalarFieldEnumSchema = z.enum(['id','weekday','start_time','end_time','teaching_id','room_id']);

export const SessionScalarFieldEnumSchema = z.enum(['id','open_for_attendance','type','start_time','end_time','teaching_id','room_id']);

export const Session_attendanceScalarFieldEnumSchema = z.enum(['id','position_row','position_column','status','session_id','enrollment_id']);

export const UserScalarFieldEnumSchema = z.enum(['id','username','password','contact_no','email','name_prefix','name_first','name_middle','name_last','name_suffix','gender','date_of_birth','profile_picture_url']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullsOrderSchema = z.enum(['first','last']);

export const degree_typeSchema = z.enum(['Diploma','Bachelor','Master','Doctorate','Integrated']);

export type degree_typeType = `${z.infer<typeof degree_typeSchema>}`

export const assignment_formatSchema = z.enum(['written','oral','debate','quiz','project','practical','presentation']);

export type assignment_formatType = `${z.infer<typeof assignment_formatSchema>}`

export const course_categorySchema = z.enum(['core','elective','project','MOOC','foundation']);

export type course_categoryType = `${z.infer<typeof course_categorySchema>}`

export const course_typeSchema = z.enum(['theory','practical']);

export type course_typeType = `${z.infer<typeof course_typeSchema>}`

export const admission_categorySchema = z.enum(['general','SC','ST','OBC','EWS','PWD','TFW']);

export type admission_categoryType = `${z.infer<typeof admission_categorySchema>}`

export const admission_statusSchema = z.enum(['pending','rejected','enrolled']);

export type admission_statusType = `${z.infer<typeof admission_statusSchema>}`

export const grade_typeSchema = z.enum(['cec','attendance','internal_exam','external_exam','assignment','project','practical']);

export type grade_typeType = `${z.infer<typeof grade_typeSchema>}`

export const exam_typeSchema = z.enum(['internal','external']);

export type exam_typeType = `${z.infer<typeof exam_typeSchema>}`

export const faculty_designationSchema = z.enum(['dean','head','assistant_professor','associate_professor','librarian','clerk','professor']);

export type faculty_designationType = `${z.infer<typeof faculty_designationSchema>}`

export const room_typeSchema = z.enum(['admin_office','art','auditorium','canteen','conference','classroom','computer','lab','law','library','meeting','office','reading','store','utility','washroom']);

export type room_typeType = `${z.infer<typeof room_typeSchema>}`

export const room_shapeSchema = z.enum(['circular','curve','rectangular']);

export type room_shapeType = `${z.infer<typeof room_shapeSchema>}`

export const timetable_weekdaySchema = z.enum(['monday','tuesday','wednesday','thursday','friday','saturday','sunday']);

export type timetable_weekdayType = `${z.infer<typeof timetable_weekdaySchema>}`

export const session_typeSchema = z.enum(['lecture','lab','tutorial','practical','seminar','workshop','conference']);

export type session_typeType = `${z.infer<typeof session_typeSchema>}`

export const attendance_statusSchema = z.enum(['pending','present','absent','late','leave']);

export type attendance_statusType = `${z.infer<typeof attendance_statusSchema>}`

export const user_genderSchema = z.enum(['M','F','O']);

export type user_genderType = `${z.infer<typeof user_genderSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// UNIVERSITY SCHEMA
/////////////////////////////////////////

// export const universitySchema = object({
//   name: string({ required_error: "Name is required" })
//     .min(1, "Name is required")
//     .max(255, "Name must be less than 255 characters"),
//   name_short: string({ required_error: "Name Short is required" })
//     .min(1, "Name Short is required")
//     .max(50, "Name Short must be less than 255 characters"),
// })
export const universitySchema = z.object({
  id: z.coerce.number().int().optional(), //.transform((v: any) => parseInt(v)),
  name: z.string().min(1).max(255).trim(),
  name_short: z.string().min(1).max(50).trim(),
  user_id: z.coerce.number().int().optional(), //.transform((v: any) => parseInt(v)),
})

export type university = z.infer<typeof universitySchema>

/////////////////////////////////////////
// DEPARTMENT SCHEMA
/////////////////////////////////////////

export const departmentSchema = z.object({
  id: z.coerce.number().int(),
  name: z.string(),
  name_short: z.string(),
  university_id: z.coerce.number().int(),
})

export type department = z.infer<typeof departmentSchema>

/////////////////////////////////////////
// DEGREE SCHEMA
/////////////////////////////////////////

export const degreeSchema = z.object({
  id: z.coerce.number().int(),
  name: z.string(),
  name_short: z.string(),
  type: degree_typeSchema,
  // type: z.enum(Object.keys(degree_type)),
  department_id: z.coerce.number().int(),
})

export type degree = z.infer<typeof degreeSchema>

/////////////////////////////////////////
// ADMIN SCHEMA
/////////////////////////////////////////

export const adminSchema = z.object({
  degree_id: z.coerce.number().int(),
  user_id: z.coerce.number().int(),
})

export type admin = z.infer<typeof adminSchema>

/////////////////////////////////////////
// ASSIGNMENT SCHEMA
/////////////////////////////////////////

export const assignmentSchema = z.object({
  format: assignment_formatSchema,
  id: z.number().int(),
  title: z.string(),
  description: z.string().nullable(),
  deadline: z.coerce.date(),
  is_group: z.boolean().nullable(),
  graded: z.boolean().nullable(),
  teaching_id: z.number().int(),
})

export type assignment = z.infer<typeof assignmentSchema>

/////////////////////////////////////////
// ASSIGNMENT SUBMISSION SCHEMA
/////////////////////////////////////////

export const assignment_submissionSchema = z.object({
  id: z.number().int(),
  data: z.string(),
  date: z.coerce.date(),
  obtained_marks: z.number().int().nullable(),
  group_number: z.number().int().nullable(),
  assignment_id: z.number().int(),
  enrollment_id: z.number().int(),
})

export type assignment_submission = z.infer<typeof assignment_submissionSchema>

/////////////////////////////////////////
// SYLLABUS SCHEMA
/////////////////////////////////////////

export const syllabusSchema = z.object({
  id: z.coerce.number().int().optional(),
  code: z.string().nullable().transform((v: any) => v == "NULL" ? null : v),
  year_effective: z.coerce.number().int(),
  duration_years: z.coerce.number().int().optional(),
  duration_semesters: z.coerce.number().int(),
  degree_id: z.coerce.number().int(),
})

export type syllabus = z.infer<typeof syllabusSchema>

/////////////////////////////////////////
// COURSE SCHEMA
/////////////////////////////////////////

export const courseSchema = z.object({
  id: z.coerce.number().int(),
  code: z.string().nullable().transform((v: any) => v == "NULL" ? null : v),
  name: z.string(),
  name_short: z.string(),
  credits: z.coerce.number().int(),
  semester: z.coerce.number().int(),
  type: course_typeSchema,
  category: course_categorySchema.nullable(),
  syllabus_id: z.coerce.number().int(),
})

export type course = z.infer<typeof courseSchema>

/////////////////////////////////////////
// CHAPTER SCHEMA
/////////////////////////////////////////

export const chapterSchema = z.object({
  id: z.number().int(),
  number: z.number().int(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  topics: z.string().nullable(),
  weightage: z.number().int().nullable(),
  course_id: z.number().int(),
})

export type chapter = z.infer<typeof chapterSchema>

/////////////////////////////////////////
// COURSE RESOURCE SCHEMA
/////////////////////////////////////////

export const course_resourceSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  url: z.string(),
  type: z.string(),
  course_id: z.number().int(),
})

export type course_resource = z.infer<typeof course_resourceSchema>

/////////////////////////////////////////
// ADMISSION SCHEMA
/////////////////////////////////////////

export const admissionSchema = z.object({
  category: admission_categorySchema.nullable(),
  status: admission_statusSchema.nullable(),
  id: z.number().int(),
  applied_date: z.coerce.date(),
  quota: z.string().nullable(),
  batch_id: z.number().int(),
  user_id: z.number().int(),
})

export type admission = z.infer<typeof admissionSchema>

/////////////////////////////////////////
// BATCH SCHEMA
/////////////////////////////////////////

export const batchSchema = z.object({
  id: z.coerce.number().int(),
  start_year: z.coerce.number().int(),
  finish_year: z.string().transform((v: any) => v == "NULL" || v == "NaN" ? null : parseInt(v)),
  current_semester: z.coerce.number().int().nullable(),
  syllabus_id: z.coerce.number().int(),
})

export type batch = z.infer<typeof batchSchema>

/////////////////////////////////////////
// DIVISION SCHEMA
/////////////////////////////////////////

export const divisionSchema = z.object({
  id: z.coerce.number().int(),
  name: z.string(),
  batch_id: z.coerce.number().int(),
  course_id: z.string().nullable().transform((v: any) => v == "NULL" || v == "" ? null : parseInt(v)),
})

export type division = z.infer<typeof divisionSchema>

/////////////////////////////////////////
// ENROLLMENT SCHEMA
/////////////////////////////////////////

export const enrollmentSchema = z.object({
  id: z.coerce.number().int(),
  enrollment_number: z.string().nullable().transform((v: any) => v == "NULL" ? null : v),
  roll_number: z.string().nullable(),
  batch_id: z.coerce.number().int().transform((v: any) => v == "NULL" ? null : v),
  division_id: z.coerce.number().int().nullable().transform((v: any) => v == "NULL" ? null : v),
  user_id: z.coerce.number().int(),
})

export type enrollment = z.infer<typeof enrollmentSchema>

/////////////////////////////////////////
// RESULT SCHEMA
/////////////////////////////////////////

export const resultSchema = z.object({
  id: z.number().int(),
  grade: z.string(),
  marks: z.number().int(),
  status_result: z.string().nullable(),
  status_enrollment: z.string(),
  course_id: z.number().int(),
  enrollment_id: z.number().int(),
  division_id: z.number().int().nullable(),
})

export type result = z.infer<typeof resultSchema>

/////////////////////////////////////////
// EXAM SCHEMA
/////////////////////////////////////////

export const examSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  time: z.coerce.date(),
  duration: z.coerce.date(),
  maximum_marks: z.number().int(),
  course_id: z.number().int(),
  batch_id: z.number().int().nullable(),
  division_id: z.number().int().nullable(),
})

export type exam = z.infer<typeof examSchema>

/////////////////////////////////////////
// EXAM ENROLLMENT SCHEMA
/////////////////////////////////////////

export const exam_enrollmentSchema = z.object({
  id: z.number().int(),
  answer_paper_number: z.string(),
  marks_obtained: z.number().int(),
  row_num: z.number().int().nullable(),
  col_num: z.number().int().nullable(),
  exam_id: z.number().int(),
  enrollment_id: z.number().int(),
  room_id: z.number().int().nullable(),
})

export type exam_enrollment = z.infer<typeof exam_enrollmentSchema>

/////////////////////////////////////////
// FACULTY SCHEMA
/////////////////////////////////////////

export const facultySchema = z.object({
  designation: faculty_designationSchema,
  id: z.number().int(),
  date_join: z.coerce.date().nullable(),
  date_leave: z.coerce.date().nullable(),
  qualification: z.string().nullable(),
  experience_years: z.number().int().nullable(),
  specialization: z.string().nullable(),
  research_interest: z.string().nullable(),
  department_id: z.number().int(),
  user_id: z.number().int(),
})

export type faculty = z.infer<typeof facultySchema>

/////////////////////////////////////////
// CAMPUS SCHEMA
/////////////////////////////////////////

export const campusSchema = z.object({
  id: z.coerce.number().int(),
  name: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  pincode: z.coerce.number().int(),
  gate_count: z.coerce.number().int().nullable(),
  university_id: z.coerce.number().int(),
})

export type campus = z.infer<typeof campusSchema>

/////////////////////////////////////////
// BUILDING SCHEMA
/////////////////////////////////////////

export const buildingSchema = z.object({
  id: z.coerce.number().int(),
  name: z.string(),
  campus_id: z.coerce.number().int(),
})

export type building = z.infer<typeof buildingSchema>

/////////////////////////////////////////
// FLOOR SCHEMA
/////////////////////////////////////////

export const floorSchema = z.object({
  id: z.coerce.number().int(),
  number: z.coerce.number().int(),
  building_id: z.coerce.number().int(),
})

export type floor = z.infer<typeof floorSchema>

/////////////////////////////////////////
// ROOM SCHEMA
/////////////////////////////////////////

export const roomSchema = z.object({
  id: z.coerce.number().int(),
  number: z.coerce.number().int(),
  capacity: z.coerce.number().int().nullable(),
  row_count: z.coerce.number().int().nullable(),
  column_count: z.coerce.number().int().nullable(),
  type: room_typeSchema,
  shape: room_shapeSchema,
  floor_id: z.coerce.number().int(),
})

export type room = z.infer<typeof roomSchema>

/////////////////////////////////////////
// TEACHING SCHEMA
/////////////////////////////////////////

export const teachingSchema = z.object({
  id: z.coerce.number().int(),
  batch_id: z.string().transform((v: any) => v == "NULL" ? null : Number(v)),
  division_id: z.string().transform((v: any) => v == "NULL" ? null : Number(v)),
  course_id: z.coerce.number().int(),
  professor_id: z.coerce.number().int(),
})

export type teaching = z.infer<typeof teachingSchema>

/////////////////////////////////////////
// TIMETABLE SCHEMA
/////////////////////////////////////////

export const timetableSchema = z.object({
  weekday: timetable_weekdaySchema,
  id: z.number().int(),
  start_time: z.coerce.date(),
  end_time: z.coerce.date(),
  teaching_id: z.number().int(),
  room_id: z.number().int(),
})

export type timetable = z.infer<typeof timetableSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const sessionSchema = z.object({
  type: session_typeSchema,
  id: z.number().int(),
  open_for_attendance: z.boolean(),
  start_time: z.coerce.date(),
  end_time: z.coerce.date(),
  teaching_id: z.number().int(),
  room_id: z.number().int(),
})

export type session = z.infer<typeof sessionSchema>

/////////////////////////////////////////
// SESSION ATTENDANCE SCHEMA
/////////////////////////////////////////

export const session_attendanceSchema = z.object({
  status: attendance_statusSchema.nullable(),
  id: z.number().int(),
  position_row: z.number().int().nullable(),
  position_column: z.number().int().nullable(),
  session_id: z.number().int(),
  enrollment_id: z.number().int(),
})

export type session_attendance = z.infer<typeof session_attendanceSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const userSchema = z.object({
  id: z.coerce.number().int(),
  username: z.string().nullable(),
  password: z.string(),
  contact_no: z.string().nullable().transform((v: any) => (v == "NULL" || v == "") ? null : v),
  email: z.string().nullable().transform((v: any) => v == "NULL" ? null : v),
  name_prefix: z.string().nullable().transform((v: any) => v == "NULL" ? null : v),
  name_first: z.string().nullable().transform((v: any) => v == "NULL" ? null : v),
  name_middle: z.string().nullable().transform((v: any) => v == "NULL" ? null : v),
  name_last: z.string().nullable().transform((v: any) => v == "NULL" ? null : v),
  name_suffix: z.string().nullable().transform((v: any) => v == "NULL" ? null : v),
  gender: user_genderSchema.nullable(),
  date_of_birth: z.string().optional().transform((v: any) => (v == "NULL" || v == null) ? null : new Date(v)),
  // date_of_birth: z.string().transform((v: any) => v == "NULL" ? null : new Date(v)).nullable(),
  profile_picture_url: z.string().nullable(),
})

export type user = z.infer<typeof userSchema>










export const signInSchema = z.object({
  email: z.string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z.string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})
