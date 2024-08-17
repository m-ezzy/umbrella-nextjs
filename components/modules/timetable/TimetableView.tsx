"use client";

let mapper: any = { 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3, 'Thursday': 4, 'Friday': 5, 'Saturday': 6, 'Sunday': 7 }

export default function TimetableView({ timetableDataFiltered, handleClickCell }: { timetableDataFiltered: any, handleClickCell: any }) { //Table
  if(timetableDataFiltered.length === 0) return <></>;

  let timetableDataSorted: any = [];
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
    timetableDataSorted = timetableDataSorted.concat(some);
  });

  let timetableItems = timetableDataSorted.map((timetable: any) => {
    let row_start: number = parseInt(timetable.time_start.split(':')[0]) * 60 + parseInt(timetable.time_start.split(':')[1]);
    let row_end: number = parseInt(timetable.time_end.split(':')[0]) * 60 + parseInt(timetable.time_end.split(':')[1]);
    let row_span: number = row_end - row_start;
    let weekday_num: number = mapper[timetable.weekday];
    // row_start = Math.floor(row_start / 60) + 1;
    // row_end = Math.ceil(row_end / 60) + 1;
    let className = `${timetable.highlight ? 'bg-violet-300' : ''} border p-2 flex row-start-[${row_start}] row-span-[${row_span}] col-start-${weekday_num} col-span-1`;

    // why don't you write the styles in style tag here dynamically and not use tailwind classes which are the problem here

    return (
      <div key={timetable.timetable_id} className={className} onClick={() => handleClickCell(timetable.timetable_id)}> {/* row-end-${row_end} col-end-${weekday_num + 1} */}
        {timetable.time_start} {timetable.course_name_acronym} {`(${timetable.name_first[0]}${timetable.name_sur[0]})`} {timetable.weekday}
      </div>
    );
  });

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
  );
}
