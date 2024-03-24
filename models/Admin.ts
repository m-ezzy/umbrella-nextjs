import { queryDatabase } from '@/lib/database';

async function select() {
  return await queryDatabase('SELECT * FROM admin');
}
async function selectByDepartmentId(department_id: number) {
  return await queryDatabase('SELECT degree.degree_id,degree.degree_name,degree.degree_name_acronym FROM admin LEFT JOIN degree ON admin.degree_id=degree.degree_id INNER JOIN department ON degree.department_id=department.department_id WHERE department.department_id=?', [department_id]);
}
async function selectByDegreeId(degree_id: number) {
  return await queryDatabase('SELECT degree.degree_id,degree.degree_name,degree.degree_name_acronym FROM admin LEFT JOIN degree ON admin.degree_id=degree.degree_id WHERE admin.degree_id=?', [degree_id]);
}
async function selectByUserId(user_id: number) {
  return await queryDatabase('SELECT degree.degree_id,degree.degree_name,degree.degree_name_acronym FROM admin LEFT JOIN degree ON admin.degree_id=degree.degree_id WHERE admin.user_id=?', [user_id]);
}
async function insert(degree_id: number, user_id: number) {
  return await queryDatabase('INSERT INTO admin (degree_id,user_id) VALUES (?,?)', [degree_id, user_id]);
}
async function update(degree_id: number, user_id: number) {
  return await queryDatabase('UPDATE admin SET degree_id=? WHERE user_id=?', [degree_id, user_id]);
}
async function deleteByAdminId(admin_id: number) {
  return await queryDatabase('DELETE FROM admin WHERE admin_id=?', [admin_id]);
}
async function deleteByDegreeId(degree_id: number) {
  return await queryDatabase('DELETE FROM admin WHERE degree_id=?', [degree_id]);
}
async function deleteByUserId(user_id: number) {
  return await queryDatabase('DELETE FROM admin WHERE user_id=?', [user_id]);
}
export { select, selectByDepartmentId, selectByDegreeId, selectByUserId, insert, update, deleteByAdminId, deleteByDegreeId, deleteByUserId };
