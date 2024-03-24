import { queryDatabase } from "@/lib/database";

async function select() {
  return await queryDatabase('SELECT * FROM degree');
}
async function selectById(id: number) {
  return await queryDatabase('SELECT * FROM degree WHERE degree_id=?', [id]);
}
async function insert() {
}
async function updateById(id: number, code: string, name: string) {
}
async function deleteById(id: number) {
  return await queryDatabase('DELETE FROM degree WHERE degree_id = ?', [id]);
}

export { select, selectById, insert, updateById, deleteById }
