"use client";
import { useEffect, useRef, useState } from "react";
import TimetableFilter1 from "./TimetableFilter1";
import TimetableFilter2 from "./TimetableFilter2";
import TimetableFilter3 from "./TimetableFilter3";
import TimetableView from "./TimetableViewSimple";
import { actionTimetable } from "@/actions/timetable";

// type TeachingData = {
//   teaching_id: number;
//   syllabus_id: number | null;
//   batch_id: number | null;
//   division_id: number | null;
//   semester: number | null;
//   course_id: number | null;
//   professor_id: number | null;
// };
// type TimetableData = {
//   timetable_id: number;
//   teaching_id: number;
//   weekday: string;
//   time_start: string;
//   time_end: string;
//   room_id: number;
// };
type TimetableUltimateProps = {
  timetableData: any,
  teachingData: any,
  // timetableData: TimetableData[],
  // teachingData: TeachingData[],
  roomData: any[],
};

export default function TimetableUltimate({ timetableData, teachingData, roomData }: TimetableUltimateProps) {
  // console.log(timetableData, teachingData, roomData);

  let initialTeaching: any = teachingData[0] ? teachingData[0] : { teaching_id: "", syllabus_id: "", batch_id: "", division_id: "", semester: "", course_id: "", professor_id: "" };

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

  const [batch_id, setBatchId] = useState(initialTeaching.batch_id);
  const [division_id, setDivisionId] = useState(initialTeaching.division_id);
  const [semester, setSemester] = useState(initialTeaching.course_semester);
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
  let uniqueSemester = new Set(teachingData.map((item: any) => item.course_semester));
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

      filtered = filtered.filter((item: any) => item.division_id == division_id && item.course_semester == semester);

      // highlight the appropriate cells with color | course_id or professor_id fiters timetableData
      filtered = filtered.map((tt: any) => {
        tt["highlight"] = false;
        if(course_id && professor_id) tt["highlight"] = tt.course_id == course_id && tt.professor_id == professor_id;
        else if(course_id) tt["highlight"] = tt.course_id == course_id;
        else if(professor_id) tt["highlight"] = tt.professor_id == professor_id;

        // fix the bug here
        if(weekday && tt.highlight) tt["highlight"] = tt.weekday == weekday;
        // if(time_start && time_end) tt["highlight"] = tt.time_start >= time_start && tt.time_end <= time_end;
        return tt;
      });
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

      if(teachingDataFiltered.length) {
        setMessage("Teaching ID found for the selected division, course, and professor");
        setTeachingId(teachingDataFiltered[0].teaching_id);
      } else {
        setMessage("No teaching ID found for the selected division, course, and professor");
        setTeachingId("");
      }
    } else {
      setMessage("");
    }
  }, [teachingData, division_id, course_id, professor_id]);

  useEffect(() => {
    if(teaching_id && weekday && time_start && time_end) {
      // check if timetable exists and show buttons accordingly

      let timetableExists: any = timetableDataFiltered.find((item: any) => {
        return item.teaching_id == teaching_id && item.weekday == weekday && item.time_start.slice(0,5) == time_start && item.time_end.slice(0,5) == time_end// && item.room_id == room_id
      });

      if(timetableExists) {
        if(timetable_id != timetableExists.timetable_id) setTimetableId(timetableExists.timetable_id);
        setMessage("Timetable can be updated or deleted");
        setCreateButtonState(false);
        setUpdateButtonState(true);
        setDeleteButtonState(true);
      } else {
        //check if professor is available. they might be teaching another class at the same in ANOTHER DEGREE PROGRAM (division_id)
        //check if room is available
        
        //check if division is available. they might be attending another class at the same time
        let divisionIsBusy: any = timetableData.find((item: any) => {
          let timeClash =  time_start == item.time_start.slice(0,5) && time_end == item.time_end.slice(0,5);
          return item.division_id == division_id && item.course_semester == semester && item.weekday == weekday && item.time_start.slice(0,5) <= time_start && item.time_end.slice(0,5) >= time_end;
        });

        if(divisionIsBusy) {
          setMessage("Division is not available at the selected time - " + JSON.stringify(divisionIsBusy));
          setCreateButtonState(false);
          setUpdateButtonState(false);
          setDeleteButtonState(false);
        } else {
          setMessage("New timetable can be created");
          setCreateButtonState(true);
          setUpdateButtonState(false);
          setDeleteButtonState(false);
        }
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
    if(uniqueSemester.has(item.course_semester)) {
      uniqueSemester.delete(item.course_semester);
      return <option key={item.course_semester} value={item.course_semester}>{item.course_semester}</option>;
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

  function handleClickCell(timetable_id: number) {
    let timetable: any = timetableDataFiltered.find((item: any) => item.timetable_id == timetable_id);
    setCourseId(timetable.course_id);
    setProfessorId(timetable.professor_id);
    // setTeachingId(timetable.teaching_id);
    setWeekday(timetable.weekday);
    setTimeStart(timetable.time_start);
    setTimeEnd(timetable.time_end);
    setRoomId(timetable.room_id);
    // setTimetableId(timetable.timetable_id);
  }

  return (
    <div className="px-2 flex flex-col gap-6">
      {/* <TimetableFilter1 teachingData={teachingData} batch_id={batch_id} division_id={division_id} semester={semester} setBatchId={setBatchId} setDivisionId={setDivisionId} setSemester={setSemester} /> */}
      {/* <TimetableFilter2 teachingData={teachingData} course_id={course_id} professor_id={professor_id} setCourseId={setCourseId} setProfessorId={setProfessorId} /> */}
      {/* <TimetableFilter3 teachingData={teachingData} weekday={weekday} time_start={time_start} time_end={time_end} room_id={room_id} setWeekday={setWeekday} setTimeStart={setTimeStart} setTimeEnd={setTimeEnd} setRoomId={setRoomId} /> */}

      <form action={actionTimetable} className="bg-white form sticky top-0 grid gap-2">

        {/* <div className="grid grid-cols-3 gap-2">
          <h4>Select Mode</h4>
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
        </div> */}

        <div className="bg-gray-100 border rounded-md mt-2 p-2 grid grid-cols-8 gap-2 items-center">
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

        <div className="bg-gray-100 border rounded-md p-2 grid grid-cols-8 gap-2 items-center">
          <label htmlFor="course_id">Course</label>
          <select name="course_id" value={course_id} required onChange={handleChangeCourse}>
            <option value=""></option>
            {courseItems}
          </select>
          <label htmlFor="professor_id">Professor</label>
          <select name="professor_id" value={professor_id} required onChange={handleChangeProfessor}>
            <option value=""></option>
            {professorItems}
          </select>
          
          <input type="hidden" name="teaching_id" value={teaching_id} />
        </div>

        <div className="bg-gray-100 border rounded-md p-2 grid grid-cols-8 gap-2 items-center">
          <label htmlFor="weekday">Weekday</label>
          <select name="weekday" value={weekday} required onChange={handleChangeWeekday}> {/* multiple={true} */}
            <option value=""></option>
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

        <div className="mt-4 grid grid-cols-3 gap-2">
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

        {message && <div className="bg-gray-200 rounded-md p-2">{message}</div>}

      </form>

      {/* <TimetableOperations teaching_id time_start time_end weekday room_id teachingData /> */}
      
      <TimetableView timetableDataFiltered={timetableDataFiltered} handleClickCell={handleClickCell} />

    </div>
  );
}
