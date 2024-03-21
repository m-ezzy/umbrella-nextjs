"use client";
import { useEffect, useState } from "react";

export default function TimetableFilter2({ teachingData, timetableData, teachingData, roomData }: any) {
  console.log(timetableData, teachingData, roomData);

  let timetableDataFiltered: any = [];
  // const [timetableDataFiltered, setTimetableDataFiltered] = useState(timetableData);

  let [message, setMessage] = useState("");

  const [createButtonState, setCreateButtonState] = useState(false);
  const [updateButtonState, setUpdateButtonState] = useState(false);
  const [deleteButtonState, setDeleteButtonState] = useState(false);

  const [batchs, setBatchs] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [courses, setCourses] = useState([]);
  const [professors, setProfessors] = useState([]);

  const [batch_id, setBatchId] = useState(teachingData[0].batch_id);
  const [division_id, setDivisionId] = useState(teachingData[0].division_id);
  const [semester, setSemester] = useState(teachingData[0].semester);
  const [course_id, setCourseId] = useState(null);
  const [professor_id, setProfessorId] = useState(null);
  const [teaching_id, setTeachingId] = useState(null);
  const [weekday, setWeekday] = useState(null);
  const [time_start, setTimeStart] = useState(null);
  const [time_end, setTimeEnd] = useState(null);
  const [room_id, setRoomId] = useState(null);
  const [timetable_id, setTimetableId] = useState(null);

  let uniqueBatch = Array.from(new Set(teachingData.map((item) => item.batch_id)));
  let uniqueDivision = Array.from(new Set(teachingData.map((item) => item.division_id)));
  let uniqueSemester = Array.from(new Set(teachingData.map((item) => item.semester)));
  let uniqueCourse = Array.from(new Set(teachingData.map((item) => item.course_id)));
  let uniqueProfessor = Array.from(new Set(teachingData.map((item) => item.professor_id)));
  let uniqueRoom = Array.from(new Set(teachingData.map((item) => item.room_id)));

  let batchItems:any = [];
  let divisionItems:any = [];
  let semesterItems:any = [];
  let courseItems:any = [];
  let professorItems:any = [];
  let roomItems:any = [];

  const handleChangeBatch = (e) => setBatchId(prev => e.target.value);
  const handleChangeDivision = (e) => setDivisionId(prev => e.target.value);
  const handleChangeSemester = (e) => setSemester(prev => e.target.value);
  const handleChangeCourse = (e) => setCourseId(prev => e.target.value);
  const handleChangeProfessor = (e) => setProfessorId(prev => e.target.value);
  const handleChangeTimeStart = (e) => setTimeStart(prev => e.target.value);
  const handleChangeTimeEnd = (e) => setTimeEnd(prev => e.target.value);
  const handleChangeWeekday = (e) => setWeekday(prev => e.target.value);
  const handleChangeRoom = (e) => setRoomId(prev => e.target.value);

  if(division_id && semester) {
    // show timetable now only
    timetableDataFiltered = timetableData.filter((item) => {
      console.log(item.division_id, division_id, item.semester, semester);
      return item.division_id == division_id && item.semester == semester;
    });
  }

  useEffect(() => {
    // find teaching_id

    if(division_id && course_id && professor_id) {
      let teachingDataFiltered = teachingData.filter((item) => {
        return item.division_id == division_id && item.course_id == course_id && item.professor_id == professor_id;
      });
      
      if(teachingDataFiltered.length > 0) {
        setTeachingId(teachingDataFiltered[0].teaching_id);
      }
    }
  }, [division_id, course_id, professor_id]);

  useEffect(() => {
    if(teaching_id && weekday && time_start && time_end) {
      // check if timetable exists and show buttons accordingly

      let timetableExists: any = timetableDataFiltered.find((item) => {
        return item.teaching_id == teaching_id && item.weekday == weekday && item.time_start.slice(0,5) == time_start && item.time_end.slice(0,5) == time_end //&& item.room_id == room_id
      });

      if(timetableExists) {
        setTimetableId(timetableExists.timetable_id);
        setMessage("Timetable can be updated or deleted");
        setCreateButtonState(false);
        setUpdateButtonState(true);
        setDeleteButtonState(true);
      } else {
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

  batchItems = uniqueBatch.map((item) => {
    let selected: boolean = item == batch_id ? true : false;
    return <option key={item} value={item} selected={selected}>{item}</option>;
  });
  divisionItems = uniqueDivision.map((item) => {
    let selected: boolean = item == division_id ? true : false;
    return <option key={item} value={item} selected={selected}>{item}</option>;
  });
  semesterItems = uniqueSemester.map((item) => {
    let selected: boolean = item == semester ? true : false;
    return <option key={item} value={item} selected={selected}>{item}</option>;
  });
  courseItems = uniqueCourse.map((item) => {
    let selected: boolean = item == course_id ? true : false;
    return <option key={item} value={item} selected={selected}>{item}</option>;
  });
  professorItems = uniqueProfessor.map((item) => {
    let selected: boolean = item == professor_id ? true : false;
    return <option key={item} value={item} selected={selected}>{item}</option>;
  });
  roomItems = uniqueRoom.map((item) => {
    let selected: boolean = item == room_id ? true : false;
    return <option key={item} value={item} selected={selected}>{item}</option>;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* <TimetableFilter1 teachingData={teachingData} batch_id={batch_id} division_id={division_id} semester={semester} setBatchId={setBatchId} setDivisionId={setDivisionId} setSemester={setSemester} /> */}

      <form action={actionTimetable} className="form grid gap-2">
        <div className="border rounded-md p-2 grid grid-cols-8 gap-2 items-center">
          <label htmlFor="batch_id">Batch</label>
          <select name="batch_id" required onChange={handleChangeBatch}>
            {batchItems}
          </select>
          <label htmlFor="division_id">Division</label>
          <select name="division_id" required onChange={handleChangeDivision}>
            {divisionItems}
          </select>
          <label htmlFor="semester">Semester</label>
          <select name="semester" required onChange={handleChangeSemester}>
            <option value="">Select Semester</option>
            {semesterItems}
          </select>
        </div>

        <div className="border rounded-md p-2 grid grid-cols-8 gap-2 items-center">
          <label htmlFor="course_id">Course</label>
          <select name="course_id" required onChange={handleChangeCourse}>
            {courseItems}
          </select>
          <label htmlFor="professor_id">Professor</label>
          <select name="professor_id" required onChange={handleChangeProfessor}>
            {professorItems}
          </select>
          
          <input type="hidden" name="teaching_id" value={teaching_id} />
        </div>

        <div className="border rounded-md p-2 grid grid-cols-8 gap-2 items-center">
          <label htmlFor="weekday">Weekday</label>
          <select name="weekday" required onChange={handleChangeWeekday}>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>

          <label htmlFor="time_start">Start Time</label>
          <input type="time" name="time_start" required onChange={handleChangeTimeStart} />

          <label htmlFor="time_end">End Time</label>
          <input type="time" name="time_end" required onChange={handleChangeTimeEnd} />

          <label htmlFor="room_id">Room</label>
          <select name="room_id" onChange={handleChangeRoom}>
            {roomItems}
          </select>

          <input type="hidden" name="timetable_id" value={timetable_id} />
        </div>

        <div className="bg-gray-200 rounded-md p-2">{message}</div>

        <div className="grid grid-cols-3 gap-2">
          <button type="submit" name="action" value="create" className={`ms-aut ${createButtonState ? '' : 'border-gray-600 border-4'}`} disabled={!createButtonState}>
            <span className="material-symbols-outlined">add</span>
            New Timetable
          </button>
          <button type="submit" name="action" value="update" className={`ms-aut ${updateButtonState ? '' : 'border-gray-600 border-4'}`} disabled={!updateButtonState}>
            <span className="material-symbols-outlined">edit</span>
            Update Timetable
          </button>
          <button type="submit" name="action" value="delete" className={`ms-aut ${deleteButtonState ? '' : 'border-gray-600 border-4'}`} disabled={!deleteButtonState}>
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

