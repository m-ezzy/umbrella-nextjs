import fs from 'fs';
import * as csv from 'csv';
import { PrismaClient } from '@prisma/client';
import data from '@/data/data.json';

let csvFilesPath = `../Data/${data.university.name}/csv/`;

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

const prisma = new PrismaClient();

async function truncateTable(modelName: string) {
  await prisma[modelName].deleteMany()
  .then(() => {
    console.log(`Table ${modelName} truncated successfully`.bgGreen);
  })
  .catch((error: any) => {
    console.error(`Error truncating table ${modelName}:`.bgRed, error);
  });
}
async function truncateTables() {
  for (const tableName of tableNames.reverse()) {
    await truncateTable(tableName);
  }
}
async function insertDataFromFile(modelName) {
  // Read the CSV file
  const results: any = [];

  fs.createReadStream(`${csvFilesPath}${modelName}.csv`)
    .pipe(csv.parse())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        // Connect to the database using Prisma
        await prisma.$connect();

        // Truncate the table before insertion
        await truncateTable(modelName);

        let columns = results[0];
        let dataRows = results.splice(1, results.length - 1);
        let allData = [];
        for(const dr of dataRows) {
          let obj = {};
          for(let i = 0; i < columns.length; i++) {
            obj[columns[i]] = dr[i];
          }
          allData.push(obj);
        }

        await prisma[modelName].createMany({ data: allData });

        console.log(`Data inserted successfully into ${modelName}`.bgGreen);
      } catch (error) {
        console.error(`Error inserting CSV data into ${modelName}:`.bgRed, error);
      } finally {
        // Disconnect from the database
        await prisma.$disconnect();
      }
    });
}

async function insertDataFromFiles(modelNames: string[]) {
  for (const modelName of modelNames) {
    await insertDataFromFile(modelName);
  }
}

async function seedDatabase() {
  console.log('Seeding database...'.green);

  await insertDataFromFiles(tableNames);

  console.log('Database seeded successfully.'.green);
}

export { prisma, seedDatabase };
