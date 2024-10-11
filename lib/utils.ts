/* creating delay of specified seconds */
export async function delay(time_in_seconds: number): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("delay resolved")
    }, time_in_seconds * 1000)
  })
}

/* hashing a string*/
import crypto, { randomBytes } from "crypto"
import bcrypt from "bcrypt"

export const hashPassword = async (password: string): Promise<string> => {
  let hash1: any = crypto.createHash("sha256")
  let hash2: any = await bcrypt.hash(password, 10)
  return hash1
}

/* reading CSV file */
// import {promises as fs } from 'fs'
import { readFile } from 'fs/promises'
import { generate, generator, parse, parser, stringifier, stringify, transform, transformer } from 'csv'
import csvParser, { CsvParser } from 'csv-parser'

// Function to read and parse CSV files using the 'csv' package
export async function getJsonFromCsvFile(filePath: string): Promise<any[]> { //getDataFromFile //parseCSV
  try {
    // Read file content using fs.readFile
    const fileContent = await readFile(filePath, 'utf-8')

    // Parse CSV content to JSON
    return new Promise((resolve, reject) => {
      parse(fileContent, { columns: true }, (err, data) => {
        if (err) {
          reject(err)
        } else {
          console.log(data)
          resolve(data)
        }
      })
    })
  } catch (err) {
    throw new Error(`Error reading or parsing file: ${filePath}. ${err}`)
  }
}
