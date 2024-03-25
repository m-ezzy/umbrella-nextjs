import { useState } from "react";
import Link from "next/link";
import fetchRooms from "../lib/fetchRooms";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const data = await fetchRooms();
      setRooms(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <tr>
      <td>{classroom.name}</td>
      <td>{classroom.abbreviation}</td>
      <td>
        <Link href="/classroom/[id]" as={`/classroom/${classroom.id}`}>
          view
        </Link>
      </td>
    </tr>
  );
};

export default ClassRoomRow;
