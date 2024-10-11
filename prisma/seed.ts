import { promises as fs } from 'fs' // File system promises for reading CSV files
import { parse } from 'csv' // CSV parsing library
import * as objectTypesFromPrisma from '@prisma/client' // Import Prisma models
import { PrismaClient, user, university, department } from '@prisma/client'
import * as schemas from '../lib/data-schemas-zod'
// import prisma from '../lib/prisma'
// import { parseCSV } from '../utils/files'
import zod, { z } from 'zod'

// Initialize Prisma Client
const prisma: any = new PrismaClient()

// Array of object names corresponding to CSV file names
let objects: string[] = [
  'user',
  'university',
  'campus',
  'building',
  'floor',
  'room',
  'department',
  'degree',
  // 'faculty',
  'admin',
  'syllabus',
  'course',
  // 'chapter',
  'batch',
  'division',
  // 'admission',
  'enrollment',
  'teaching',
  // 'timetable',
  // 'session',
  // 'session_attendance',
  // 'assignment',
  // 'assignment_submission',
  // 'exam',
  // 'exam_enrollment',
]

// Utility function to transform fields to correct types based on Prisma schema
// function transformField(fieldName: string, value: string, model: any): any {
//   const fieldType = typeof model;
//   console.log(fieldName, value, typeof model, fieldType)

//   if (value === 'NULL' || value === '') {
//     return null; // Handle nullable fields
//   }

//   switch (fieldType) {
//     case 'number':
//       return Number.isInteger(parseFloat(value)) ? parseInt(value, 10) : parseFloat(value); // Convert to number or float
//     case 'boolean':
//       return value.toLowerCase() === 'true' || value === '1'; // Convert to boolean
//     case 'object':
//       if (model[fieldName] instanceof Date) {
//         return new Date(value); // Convert to Date
//       }
//       break;
//     case 'string':
//     default:
//       return value; // Keep as string
//   }
// }

// Function to transform all data rows based on the Prisma model schema
// function transformData<T>(data: any[], model: T): T[] {
//   return data.map(row => {
//     const transformedRow: any = {};
//     for (const key in row) {
//       transformedRow[key] = transformField(key, row[key], model);
//     }
//     return transformedRow as T;
//   });
// }

// CSV parsing function
async function parseCSV(filePath: string): Promise<any[]> {
  try {
    // Read file content using fs.readFile
    const fileContent = await fs.readFile(filePath, 'utf-8')
    .catch((error) => {
      throw new Error(`Error reading CSV file: ${filePath}. ${error}`);
    })

    // Parse CSV content to JSON
    return new Promise((resolve, reject) => {
      parse(fileContent, {
        autoParse: true,
        autoParseDate: true,
        columns: true,
        comment: "//",
        skip_empty_lines: true,
      }, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      });
    });
  } catch (err) {
    throw new Error(`Error reading or parsing file: ${filePath}. ${err}`);
  }
}

// Main function to process the CSV files and insert data into the database
async function main() {
  // Delete all records from the table
  objects.reverse()
  for (const object of objects) {
    await prisma[object].deleteMany()
    .catch((error: any) => {
      console.error(`Error deleting records from table: ${object}`, error)
    })
  }
  objects.reverse()

  for (const object of objects) {
    const filePath = `..\\data\\Test University\\csv\\${object}.csv`

    // Read and parse CSV file
    let data = await parseCSV(filePath)
    .catch((error) => {
      console.error(`Error parsing CSV file: ${filePath}`, error)
      return []
    })

    // here you will get error because you wrote NULL everywhere is CSV file which is not it's type
    // you needed to enter csv file data directly through mysql workbench thatswhy you neede to include NULL
    // now you need to keep the NULL fields empty to parse it properly through zod schema

    let allSchemas: any = schemas
    // format data using zod schemas
    data = data.map((d) => {
      return allSchemas[object + "Schema"].parse(d)
      // let newD: any = {}
      // Object.entries(d).forEach(([key, value]) => {
      //   newD[key] = value == "NULL" || value == "" ? null : value
      // })
      // return allSchemas[object + "Schema"].parse(newD)
    })

    // Insert the parsed data into the database using Prisma
    const result = await prisma[object].createMany({
      data: data,
      skipDuplicates: true, // Optional: To skip inserting duplicate records
    })
    .catch((error: any) => {
      console.error(`Error inserting records into table: ${object}`, error.message)
      return { count: 0 }
    })

    console.log(`Inserted ${result.count} records into table: ${object}`)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error('Error main:', error)
    await prisma.$disconnect()
    process.exit(1)
  });
