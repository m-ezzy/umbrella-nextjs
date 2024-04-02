import { useFormState, useFormStatus } from "react-dom";
import Image from "next/image";
import { updateAttendancePosition } from "@/actions/attendance";

function SubmitButton() {
  const [formState, formAction] = useFormState(updateAttendancePosition, null);
  // const [formStatus, setFormStatus] = useFormStatus();
  return (
    <button type="submit"></button>
  );
}

export default function GridCell(rowNum: number, colNum: number, user_id: number, roll_number: string, selected: boolean) {
  return (
    <form action={updateAttendancePosition} className="w-16 h-16 border flex justify-center items-center">
      <input type="hidden" name="position_row" value={rowNum} hidden />
      <input type="hidden" name="position_column" value={colNum} hidden />
      <button type="submit" className={`${selected ? 'bg-green-400' : ''}`}>
        <Image src={`/data/user/profile_pictures/${user_id}.jpg`} alt="profile picture" width={24} height={24} />
        <div>{roll_number}</div>
        {/* {rowNum}, {colNum} */}
      </button>
    </form>
  );
}
