import { queryDatabase } from "@/lib/database";

async function selectRoom() {
  return await queryDatabase("SELECT room.room_id AS room_id,room.room_number,room.floor_id,floor.floor_number,floor.building_id,building.building_name FROM room INNER JOIN floor ON room.floor_id=floor.floor_id INNER JOIN building ON floor.building_id=building.building_id");
}

export { selectRoom }
