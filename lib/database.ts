import fs, { createReadStream } from 'fs';
import { Pool } from 'mysql2';
import * as csv from 'csv';
// import mysql from 'mysql';
// import { Connection } from 'mysql2';
import mysql, { QueryError, Connection, ConnectionOptions } from 'mysql2/promise';
// import { FieldInfo, MysqlError } from 'mysql';

const connectionOptions: ConnectionOptions = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  // waitForConnections: true,
};

const pool: any = mysql.createPool(connectionOptions)

let csvFilesPath = `../Data/${process.env.UNIVERSITY_NAME}/csv/`;
csvFilesPath = `C:/ProgramData/MySQL/MySQL Server 8.0/Uploads`;

let tableNames:any = [
  'user',
  'campus',
  'building',
  'floor',
  'room',
  'department',
  'faculty',
  'degree',
  'admin',
  'syllabus',
  'course',
  'syllabus_course',
  'batch',
  'division',
  'enrollment',
  'teaching',
  'timetable',
  'lecture',
  'lecture_attendance',
];

// async function createConnection() {
//   const conn: any = await mysql.createConnection(connectionOptions)
//   .catch((error: any) => {
//     console.log(error);
//   });
//   connection = conn;
// }
// async function deleteDatabase() {
//   const conn = await mysql.createConnection(connectionOptions);
//   await conn.query(`DROP DATABASE ${process.env.DATABASE_NAME}`)
//   .then((result) => {
//     console.log(`Database dropped successfully`.bgGreen);
//   })
//   .catch((error: any) => {
//     console.error(error);
//   });
//   conn.end();
// }
// async function createDatabase() {
//   // Read SQL queries from the .sql file
//   const queriesString = fs.readFileSync("database.sql", 'utf-8');

//   // Split queries by semicolon, ignore lines starting with --, ignore empty lines, ignore everything after -- in a line
//   const queryList = queriesString
//   .split(';')
//   .map((query: string) => {
//     return query
//       .split('\r\n')
//       .map((line: string) => line.split('--')[0].trim())
//       .join('');
//   })
//   .filter((query: string) => query.trim() !== '')
//   .map((query: string) => query.trim() + ';');

//   // console.log(queryList);

//   // Create a connection pool
//   const pool = mysql.createPool(connectionOptions);

//   // const conn = await pool.getConnection();

//   // Execute each query in the queryList
//   for (const query of queryList) {
//     await pool.query(query)
//     .then((result) => {
//       console.log(`Query executed successfully`.bgGreen);
//     })
//     .catch((error: any) => {
//       console.error(error);
//     });
//   };
//   // Close the pool after all queries are executed
//   pool.end();
// }

// async function truncateTable(tableName: string) {
//   // return new Promise((resolve, reject) => {
//     const result = await pool.query(`DELETE FROM ${tableName}`)
//     .catch((error) => {
//       console.log(`Error truncating table ${tableName}: ${error}`.bgRed);
//     });
//     console.log(`Table ${tableName} truncated`.bgGreen);
//     // resolve(true);
//     return result;
//   // });
// }
// async function truncateTables() {
//   for(const tableName of tableNames.reverse()) {
//     try {
//       await truncateTable(tableName);
//     } catch (error) {
//     }
//   }
//   console.log("All tables truncated successfully".bgGreen);
// }

// // Function to read data from CSV and insert into MySQL
// const seedTableFromCSV = async (tableName: string) => {
//   return new Promise((resolve, reject) => {
//     const sql = `
//       LOAD DATA INFILE ? 
//       INTO TABLE ${tableName} 
//       FIELDS TERMINATED BY ',' 
//       -- ENCLOSED BY '"' 
//       LINES TERMINATED BY '\\n' 
//       IGNORE 1 LINES`;

//     pool.query(sql, [tableName], (error, results, fields) => {
//       if (error) {
//         reject(`Error seeding table ${tableName}: ${error}`);
//       } else {
//         console.log(`Table ${tableName} seeded.`);
//         resolve(true);
//       }
//     });
//   });
// };
async function seedDatabase() { //seeder
  // SELECT @@global.local_infile
  // SET GLOBAL local_infile=1
  // SET GLOBAL secure_file_priv="D:/Programming/Projects/Umbrella/Data/GLS University/csv"

  for (const tableName of tableNames) {
    try {
      await seedTableFromCSV(tableName);
    } catch (error) {
      console.error(error);
    }
  }
  console.log('All tables seeded'.bgGreen);
}

async function queryDatabase(query: string, values?: any[]) {
  console.log("database queried".bgYellow);
  // const connection = await pool.getConnection();

  let err: any;
  const [rows, fields]: any = await pool.query(query, values)
  .catch((error: any) => {
    err = JSON.stringify(error);
    console.error(error);
  });

  // connection.release();
  if (err) return { error: err }
	return JSON.parse(JSON.stringify(rows));
}

export { seedDatabase, queryDatabase };
