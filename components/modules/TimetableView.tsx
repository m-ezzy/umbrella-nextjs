'use client'

import { timetable } from '@prisma/client'

export let weekdaysNumberMapper: any = { 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3, 'Thursday': 4, 'Friday': 5, 'Saturday': 6, 'Sunday': 7 }
export let weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default function TimetableView({
  scope,
  data,
  timetableDataFiltered,
  handleClickCell,
  showDegree,
  showProfessor,
}: {
  data: any,
  scope?: any,
  timetableDataFiltered?: any,
  handleClickCell?: any,
  showDegree?: boolean,
  showProfessor?: boolean,
}) {
  if(data.length === 0) return <></>

  /* just for displaying timeline */
  let timesItems = []
  for(let i = 8; i < 24; i++) {
    let time = i.toString().padStart(2, '0') + ':00';
    timesItems.push(
      <div key={time} className="bg-gray-200 border p-2">
        {time}
      </div>
    )
  }

  /* first way */
  let dataSorted: any = []
  weekdays.forEach((weekday: string) => {
    let some = data.filter((timetable: any) => timetable.weekday == weekday)
    some.sort( (a: any, b: any) => (a.time_start < b.time_start ? -1 : (a.time_start > b.time_start ? 1 : 0)) )
    dataSorted = dataSorted.concat(some)
  })

  // function handleClickCell(timetable_id: number) {
  //   let timetable: any = timetableDataFiltered.find((item: any) => item.timetable_id == timetable_id)
  //   setCourseId(timetable.teaching.course_id)
  //   setProfessorId(timetable.teaching.professor_id)
  //   setTeachingId(timetable.teaching_id)
  //   setWeekday(timetable.weekday)
  //   setTimeStart(timetable.time_start)
  //   setTimeEnd(timetable.time_end)
  //   setRoomId(timetable.room_id)
  //   setTimetableId(timetable.timetable_id)
  // }

  let timetableItems = dataSorted.map((timetable: any) => {
    let row_start: number = parseInt(timetable.time_start.split(':')[0]) * 60 + parseInt(timetable.time_start.split(':')[1])
    let row_end: number = parseInt(timetable.time_end.split(':')[0]) * 60 + parseInt(timetable.time_end.split(':')[1])
    let row_span: number = row_end - row_start
    let weekday_num: number = weekdaysNumberMapper[timetable.weekday]
    // row_start = Math.floor(row_start / 60) + 1
    // row_end = Math.ceil(row_end / 60) + 1
    let className = `${timetable.highlight ? 'bg-violet-300' : ''} border p-2 flex row-start-[${row_start}] row-span-[${row_span}] col-start-${weekday_num} col-span-1`

    // why don't you write the styles in style tag here dynamically and not use tailwind classes which are the problem here

    return (
      <div key={timetable.timetable_id} className={className} onClick={() => handleClickCell(timetable.timetable_id)}> {/* row-end-${row_end} col-end-${weekday_num + 1} */}
        {timetable.time_start} {timetable.course_name_short} {`(${timetable.name_first[0]}${timetable.name_sur[0]})`} {timetable.weekday}
      </div>
    )
  })

  /* different way */
  let items: any = {
    "Monday": [],
    "Tuesday": [],
    "Wednesday": [],
    "Thursday": [],
    "Friday": [],
    "Saturday": [],
    "Sunday": []
  }

  // new Date().toLocaleTimeString({ hourCycle: 'h24', region: 'en-US' })

  dataSorted.forEach((timetable: any) => {
    items[timetable.weekday].push(
      <div key={timetable.timetable_id} className={`${timetable.highlight ? 'bg-violet-300' : ''} border p-2`}>
        {/* {timetable.time_start.toLocaleTimeString({ hourCycle: 'h24', region: 'en-US' })} */}
        {timetable.time_start.getUTCHours()}:{timetable.time_start.getUTCMinutes()} { }
        {timetable.teaching.course.course_name_short} { }
        {/* {showDegree && ` (${timetable.teaching.division.batch.syllabus.degree.degree_name_short})`}  */}
        {showCourse && ` (${timetable.teaching.course.course_name_short})`}
        {showProfessor && ` (${timetable.teaching.professor.name_first[0]}${timetable.teaching.professor.name_sur[0]})`} 
      </div>
    )
  })
  return (
    <div className="bg-gray-100 border rounded-md p-2 grid grid-flow-col grid-cols-7 grid-rows-[repeat(1440,1fr)]"> {/* relative */}
      <div>Start Time</div>
      <div>End Time</div>
      <div>Monday</div>
      <div>Tuesday</div>
      <div>Wednesday</div>
      <div>Thursday</div>
      <div>Friday</div>
      <div>Saturday</div>
      <div>Sunday</div>
      {/* {startTimesItems} */}
      {/* {endTimesItems} */}
      {timetableItems}
    </div>
  )
  return (
    <div className="border rounded-md grid grid-flow-col grid-cols-8">
      <div className="">
        <div className="bg-gray-200 border p-2">Time</div>
        {timesItems}
      </div>
      {
        weekdays.map((weekday: string) => (
          <div key={weekday}>
            <div className="bg-gray-200 border p-2">{weekday}</div>
            {items[weekday]}
          </div>
        ))
      }
    </div>
  )
  return (
    <div className="bg-gray-100 border rounded-md grid grid-flow-col grid-cols-8">
      <div className="">
        <div className="bg-gray-200 border p-2">Time</div>
        {timesItems}
      </div>
      <div>
        <div className="bg-gray-200 border p-2">Monday</div>
        {items.Monday}
      </div>
      <div>
        <div className="bg-gray-200 border p-2">Tuesday</div>
        {items.Tuesday}
      </div>
      <div>
        <div className="bg-gray-200 border p-2">Wednesday</div>
        {items.Wednesday}
      </div>
      <div>
        <div className="bg-gray-200 border p-2">Thursday</div>
        {items.Thursday}
      </div>
      <div>
        <div className="bg-gray-200 border p-2">Friday</div>
        {items.Friday}
      </div>
      <div>
        <div className="bg-gray-200 border p-2">Saturday</div>
        {items.Saturday}
      </div>
      <div>
        <div className="bg-gray-200 border p-2">Sunday</div>
        {items.Sunday}
      </div>
    </div>
  )
}
