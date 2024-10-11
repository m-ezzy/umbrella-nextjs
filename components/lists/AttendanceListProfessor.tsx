import { updateAttendanceStatus } from "@/actions/attendance"
import prisma from "@/lib/prisma"

export default async function AttendanceListProfessor({ session_id }: any) {
  const data: any = await prisma.enrollment.findMany({
    include: {
      user: true,
    },
    where: {
      division: {
        teaching: {
          some: {
            sessions: {
              some: {
                id: parseInt(session_id),
              },
            },
          },
        },
      },
    },
  })

  // console.log(data.map((item: any) => item.user.session_attendance[0]?.status))
  
  const items = data.map((item: any) => {
    return (
      <li key={item.session_attendance_id} className="border-b p-2 grid grid-cols-5 gap-2">
        <div>{item.enrollment_number.toString()}</div>
        <div>{item.roll_number}</div>
        <div>{item.user.name_first} {item.user.name_sur}</div>
        {item.user.session_attendance[0] ? 
          (item.user.session_attendance[0].status ? <span className="bg-green-200 rounded-md p-1">{item.user.session_attendance[0].status}</span> : <span className="bg-yellow-200 rounded-md p-1">pending verification</span>)
          :
          <span className="bg-red-200 rounded-md p-1">absent</span>
        }
        <form action={updateAttendanceStatus} className="flex gap-2">
          <input type="hidden" name="session_id" value={session_id} />
          <input type="hidden" name="user_id" value={item.user_id} />
          <button type="submit" name="status" value="present" style={{ backgroundColor: "#20df3c" }}>Present</button>
          <button type="submit" name="status" value="absent" style={{ backgroundColor: "#ff1900" }}>Absent</button>
          <button type="submit" name="status" value="excused" style={{ backgroundColor: "#f7ff0c" }}>Excused</button>
        </form>
        {/* <form>
          <input type="hidden" name="session_id" value={session_id} />
          <input type="hidden" name="user_id" value={item.user_id} />
          <input type="hidden" name="status" value="present" />
          <button type="submit">Present</button>
        </form> */}
        {/* <form>
          <input type="hidden" name="session_id" value={session_id} />
          <input type="hidden" name="user_id" value={item.user_id} />
          <input type="hidden" name="status" value="absent" />
          <button type="submit">Absent</button>
        </form> */}
        {/* <form>
          <input type="hidden" name="session_id" value={session_id} />
          <input type="hidden" name="user_id" value={item.user_id} />
          <input type="hidden" name="status" value="excused" />
          <button type="submit">Excused</button>
        </form> */}
      </li>
    )
  })
  return (
    <div className="w-full">
      <div className="bg-gray-200 rounded p-2 grid grid-cols-7 gap-2">
        <div>Enrollment Number</div>
        <div>Roll Number</div>
        <div>Student Name</div>
        <div>Attendance Status</div>
        <div>Present</div>
        <div>Absent</div>
        <div>Excused</div>
      </div>
      <ul className="flex-col gap-2">
        {items}
      </ul>
    </div>
  )
}
