import { queryDatabase } from "@/lib/database";

async function insert(date:string, start_time:string, end_time:string, teaching_id:number, room_id:number) {
  return await queryDatabase("INSERT INTO lecture (date,start_time,end_time,teaching_id,room_id) VALUES (?,?,?,?,?)", [date, start_time, end_time, teaching_id, room_id]);
}

export { insert }
