import { queryDatabase } from "@/lib/database";

async function selectRoom() {
  return await queryDatabase("SELECT room.id AS room_id,room.number AS room_number,room.floor_id,floor.number AS floor_number,floor.building_id,building.name AS building_name FROM room INNER JOIN floor ON room.floor_id=floor.id INNER JOIN building ON floor.building_id=building.id");
}

export { selectRoom }
