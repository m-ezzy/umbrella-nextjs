
export default async function TimetableForm({ data }: any) {
  let fields: any[] = [
    {
      type: "text",
      label: "Batch Start Year",
      name: "start_year",
      value: data.start_year,
      readOnly: true,
    },
    {
      type: "text",
      label: "Division Name",
      name: "division_name",
      value: data.division_name,
      readOnly: true,
    },
    {
      type: "text",
      label: "Course Name",
      name: "course_name",
      value: data.course_name,
      readOnly: true,
    },
    {
      type: "text",
      label: "Professor Name",
      name: "professor_name",
      value: data.professor_name,
      readOnly: true,
    },
    {
      type: "hidden",
      name: "batch_id",
      defaultValue: data.batch_id,
    },
    {
      type: "hidden",
      name: "division_id",
      defaultValue: data.division_id,
    },
    {
      type: "hidden",
      name: "course_id",
      defaultValue: data.course_id,
    },
    {
      type: "hidden",
      name: "professor_id",
      defaultValue: data.professor_id,
    },
    {
      type: "select",
      name: "weekday",
      defaultValue: data.weekday,
      options: [
        { value: "", text: "" },
        { value: "Monday", text: "Monday" },
        { value: "Tuesday", text: "Tuesday" },
        { value: "Wednesday", text: "Wednesday" },
        { value: "Thursday", text: "Thursday" },
        { value: "Friday", text: "Friday" },
        { value: "Saturday", text: "Saturday" },
        { value: "Sunday", text: "Sunday" },
      ]
    },
    {
      type: "time",
      name: "time_start",
      defaultValue: data.time_start,
    },
    {
      type: "time",
      name: "time_end",
      defaultValue: data.time_end,
    },
    {
      type: "hidden",
      name: "room_id",
      defaultValue: data.room_id,
    },
    {
      type: "hidden",
      name: "teaching_id",
      defaultValue: data.teaching_id,
    },
    {
      type: "hidden",
      name: "timetable_id",
      defaultValue: data.timetable_id,
    }
  ]
  return(
    <form action={dispatch} className="bg-white form sticky top-0 grid gap-2">

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
        {formState?.error && <div className="bg-red-200 rounded-md p-2">{formState.error}</div>}

      </form>
  )
}