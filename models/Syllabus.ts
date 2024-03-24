import { queryDatabase } from "@/lib/database";

async function select() {
  return await queryDatabase("SELECT * FROM syllabus");
}
async function selectByDegreeId(degree_id: number) {
  return await queryDatabase("SELECT * FROM syllabus WHERE degree_id = ?", [degree_id]);
}
async function insert(degree_id: number, year_effective: string) {
  return await queryDatabase("INSERT INTO syllabus (degree_id, year_effective) VALUES (?, ?)", [degree_id, year_effective]);
}
async function update(syllabus_id: number, year_effective: number) {
  return await queryDatabase("UPDATE syllabus SET year_effective = ? WHERE id = ?", [year_effective, syllabus_id]);
}
async function deleteById(syllabus_id: number) { //remove
  return await queryDatabase("DELETE FROM syllabus WHERE id = ?", [syllabus_id]);
}

export { select, selectByDegreeId, insert, update, deleteById };
