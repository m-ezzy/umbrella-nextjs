import fs, { createReadStream } from 'fs';
import * as csv from 'csv';
// import mysql from 'mysql';
// import { Connection } from 'mysql2';
import mysql, { QueryError, Connection, ConnectionOptions } from 'mysql2/promise';
import { FieldInfo, MysqlError } from 'mysql';

const connectionOptions: ConnectionOptions = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  waitForConnections: true,
  connectionLimit: 50,
};

let connection: any = mysql.createConnection(connectionOptions);

const path = `../Data/${process.env.UNIVERSITY_NAME}/csv/`;
let tableNames:any = [
  'user',
  'campus',
  'building',
  'department',
  'degree',
  'syllabus',
  'course',
  'syllabus_course',
  'batch',
  'division',
  'batch_user'
];

async function createConnection() {
  const conn: any = await mysql.createConnection(connectionOptions)
  .catch((error: any) => {
    console.log(error);
  });
  connection = conn;
}
async function deleteDatabase() {
  const conn = await mysql.createConnection(connectionOptions);
  await conn.query(`DROP DATABASE ${process.env.DATABASE_NAME}`)
  .then((result) => {
    console.log(`Database dropped successfully`.bgGreen);
  })
  .catch((error: any) => {
    console.error(error);
  });
  conn.end();
}
async function createDatabase() {
  // Read SQL queries from the .sql file
  const queriesString = fs.readFileSync("database.sql", 'utf-8');

  // Split queries by semicolon, ignore lines starting with --, ignore empty lines, ignore everything after -- in a line
  const queryList = queriesString
  .split(';')
  .map((query: string) => {
    return query
      .split('\r\n')
      .map((line: string) => line.split('--')[0].trim())
      .join('');
  })
  .filter((query: string) => query.trim() !== '')
  .map((query: string) => query.trim() + ';');

  // console.log(queryList);

  // Create a connection pool
  const pool = mysql.createPool(connectionOptions);

  // const conn = await pool.getConnection();

  // Execute each query in the queryList
  for (const query of queryList) {
    await pool.query(query)
    .then((result) => {
      console.log(`Query executed successfully`.bgGreen);
    })
    .catch((error: any) => {
      console.error(error);
    });
  };
  // Close the pool after all queries are executed
  pool.end();
}
async function emptyTables() {
  let connection: any = await mysql.createConnection(connectionOptions)
  .catch((error: any) => {
    console.error(error);
    throw error;
  });

  // Empty all tables
  let tableNamesReverse = tableNames;
  await tableNamesReverse.reverse();
  
  for (const tableName of tableNamesReverse) {
    await connection.execute(`DELETE FROM ${tableName}`)
    // let result:any = await connection.execute(`TRUNCATE TABLE ${tableName}`)
    .then((result: any) => {
      console.log(`Table ${tableName} emptied`.bgGreen);
    })
    .catch((error: any) => {
      console.error(error);
      throw error;
    });
  }

  connection.end();
}
async function seedDatabase() { //seeder
  // Fetch all tables
  // const tables = await queryDatabase(`SHOW TABLES in ${process.env.DATABASE_NAME};`);
  // console.log(tables);

  const connection: any = await mysql.createConnection(connectionOptions);

  // read csv files and insert data into MySQL tables
  for (const tableName of tableNames) {
    const filePath = path + tableName + '.csv';
    let headers:string[] = [];
    let rows:any[] = [];
    const buffer: any = fs.readFileSync(filePath);

    csv.parse(buffer, async (error: any, data: any) => {
      if (error) {
        console.error(error);
        return;
      }
      // console.log(data);
      headers = data[0];
      console.log(headers);
      data.shift();
      rows = data;

      const valuesString = rows.map((row: any) => {
        return row
          .map((value: any) => {
            return `'${value}'`;
          })
          .join(',');
      }).join('), (');
      // console.log(valuesString);

      const insertQuery = `INSERT INTO ${tableName} (${headers.join(', ')}) VALUES (${valuesString});`;
      const fields: FieldInfo = await connection.execute(insertQuery)
      .then((result: any) => {
        console.log(`Table ${tableName} seeded`.bgGreen);
      })
      .catch((error: QueryError) => {
        console.error(error);
        throw error;
      });
    });
  }
  // Close MySQL connection after processing the CSV file
  // connection.end();
}

async function queryDatabase(query: string, values?: any[]) {
  const connection: any = await mysql.createConnection(connectionOptions)
  .catch((error: any) => {
    console.error(error);
    throw error;
  });
  
  const [rows, fields]: any = await connection?.execute(query, values)
  .catch((error: any) => {
    console.error(error);
    throw error;
  });
  
  connection?.end();
	return JSON.parse(JSON.stringify(rows));
}

// import { Connection, MysqlError, createConnection } from 'mysql';

// export async function query2(query: string, values?:any[]) {
// 	return (
// 		new Promise(async (resolve, reject) => {
// 			const connection: Connection = createConnection({
// 				host: process.env.DATABASE_HOSTNAME,
// 				port: Number(process.env.DATABASE_PORT),
// 				user: process.env.DATABASE_USERNAME,
// 				password: process.env.DATABASE_PASSWORD,
// 				database: process.env.DATABASE_NAME,
// 			});
// 			connection.connect((error: MysqlError) => {
// 				if (error) {
//       		reject(error);
// 		    } else {
// 					connection.query(query, connection, (error: MysqlError, rows: any) => {
// 						if (error) {
// 							reject(error);
// 						} else {
// 							resolve(JSON.parse(JSON.stringify(rows)));
// 						}
// 					});
// 				}
// 			});
// 			connection.end()
// 		});
// 	)
// }


export { emptyTables, createDatabase, seedDatabase, queryDatabase };
