export type RelationshipsDefiner = {
  name: string, //entity
  // label: string,
  id_column: string,
  value_column: string,
  valueType: any,
  hidden?: boolean,
  // options?: any[],
  dependent_on: string[], //depends_on
}
export const entityRelationships: RelationshipsDefiner[] = [
  {
    name: "university",
    id_column: "university_id",
    value_column: "university_name_short",
    valueType: Number,
    dependent_on: ["user"],
  },
  {
    name: "campus",
    id_column: "campus_id",
    value_column: "campus_name",
    valueType: String,
    dependent_on: ["university"],
  },
  {
    name: "building",
    id_column: "building_id",
    value_column: "building_name",
    valueType: String,
    dependent_on: ["campus"],
  },
  {
    name: "floor",
    id_column: "floor_id",
    value_column: "floor_name",
    valueType: Number,
    dependent_on: ["building"],
  },
  {
    name: "room",
    id_column: "room_id",
    value_column: "room_name",
    valueType: Number,
    dependent_on: ["floor"],
  },
  {
    name: "department",
    id_column: "department_id",
    value_column: "department_name_short",
    valueType: Number,
    dependent_on: ["university"],
  },
  {
    name: "degree",
    id_column: "degree_id",
    value_column: "degree_name_short",
    valueType: Number,
    dependent_on: ["department"],
  },
  {
    name: "syllabus",
    id_column: "syllabus_id",
    value_column: "year_effective",
    valueType: Number,
    dependent_on: ["degree"],
  },
  {
    name: "course",
    id_column: "course_id",
    value_column: "course_name_short",
    valueType: Number,
    dependent_on: ["syllabus"],
  },
  // {
  //   name: "course_type",
  //   id_column: "course_type",
  //   value_column: "course_type",
  //   valueType: String,
  //   dependent_on: ["course"],
  // },
  {
    name: "semester",
    id_column: "semester",
    value_column: "semester", //syllabus: duration_in_semesters //course: semester //batch: current_semester
    valueType: Number,
    dependent_on: ["syllabus, course, batch"],
  },
  {
    name: "batch",
    id_column: "batch",
    value_column: "start_year",
    valueType: Number,
    dependent_on: ["syllabus"],
  },
  {
    name: "division",
    id_column: "division_id",
    value_column: "division_name",
    valueType: Number,
    dependent_on: ["batch, course"],
  },
  {
    name: "professor", //faculty
    id_column: "professor_id",
    value_column: "professor_name",
    valueType: Number,
    dependent_on: ["department, division, course"],
  },
  // {
  //   name: "student",
  //   label: "Student",
  //   column: "student_id",
  //   dependent_on: ["batch", "division"],
  //   valueType: Number,
  // },
  {
    name: "teaching",
    id_column: "teaching_id",
    value_column: "",
    valueType: Number,
    hidden: true,
    dependent_on: ["batch", "division", "course", "professor"],
  },
  {
    name: "timetable",
    id_column: "timetable_id",
    value_column: "",
    valueType: Number,
    hidden: true,
    dependent_on: ["teaching"],
  },
  // {
  //   name: "year",
  //   label: "Year",
  //   column: "year",
  //   dependent_on: [],
  //   valueType: Number,
  // },
  // {
  //   name: "month",
  //   label: "Month",
  //   column: "month",
  //   dependent_on: [],
  //   valueType: String,
  // },
  // {
  //   name: "day",
  //   label: "Day",
  //   column: "day",
  //   dependent_on: [],
  //   valueType: Number,
  // },
  // {
  //   name: "hour",
  //   label: "Hour",
  //   column: "hour",
  //   dependent_on: [],
  //   valueType: Number,
  // },
  // {
  //   name: "minute",
  //   label: "Minute",
  //   column: "minute",
  //   dependent_on: [],
  //   valueType: Number,
  // },
  // {
  //   name: "weekday",
  //   label: "Weekday",
  //   column: "weekday",
  //   dependent_on: [],
  //   valueType: String,
  // },
  // {
  //   name: "date",
  //   label: "Date",
  //   column: "date",
  //   dependent_on: [],
  //   valueType: Date,
  // },
]