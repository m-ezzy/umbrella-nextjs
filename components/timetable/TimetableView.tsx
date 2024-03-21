"use client";

export default function TimetableView({ timetableDataFiltered }: { timetableDataFiltered: any }) { //Table
  // console.log(timetableData);

  let timetableDataSorted: any = {};
  ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].forEach((weekday: string) => {
    timetableDataSorted[weekday] = timetableDataFiltered.filter((timetable: any) => timetable.weekday === weekday);
  });

  //sort timetableData by time_start
  // timetableDataSorted = Object.entries(timetableDataSorted).map((timetable: any) => {
  //   return timetable.sort((a: any, b: any) => {
  //     if (a.time_start < b.time_start) {
  //       return -1;
  //     }
  //     if (a.time_start > b.time_start) {
  //       return 1;
  //     }
  //     return 0;
  //   });
  // });

  let timetableItems = timetableDataFiltered.map((timetable: any) => {
    return (
      <div key={timetable.timetable_id} className="border p-2 flex flex-row justify-between">
        {timetable.time_start} {timetable.course_name_acronym} {`(${timetable.name_first[0]}${timetable.name_sur[0]})`} {timetable.weekday}
      </div>
    );
  });
  return (
    <div className="bg-gray-200 border rounded-md p-2 grid grid-rows-{1441} grid-cols-9">
      <div>Start Time</div>
      <div>End Time</div>
      <div>Monday</div>
      <div>Tuesday</div>
      <div>Wednesday</div>
      <div>Thursday</div>
      <div>Friday</div>
      <div>Saturday</div>
      <div>Sunday</div>
      {timetableItems}
    </div>
  );
}
