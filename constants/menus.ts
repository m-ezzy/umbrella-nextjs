export type Menu = {
  // key: string
  name: string //label text title
  href: string //link path
  icon: string
  // children?: MenuData[]
}

export const settingMenus: Menu[] = [
  {
    name: "Account",
    href: "/account",
    icon: "person",
  },
  {
    name: "Profile",
    href: "/profile",
    icon: "person",
  },
  {
    name: "Privacy",
    href: "/privacy",
    icon: "privacy",
  },
  {
    name: "Security",
    href: "/security",
    icon: "security",
  },
  {
    name: "Notifications",
    href: "/notifications",
    icon: "notifications",
  },
]
export const roleMenus: Menu[] = [
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
]
// Founder, President, Chancellor, Director, Dean, Staff, Faculty, Student, Alumni
// Applicant Student, Applicant Faculty
// Staff, Clerks, Librarian, Poen, Watchman
export const objectMenus: Menu[] = [
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
    name: "Staff",
    href: "/staff",
    icon: "home",
  },
  {
    name: "Syllabus",
    href: "/syllabus",
    icon: "library_books",
  },
  {
    name: "Course",
    href: "/course",
    icon: "subject",
  },
  {
    name: "Batch",
    href: "/batch",
    icon: "group",
  },
  {
    name: "Division",
    href: "/division",
    icon: "group",
  },
  {
    name: "Enrollment",
    href: "/enrollment",
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
    name: "Schedule", //Calendar
    href: "/schedule",
    icon: "schedule",
  },
  {
    name: "Session",
    href: "/session",
    icon: "lan",
  },
  {
    name: "Attendance",
    href: "/attendance",
    icon: "lan",
  },
  {
    name: "Assignment",
    href: "/assignment",
    icon: "assignment",
  },
  {
    name: "Resource",
    href: "/resource",
    icon: "library_books",
  },
  {
    name: "Exam", //as a supervisor //give grades to their course's exams
    href: "/exam",
    icon: "workspace_premium",
  },
  {
    name: "Grade",
    href: "/grade",
    icon: "assessment",
  },
  {
    name: "Result",
    href: "/result",
    icon: "assessment",
  },
  {
    name: "Activity",
    href: "/activity",
    icon: "circle",
  },
  {
    name: "Placement",
    href: "/placement",
    icon: "lan",
  },
  {
    name: "Alumni",
    href: "/alumni",
    icon: "home",
  },
  {
    name: "Grievance",
    href: "/grievance",
    icon: "home",
  },
]

export const founderMenus: string[] = ["University", "Campus", "Building", "Room", "Department", "Degree", "Admin", "Faculty", "Alumni", "Staff", "Grievance", "Activity"]
// manager
// infrastructure departments head activities
// head
// degrees faculties admins activities
export const adminMenus: string[] = [
  "Degree", "Syllabus", "Course", "Batch", "Division", "Enrollment", "Teaching", "Timetable", "Exam", "Grade", "Result", "Activity", "Placement"
]
// analysis chapters, sessions, attendance
export const professorMenus: string[] = ["Degree", "Course", "Teaching", "Timetable", "Schedule", "Session", "Attendance", "Assignment", "Exam", "Grade", "Resource"]
// analysis salary grievances activities
export const studentMenus: string[] = ["Enrollment", "Course", "Teaching", "Timetable", "Schedule", "Session", "Assignment", "Resource", "Exam", "Grade", "Activity", "Placement"]
// analysis semester, fees, transactions, grievances, alumni



export const getRoleMenus: any = (role: string) => {
  let menus: string[] = []

  switch(role) {
    case "founder":
      menus = founderMenus
      break
    case "admin":
      menus = adminMenus
      break
    case "professor":
      menus = professorMenus
      break
    case "student":
      menus = studentMenus
      break
  }
  return menus.map((menu: string) => objectMenus.find((objectMenu: Menu) => objectMenu.name == menu))
}
