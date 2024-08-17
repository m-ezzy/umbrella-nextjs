import { createSession } from "@/actions/session";
import { prisma } from "@/lib/db";

export default async function SessionCreateSimple({ teaching_id }: any) {
  const rooms: any = await prisma.room.findMany({
    include: {
      floor: {
        include: {
          building: true,
        },
      },
    },
  })

  const roomItems = rooms.map((room: any) => {
    return <option key={room.room_id} value={room.room_id}>{room.floor.floor_number}0{room.room_number}</option>
  })

  return (
    <form action={createSession} className="bg-gray-200 form rounded-md p-2 flex gap-2 items-center">
      <input type="number" name="teaching_id" value={teaching_id} hidden />

      <label htmlFor="type">Type</label>
      <select name="type" required>
        <option value="lecture">Lecture</option>
        <option value="lab">Lab</option>
        <option value="tutorial">Tutorial</option>
        <option value="practical">Practical</option>
        <option value="seminar">Seminar</option>
        <option value="workshop">Workshop</option>
        <option value="conference">Conference</option>
      </select>

      <label htmlFor="date">Date</label>
      <input type="date" name="date" required />

      <label htmlFor="time_start">Start Time</label>
      <input type="time" name="time_start" required />

      <label htmlFor="time_end">End Time</label>
      <input type="time" name="time_end" required />

      <label htmlFor="room_id">Room</label>
      <select name="room_id" required>
        {roomItems}
      </select>

      <button type="submit" className="ms-aut">
        <span className="material-symbols-outlined">add</span>
        New Session
      </button>
    </form>
  );
}
