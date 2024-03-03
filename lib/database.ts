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

  const connection: any = await mysql.createConnection(connectionOptions);

  const path = `../Data/${process.env.UNIVERSITY_NAME}/csv/`;
  const tableNames:any = [];
  // const tableNames = ['user', 'campus', 'building', 'department', 'degree', 'syllabus', 'batch', 'division', 'batch_user'];

  // Empty all tables
  let tableNamesReverse = tableNames;
  tableNamesReverse.reverse();
  for (const tableName of tableNamesReverse) {
    // await queryDatabase(`DELETE FROM ${Object.values(table)[0]}`);
    await queryDatabase(`TRUNCATE TABLE ${tableName}`)
    .then((result) => {
      console.log(`Table ${tableName} emptied`.bgGreen);
    })
    .catch((error: any) => {
      console.error(error);
    });
  }

  // read csv files and insert data into MySQL tables
  for (const tableName of tableNames) {
    const filePath = path + tableName + '.csv';
    let headers:string[] = [];
    let rows:any[] = [];

    // let stream = createReadStream(filePath);
    // let parser = csv.parse({delimiter: ','});
    // stream.pipe(parser);

    // parser.on('readable', function () {
    //   let record;
    //   while (record = parser.read()) {
    //     console.log(record);
    //   }
    // });

    csv.parse(fs.readFileSync(filePath), (error: any, data: any) => {
      if (error) {
        console.error(error);
        return;
      }

      console.log(data);
      headers = data[0];
      data.shift();
      rows = data;

      const valuesString = rows.map((row: any) => {
        return `(${row.map((value: any) => {
          return `'${value}'`;
        }).join(', ')})`;
      }).join(', ');
  
      console.log(valuesString);

      rows.forEach(async (row: any) => {
        const query = `INSERT INTO ${tableName} (${headers.join(', ')}) VALUES (${row.map((value: any) => '?')} );`;

        await connection.query(query, row, (error: QueryError, results: any, fields: FieldInfo) => {
          if (error) throw error;
        });
        console.log('CSV file successfully processed.');
      });
    });

    console.log(headers);
  }
  
  // Close MySQL connection after processing the CSV file
  // connection.end();
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
