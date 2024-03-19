class Model {
  tableName: string;

  constructor(tableName: string) {
    this.tableName= tableName;
  }
  async findAll() {
    return await queryDatabase(`SELECT * FROM ${this.tableName}`)
  }
  async findById(id: number) {
    return await queryDatabase(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id])
  }
}
class Room extends Model {
  constructor() {
    super('rooms')
  }
}
class Department extends Model {
  constructor() {
    super('departments')
  }
}
