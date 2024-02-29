import { queryDatabase } from "./database"

async function departments() {
  const res = await fetch('https://api.example.com/departments')
  const data = await res.json()
  return data
}
async function rooms() {
  const data = await queryDatabase('SELECT * FROM rooms')
  const res = await fetch('https://api.example.com/rooms')
  const data = await res.json()
  return data
}
async function fetchDataOf(tableName: string) {
  switch (tableName) {
    case 'departments':
      return await departments()
    case 'rooms':
      return await rooms()
    default:
      return []
  }
}
