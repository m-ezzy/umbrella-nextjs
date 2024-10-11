export const university = (data: any) => {
  return {
    id: Number(data.id),
    name: String(data.name),
    name_short: String(data.name_short),
  }
}
export const assignment = (data: any) => {
  return {
    id: Number(data.id),
    title: String(data.title),
    description: String(data.description),
    dueDate: new Date(data.dueDate),
    status: String(data.status),
  }
}
