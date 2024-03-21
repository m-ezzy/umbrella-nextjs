"use client";
import { useEffect, useRef, useState } from "react";
import TimetableFilter1 from "./TimetableFilter1";
import TimetableFilter2 from "./TimetableFilter2";
import TimetableFilter3 from "./TimetableFilter3";
import TimetableView from "./TimetableView";
import { actionTimetable } from "@/actions/timetable";
import e from "cors";

export default function TimetableUltimate({ timetableData, teachingData, roomData }: any) {
  // console.log(timetableData, teachingData, roomData);

  // let timetableDataFiltered: any = timetableData;
  // let timetableDataFiltered: any = useRef(timetableData);
  const [timetableDataFiltered, setTimetableDataFiltered] = useState([]);

  const [message, setMessage] = useState("");

  const [createButtonState, setCreateButtonState] = useState(false);
  const [updateButtonState, setUpdateButtonState] = useState(false);
  const [deleteButtonState, setDeleteButtonState] = useState(false);

  const [batchs, setBatchs] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [courses, setCourses] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [weekdays, setWeekdays] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [batch_id, setBatchId] = useState(teachingData[0].batch_id);
  const [division_id, setDivisionId] = useState(teachingData[0].division_id);
  const [semester, setSemester] = useState(teachingData[0].semester);
  const [course_id, setCourseId] = useState("");
  const [professor_id, setProfessorId] = useState("");
  const [teaching_id, setTeachingId] = useState("");
  const [weekday, setWeekday] = useState("");
  const [time_start, setTimeStart] = useState("");
  const [time_end, setTimeEnd] = useState("");
  const [room_id, setRoomId] = useState("");
  const [timetable_id, setTimetableId] = useState("");

  let uniqueBatch = new Set(teachingData.map((item: any) => item.batch_id));
  let uniqueDivision = new Set(teachingData.map((item: any) => item.division_id));
  let uniqueSemester = new Set(teachingData.map((item: any) => item.semester));
  let uniqueCourse = new Set(teachingData.map((item: any) => item.course_id));
  let uniqueProfessor = new Set(teachingData.map((item: any) => item.professor_id));
  // let uniqueRoom = Array.from(new Set(teachingData.map((item: any) => item.room_id)));

  let batchItems:any = [];
  let divisionItems:any = [];
  let semesterItems:any = [];
  let courseItems:any = [];
  let professorItems:any = [];
  let roomItems:any = [];

  const handleChangeBatch = (e: any) => setBatchId((prev: any) => e.target.value);
  const handleChangeDivision = (e: any) => setDivisionId((prev: any) => e.target.value);
  const handleChangeSemester = (e: any) => setSemester((prev: any) => e.target.value);
  const handleChangeCourse = (e: any) => setCourseId((prev: any) => e.target.value);
  const handleChangeProfessor = (e: any) => setProfessorId((prev: any) => e.target.value);
  const handleChangeTimeStart = (e: any) => setTimeStart((prev: any) => e.target.value);
  const handleChangeTimeEnd = (e: any) => setTimeEnd((prev: any) => e.target.value);
  const handleChangeWeekday = (e: any) => setWeekday((prev: any) => e.target.value);
  const handleChangeRoom = (e: any) => setRoomId((prev: any) => e.target.value);

  useEffect(() => {
    if(batch_id) {
      let divisionData = teachingData.filter((item: any) => item.batch_id == batch_id);
      setDivisions(divisionData);
    }
  }, [batch_id]);

  useEffect(() => {
    // filter timetableData based on division_id and semester and show timetable now only
    if(division_id && semester) {
      let filtered: any = timetableData;

      filtered = filtered.filter((item: any) => item.division_id == division_id && item.semester == semester);

      // course_id or professor_id fiters timetableData
      if(course_id) {
        filtered = filtered.filter((item: any) => item.course_id == course_id);
      }
      if(professor_id) {
        filtered = filtered.filter((item: any) => item.professor_id == professor_id);
      }

      if(weekday) {
        filtered = filtered.filter((item: any) => item.weekday == weekday);
      }
      if(time_start) {
        filtered = filtered.filter((item: any) => item.time_start.slice(0,5) == time_start);
      }
      setTimetableDataFiltered(prev => filtered);

      // if(course_id) {
      //   let courseData = teachingData.filter((item: any) => {
      //     return item.course_id == course_id;
      //   });
      //   setCourses(courseData);
      // }
    }
  }, [timetableData, division_id, semester, course_id, professor_id, weekday, time_start]);

  useEffect(() => {
    // find teaching_id from teachingData based on division_id, course_id, professor_id selected if they exist

    let teachingDataFiltered:any = [];

    if(division_id && course_id && professor_id) {
      teachingDataFiltered = teachingData.filter((item: any) => {
        return item.division_id == division_id && item.course_id == course_id && item.professor_id == professor_id;
      });
    }
    
    if(teachingDataFiltered.length) {
      setTeachingId(teachingDataFiltered[0].teaching_id);
    } else {
      setTeachingId("");
    }
  }, [teachingData, division_id, course_id, professor_id]);

  useEffect(() => {
    if(teaching_id && weekday && time_start && time_end) {
      // check if timetable exists and show buttons accordingly

      let timetableExists: any = timetableDataFiltered.find((item: any) => {
        return item.teaching_id == teaching_id && item.weekday == weekday && item.time_start.slice(0,5) == time_start && item.time_end.slice(0,5) == time_end// && item.room_id == room_id
      });

      console.log(timetableExists);
      if(timetableExists) {
        setTimetableId(timetableExists.timetable_id);
        setMessage("Timetable can be updated or deleted");
        setCreateButtonState(false);
        setUpdateButtonState(true);
        setDeleteButtonState(true);
      } else {
        //check if division is available. they might be teaching another class at the same time
        //check if professor is available. they might be teaching another class at the same in ANOTHER DEGREE PROGRAM (division_id)
        //check if room is available
        
        setMessage("New timetable can be created");
        setCreateButtonState(true);
        setUpdateButtonState(false);
        setDeleteButtonState(false);
      }
    } else {
      // setCreateButtonState(false);
      // setUpdateButtonState(false);
      // setDeleteButtonState(false);
    }
  }, [teaching_id, weekday, time_start, time_end, room_id]);

  batchItems = teachingData.map((item: any) => {
    if(uniqueBatch.has(item.batch_id)) {
      uniqueBatch.delete(item.batch_id);
      return <option key={item.batch_id} value={item.batch_id}>{item.year_started}</option>;
    }
  });
  divisionItems = divisions.map((item: any) => {
    if(uniqueDivision.has(item.division_id)) {
      uniqueDivision.delete(item.division_id);
      return <option key={item.division_id} value={item.division_id}>{item.division_name}</option>;
    }
  });
  semesterItems = teachingData.map((item: any) => {
    if(uniqueSemester.has(item.semester)) {
      uniqueSemester.delete(item.semester);
      return <option key={item.semester} value={item.semester}>{item.semester}</option>;
    }
  });
  courseItems = teachingData.map((item: any) => {
    if(uniqueCourse.has(item.course_id)) {
      uniqueCourse.delete(item.course_id);
      return <option key={item.course_id} value={item.course_id}>{item.course_name}</option>;
    }
  });
  professorItems = teachingData.map((item: any) => {
    if(uniqueProfessor.has(item.professor_id)) {
      uniqueProfessor.delete(item.professor_id);
      return <option key={item.professor_id} value={item.professor_id}>{item.name_prefix} {item.name_first} {item.name_sur}</option>;
    }
  });
  roomItems = roomData.map((item: any) => {
    return <option key={item.room_id} value={item.room_id}>{item.building_name} {item.floor_number}0{item.room_number}</option>;
  });



  // batchItems = uniqueBatch.map((item: any) => {
  //   return <option key={item} value={item}>{item}</option>;
  // });
  // divisionItems = uniqueDivision.map((item: any) => {
  //   return <option key={item} value={item}>{item}</option>;
  // });
  // semesterItems = uniqueSemester.map((item: any) => {
  //   return <option key={item} value={item}>{item}</option>;
  // });
  // courseItems = uniqueCourse.map((item: any) => {
  //   return <option key={item} value={item}>{item}</option>;
  // });
  // professorItems = uniqueProfessor.map((item: any) => {
  //   return <option key={item} value={item}>{item}</option>;
  // });
  // roomItems = roomData.map((item: any) => {
  //   return <option key={item.room_id} value={item.room_id}>{item.building_name} {item.floor_number}0{item.room_number}</option>;
  // });

  return (
    <div className="flex flex-col gap-6">
      {/* <TimetableFilter1 teachingData={teachingData} batch_id={batch_id} division_id={division_id} semester={semester} setBatchId={setBatchId} setDivisionId={setDivisionId} setSemester={setSemester} /> */}

      <form action={actionTimetable} className="form grid gap-2">
        <div className="border rounded-md p-2 grid grid-cols-8 gap-2 items-center">
          <label htmlFor="batch_id">Batch</label>
          <select name="batch_id" value={batch_id} required onChange={handleChangeBatch}>
            {batchItems}
          </select>
          <label htmlFor="division_id">Division</label>
          <select name="division_id" value={division_id} required onChange={handleChangeDivision}>
            {divisionItems}
          </select>
          <label htmlFor="semester">Semester</label>
          <select name="semester" value={semester} required onChange={handleChangeSemester}>
            {semesterItems}
          </select>
        </div>

        <div className="border rounded-md p-2 grid grid-cols-8 gap-2 items-center">
          <label htmlFor="course_id">Course</label>
          <select name="course_id" value={course_id} required onChange={handleChangeCourse}>
            {courseItems}
          </select>
          <label htmlFor="professor_id">Professor</label>
          <select name="professor_id" value={professor_id} required onChange={handleChangeProfessor}>
            {professorItems}
          </select>
          
          <input type="hidden" name="teaching_id" value={teaching_id} />
        </div>

        <div className="border rounded-md p-2 grid grid-cols-8 gap-2 items-center">
          <label htmlFor="weekday">Weekday</label>
          <select name="weekday" value={weekday} required onChange={handleChangeWeekday}>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>

          <label htmlFor="time_start">Start Time</label>
          <input type="time" name="time_start" value={time_start} required onChange={handleChangeTimeStart} />

          <label htmlFor="time_end">End Time</label>
          <input type="time" name="time_end" value={time_end} required onChange={handleChangeTimeEnd} />

          <label htmlFor="room_id">Room</label>
          <select name="room_id" value={room_id} onChange={handleChangeRoom}>
            {roomItems}
          </select>

          <input type="hidden" name="timetable_id" value={timetable_id} />
        </div>

        {/* <div className="bg-gray-200 rounded-md p-2">{message}</div> */}

        <div className="grid grid-cols-3 gap-2">
          <button type="submit" name="action" value="create" className={`ms-aut`} disabled={!createButtonState}>
            <span className="material-symbols-outlined">add</span>
            New Timetable
          </button>
          <button type="submit" name="action" value="update" className={`ms-aut`} disabled={!updateButtonState}>
            <span className="material-symbols-outlined">edit</span>
            Update Timetable
          </button>
          <button type="submit" name="action" value="delete" className={`ms-aut`} disabled={!deleteButtonState}>
            <span className="material-symbols-outlined">delete</span>
            Delete Timetable
          </button>
        </div>
      </form>

      {/* <TimetableOperations teaching_id time_start time_end weekday room_id teachingData /> */}
      
      <TimetableView timetableDataFiltered={timetableDataFiltered} />

    </div>
  );
}
