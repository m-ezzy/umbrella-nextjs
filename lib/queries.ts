const users = {
  create: 'INSERT INTO students (name, email, phone) VALUES (?, ?, ?)',
  read: 'SELECT * FROM students',
  update: 'UPDATE students SET name = ?, email = ?, phone = ? WHERE id = ?',
  delete: 'DELETE FROM students WHERE id = ?',
}
