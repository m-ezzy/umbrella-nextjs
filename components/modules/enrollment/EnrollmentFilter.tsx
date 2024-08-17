"use client"
import { useEffect, useState } from "react"
import FilterForm from "../../ui/FilterForm"
import SelectBatch from "@/components/selectors/batch"
import { createEnrollment, updateEnrollment, deleteEnrollment } from "@/actions/enrollment"

export default function EnrollmentFilter({ batchs, enrollments, degree_id }: any) {
  const [syllabus_id, setSyllabusId] = useState("")
  const [batch_id, setBatchId] = useState("")
  const [division_id, setDivisionId] = useState("")
  const [user_id, setUserId] = useState("")
  const [enrollment_number, setEnrollmentNumber] = useState("")
  const [enrollment_id, setEnrollmentId] = useState("")

  const handleChangeBatch = (e: any) => setBatchId(e.target.value)
  const handleChangeDivision = (e: any) => setDivisionId(e.target.value)

  const batchItems = enrollments.map((enrollment: any) => (
    <option key={enrollment.division.batch.batch_id} value={enrollment.division.batch.batch_id}>{enrollment.division.batch.year_started}</option>
  ))
  const divisionItems = enrollments.map((enrollment: any) => (
    <option key={enrollment.division.division_id} value={enrollment.division.division_id}>{enrollment.division.division_name}</option>
  ))

  return (
    <form className="bg-gray-200 form rounded-md p-2 pt-6 grid grid-cols-4 gap-6 items-center">
      {/* <div className="relative">
        <label htmlFor="batch_id" className="bg-violet-100 absolute left-2 -top-4 text-sm border border-violet-400 rounded-md p-1">Batch Year</label>
        <select name="batch_id" required className="w-full h-14" onChange={handleChangeBatch}>{batchItems}</select>
      </div> */}

      <SelectBatch batchs={batchs} selected={batch_id} setSelected={setBatchId} />

      <div className="relative">
        <label htmlFor="division_id" className="bg-violet-100 absolute left-2 -top-4 text-sm border border-violet-400 rounded-md p-1">Division</label>
        <select name="division_id" required className="w-full h-14" onChange={handleChangeDivision}>{divisionItems}</select>
      </div>

      <div className="relative">
        <label htmlFor="enrollment_number" className="bg-violet-100 absolute left-2 -top-4 text-sm border border-violet-400 rounded-md p-1">Enrollment Number</label>
        <input type="text" name="enrollment_number" required className="w-full h-14" />
      </div>

      <div className="relative">
        <label htmlFor="roll_number" className="bg-violet-100 absolute left-2 -top-4 text-sm border border-violet-400 rounded-md p-1">Roll Number</label>
        <input type="text" name="roll_number" required className="w-full h-14" />
      </div>

      <div className="relative">
        <label htmlFor="student_name" className="bg-violet-100 absolute left-2 -top-4 text-sm border border-violet-400 rounded-md p-1">Student Name</label>
        <input type="text" name="student_name" required className="w-full h-14" />
      </div>

      <div className="col-span-4 grid grid-cols-3 gap-2">
        <button type="submit" className="col-span-1">
          <span className="material-symbols-outlined">add</span>
          New Enrollment
        </button>
        <button type="submit" className="col-span-1">
          <span className="material-symbols-outlined">edit</span>
          Edit Enrollment
        </button>
        <button type="submit" className="col-span-1">
          <span className="material-symbols-outlined">delete</span>
          Delete Enrollment
        </button>
      </div>
    </form>
  )
}
