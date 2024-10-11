'use client'

import { createContext, useContext, useReducer, useState } from 'react'
import { entityRelationships } from '@/constants/entityRelationships'
import { FilterOption } from '@/components/ui/advanced/Filter'

export const AdminContext: any = createContext(null)

export function useAdminContext() {
  return useContext(AdminContext)
}

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'OPTION_SELECTED': {
      // let index = prev.findIndex((filter: any) => filter.name == name);
      // let options = prev[index].options.map((option: any) => {
      //   return {
      //     ...option,
      //     selected: (option.value == selectedValue) ? !option.selected : option.selected,
      //   }
      // });
      // let newFilter = {
      //   ...prev[index],
      //   options: options,
      // };

      // prev.splice(index, 1, newFilter);
      // return prev;
      // return prev.with(index, newFilter);
      // return [
      //   ...prev.slice(0, index),
      //   newFilter,
      //   ...prev.slice(index + 1),
      // ];

      const { name, value } = action.payload
      // return state.map((filter: any) => filter.name === name ? { ...filter, ...(filter.options.map((option: any) => option.value === value ? { ...option, selected: !option.selected } : option)) } : filter)

      return state.map((filter: any) => {
        if (filter.name != action.name) return filter

        let updatedOptions: any = filter.options.map((option: FilterOption) => ({
          ...option,
          selected: option.value == action.value,
          // selected: (option.value == selectedValue) ? !option.selected : option.selected,
        }))
        return {
          ...filter,
          options: updatedOptions,
        }
      })
    }
    // case 'SET_OPTIONS': {
    //   const { name, options } = action.payload
    //   return state.map((filter: any) => filter.name === name ? { ...filter, options } : filter)
    // }
  }
}

export function AdminContextProvider({ children, data }: any) {
  const [currentMenu, setCurrentMenu]: any[] = useState(null)

  const [university, setUniversity] = useState(null);
  const [department, setDepartment] = useState(null);
  const [degree, setDegree] = useState(null);
  const [campus, setCampus] = useState(null);
  const [building, setBuilding] = useState(null);
  const [floor, setFloor] = useState(null);
  const [room, setRoom] = useState(null);
  const [syllabus, setSyllabus] = useState(null);
  const [course, setCourse] = useState(null);
  const [semester, setSemester] = useState(null);
  const [batch, setBatch] = useState(null);
  const [division, setDivision] = useState(null);
  const [professor, setProfessor] = useState(null);
  const [student, setStudent] = useState(null);
  const [timetable, setTimetable] = useState(null);

  let allFiltersArray = [
    university, department, degree, campus, building, floor, room, syllabus, course, semester, batch, division, professor, student, timetable
  ];

  let allFiltersObject = {
    University: {
      state: university,
      setter: setUniversity,
    },
    Department: {
      state: department,
      setter: setDepartment,
    },
    Degree: {
      state: degree,
      setter: setDegree,
    },
    Campus: {
      state: campus,
      setter: setCampus,
    },
    Building: {
      state: building,
      setter: setBuilding,
    },
    Floor: {
      state: floor,
      setter: setFloor,
    },
    Room: {
      state: room,
      setter: setRoom,
    },
    Syllabus: {
      state: syllabus,
      setter: setSyllabus,
    },
    Course: {
      state: course,
      setter: setCourse,
    },
    Semester: {
      state: semester,
      setter: setSemester,
    },
    Batch: {
      state: batch,
      setter: setBatch,
    },
    Division: {
      state: division,
      setter: setDivision,
    },
    Professor: {
      state: professor,
      setter: setProfessor,
    },
    Student: {
      state: student,
      setter: setStudent,
    },
    Timetable: {
      state: timetable,
      setter: setTimetable,
    },
  }

  const [filters, setFilters] = useState(entityRelationships.map((filter) => ({ ...filter, label: filter.name, options: [] })))
  const [selectedFilters, setSelectedFilters] = useState({})
  const [filtersArray, setFiltersArray] = useState(allFiltersArray)
  const [filtersObject, setFiltersObject] = useState(allFiltersObject)
  const [changed, setChanged] = useState(false) //set to true when any option from any filter is selected
  const [lastcChangedFilter, setLastChangedFilter] = useState(null) //name of the filter whose option is selected

  const [filtersFromReducer, dispatch] = useReducer(reducer, entityRelationships.map((filter) => ({ ...filter, label: filter.name, options: [] })))

  // preserving state in localStorage
  // useEffect(() => {
  //   const savedFilters = localStorage.getItem('FiltersAdmin'); //window.
  //   if (savedFilters) {
  //     setFilters(JSON.parse(savedFilters))
  //   }
  // }, [])

  // useEffect(() => {
  //   localStorage.setItem('FiltersAdmin', JSON.stringify(selectedFilters))
  // }, [changed])

  return (
    <AdminContext.Provider value={
      {
        currentMenu, setCurrentMenu,

        university, setUniversity,
        department, setDepartment,
        degree, setDegree,
        campus, setCampus,
        building, setBuilding,
        floor, setFloor,
        room, setRoom,
        syllabus, setSyllabus,
        course, setCourse,
        semester, setSemester,
        batch, setBatch,
        division, setDivision,
        professor, setProfessor,
        student, setStudent,
        timetable, setTimetable,

        filters, setFilters,
        selectedFilters, setSelectedFilters,
        lastcChangedFilter, setLastChangedFilter,
        changed, setChanged,
        filtersArray, setFiltersArray,
        filtersObject, setFiltersObject,
        filtersFromReducer, dispatch
      }
    }>
      {children}
    </AdminContext.Provider>
  )
}
