import { queryDatabase } from '@/lib/database';

async function select(user_id: number) {
  const res = await queryDatabase('SELECT degree.degree_id,degree.degree_name FROM admin INNER JOIN degree ON admin.degree_id=degree.degree_id WHERE admin.user_id=?', [user_id]);
  return res;
}

export { select }
