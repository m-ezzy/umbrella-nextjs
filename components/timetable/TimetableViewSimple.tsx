"use client";

let mapper: any = { 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3, 'Thursday': 4, 'Friday': 5, 'Saturday': 6, 'Sunday': 7 }

export default function TimetableViewSimple({ timetableDataFiltered, handleClickCell }: { timetableDataFiltered: any, handleClickCell: any }) { //Table
  if(timetableDataFiltered.length === 0) return <div className="w-full flex"></div>;

  let timesItems = [];
  for(let i = 8; i < 24; i++) {
    let time = i.toString().padStart(2, '0') + ':00';
    timesItems.push(
      <div key={time} className="bg-gray-200 border p-2">
        {time}
      </div>
    );
  }

  let timetableDataFilteredSorted: any = [];
  ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].forEach((weekday: string) => {
    let some = timetableDataFiltered.filter((timetable: any) => timetable.weekday == weekday);
    some.sort((a: any, b: any) => {
      if (a.time_start < b.time_start) {
        return -1;
      }
      if (a.time_start > b.time_start) {
        return 1;
      }
      return 0;
    });
    timetableDataFilteredSorted = timetableDataFilteredSorted.concat(some);
  });

  let items: any = {
    "Monday": [],
    "Tuesday": [],
    "Wednesday": [],
    "Thursday": [],
    "Friday": [],
    "Saturday": [],
    "Sunday": []
  };
  timetableDataFilteredSorted.forEach((timetable: any) => {
    items[timetable.weekday].push(
      <div key={timetable.timetable_id} className={`${timetable.highlight ? 'bg-violet-300' : ''} border p-2`} onClick={() => handleClickCell(timetable.timetable_id)}>
        {timetable.time_start.getUTCHours()}:{timetable.time_start.getUTCMinutes()} {timetable.teaching.course.course_name_acronym} {`(${timetable.teaching.professor.name_first[0]}${timetable.teaching.professor.name_sur[0]})`}
      </div>
    );
  });

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
  );
}
