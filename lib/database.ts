import fs, { createReadStream } from 'fs';
import * as csv from 'csv';
// import mysql from 'mysql';
// import { Connection } from 'mysql2';
import mysql, { Connection, ConnectionOptions } from 'mysql2/promise';

const connectionOptions: ConnectionOptions = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  waitForConnections: true,
  connectionLimit: 10,
};

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

async function seedDatabase() { //seeder
  // Fetch all tables
  // const tables = await queryDatabase(`SHOW TABLES in ${process.env.DATABASE_NAME};`);
  // console.log(tables);

  // Empty all tables
  // for (const table of tables) {
  //   // await queryDatabase(`DELETE FROM ${Object.values(table)[0]}`);
  //   await queryDatabase(`TRUNCATE TABLE ${Object.values(table)[0]}`)
  //   .then((result) => {
  //     console.log(`Table ${table[Object.keys(table)[0]]} emptied`.bgGreen);
  //   })
  //   .catch((error: any) => {
  //     console.error(error);
  //   });
  // }

  const path = "../../../Data/GLS University/csv/";

  // read csv files
  // const files = fs.readdirSync(path
  // );

  // for (const file of files) {
  //   const table = file.split('.')[0];
  //   const filePath = path + file;
  //   const stream = createReadStream(
  //     filePath
  //   );

  //   const parser = csv.parse({
  //     columns: true,
  //     delimiter: ','
  //   });

  //   const data: any[] = [];
  //   parser.on('readable', () => {
  //     let record;
  //     while (record = parser.read()) {
  //       data.push(record);
  //     }
  //   });
  // }
}

async function queryDatabase(query: string, values?: any[]) {
  const connection: any = await mysql.createConnection(connectionOptions)
  .catch((error: any) => {
    console.log(error);
  });
  const [rows, fields]: any = await connection?.execute(query, values)
  .catch((error: any) => {
    console.log(error);
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

export { createDatabase, seedDatabase, queryDatabase };
