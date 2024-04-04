import { timetable } from '@prisma/client';

let mapper: any = { 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3, 'Thursday': 4, 'Friday': 5, 'Saturday': 6, 'Sunday': 7 }

let weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function TimetableViewAll({ timetableData, showDegree, showProfessor }: { timetableData: timetable[], showDegree: boolean, showProfessor: boolean }) {
  if(timetableData.length === 0) return <div className="w-full flex"></div>;

  let timesItems = [];
  for(let i = 8; i < 24; i++) {
    let time = i.toString().padStart(2, '0') + ':00';
    timesItems.push(
      <div key={time} className="bg-gray-200 border p-2">
        {time}
      </div>
    );
  }

  let timetableDataSorted: any = [];
  weekdays.forEach((weekday: string) => {
    let some = timetableData.filter((timetable: any) => timetable.weekday == weekday);
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

  let items: any = {
    "Monday": [],
    "Tuesday": [],
    "Wednesday": [],
    "Thursday": [],
    "Friday": [],
    "Saturday": [],
    "Sunday": []
  };

  // new Date().toLocaleTimeString({ hourCycle: 'h24', region: 'en-US' });

  timetableDataSorted.forEach((timetable: any) => {
    items[timetable.weekday].push(
      <div key={timetable.timetable_id} className={`${timetable.highlight ? 'bg-violet-300' : ''} border p-2`}>
        {timetable.time_start.toLocaleTimeString({ hourCycle: 'h24', region: 'en-US' })} { }
        {timetable.teaching.course.course_name_acronym} { }
        {showDegree && ` (${timetable.teaching.division.batch.syllabus.degree.degree_name_acronym})`} 
        {showProfessor && ` (${timetable.teaching.professor.name_first[0]}${timetable.teaching.professor.name_sur[0]})`} 
      </div>
    );
  });

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
  );
}
