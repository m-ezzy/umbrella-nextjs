export type Menu = {
  // key: string
  name: string //label text title
  href: string //link path
  icon: string
  // children?: MenuData[]
}

export let roleMenus: Menu[] = [
  {
    name: "Founder",
    href: "/founder",
    icon: "person",
  },
  // {
  //   name: "Manager",
  //   href: "/manager",
  //   icon: "person",
  // },
  // {
  //   name: "Head",
  //   href: "/head",
  //   icon: "person",
  // },
  {
    name: "Admin",
    href: "/admin",
    icon: "person",
  },
  {
    name: "Professor",
    href: "/professor",
    icon: "person",
  },
  {
    name: "Student",
    href: "/student",
    icon: "person",
  },
];
// Founder, President, Chancellor, Director, Dean, Staff, Faculty, Student, Alumni
// Applicant Student, Applicant Faculty
// Staff, Clerks, Librarian, Poen, Watchman
export let founderMenus: Menu[] = [
  {
    name: "University",
    href: "/university",
    icon: "school" ,
  },
  {
    name: "Campus",
    href: "/campus",
    icon: "place",
  },
  {
    name: "Building",
    href: "/building",
    icon: "home",
  },
  {
    name: "Room",
    href: "/room",
    icon: "room",
  },
  {
    name: "Department",
    href: "/department",
    icon: "home",
  },
  {
    name: "Degree",
    href: "/degree",
    icon: "home",
  },
  {
    name: "Admin",
    href: "/admin",
    icon: "people",
  },
  {
    name: "Faculty",
    href: "/faculty",
    icon: "people",
  },
  {
    name: "Alumni",
    href: "/alumni",
    icon: "home",
  },
  {
    name: "Staff",
    href: "/staff",
    icon: "home",
  },
  {
    name: "Grievances",
    href: "/grievances",
    icon: "home",
  },
  {
    name: "Activitity",
    href: "/activity",
    icon: "home",
  },
];
// manager
// infrastructure departments head activities
// head
// degrees faculties admins activities
export let adminMenus: Menu[] = [
  {
    name: "Syllabuses",
    href: "/syllabuses",
    icon: "library_books",
  },
  {
    name: "Courses",
    href: "/courses",
    icon: "subject",
  },
  {
    name: "Batches",
    href: "/batches",
    icon: "group",
  },
  {
    name: "Divisions",
    href: "/divisions",
    icon: "group",
  },
  {
    name: "Enrollments",
    href: "/enrollments",
    icon: "join",
  },
  {
    name: "Teaching",
    href: "/teaching",
    icon: "square",
  },
  {
    name: "Timetable",
    href: "/timetable",
    icon: "table",
  },
  {
    name: "Exams",
    href: "/exams",
    icon: "workspace_premium",
  },
  {
    name: "Grades",
    href: "/grades",
    icon: "assessment",
  },
  {
    name: "Result",
    href: "/result",
    icon: "assessment",
  },
  {
    name: "Activities",
    href: "/activities",
    icon: "circle",
  },
  {
    name: "Placements",
    href: "/placements",
    icon: "lan",
  },
];
// analysis chapters, sessions, attendance
export let professorMenus: Menu[] = [
  {
    name: "Courses",
    href: "/courses",
    icon: "subject",
  },
  {
    name: "Teaching",
    href: "/teaching",
    icon: "square",
  },
  {
    name: "Timetable",
    href: "/timetable",
    icon: "table",
  },
  {
    name: "Schedule",
    href: "/schedule",
    icon: "schedule",
  },
  {
    name: "Sessions",
    href: "/sessions",
    icon: "lan",
  },
  {
    name: "Attendance",
    href: "/attendance",
    icon: "lan",
  },
  {
    name: "Assignments",
    href: "/assignments",
    icon: "assignment",
  },
  {
    name: "Exams", //as a supervisor //give grades to their course's exams
    href: "/exams",
    icon: "assessment",
  },
  {
    name: "Grades",
    href: "/grades",
    icon: "assessment",
  },
  {
    name: "Resourses",
    href: "/resourses",
    icon: "library_books",
  },
];
// analysis salary grievances activities
export const studentMenus: Menu[] = [
  {
    name: "Enrollments",
    href: "/enrollments",
    icon: "join",
  },
  {
    name: "Courses",
    href: "/courses",
    icon: "subject",
  },
  {
    name: "Teaching",
    href: "/teaching",
    icon: "square",
  },
  {
    name: "Timetable",
    href: "/timetable",
    icon: "table",
  },
  {
    name: "Schedule",
    href: "/schedule",
    icon: "schedule",
  },
  {
    name: "Sessions", //attendance
    href: "/sessions",
    icon: "lan",
  },
  // {
  //   name: "Attendance",
  //   href: "/attendance",
  //   icon: "lan",
  // },
  {
    name: "Assignments",
    href: "/assignments",
    icon: "assignment",
  },
  {
    name: "Resourses",
    href: "/resourses",
    icon: "library_books",
  },
  {
    name: "Exams", //results
    href: "/exams",
    icon: "assessment",
  },
  {
    name: "Grades",
    href: "/grades",
    icon: "assessment",
  },
  {
    name: "Activities",
    href: "/activities",
    icon: "circle",
  },
  {
    name: "Placements",
    href: "/placements",
    icon: "lan",
  },
];
// analysis semester, fees, transactions, grievances, alumni
