"use client";
import { useState } from "react";

export default function UniversityFilter({ records, setDepartment }: any) {
  const [university, setUniversity]: any = useState(null);

  const handleChange = (id: number) => {
    setUniversity(id);
  }

  const items: any = records.map((record: any) => {
    return(
      <option key={record.id} value={record.id} onSelect={() => handleChange(record.id)}>{record.name}</option>
    );
  });
  return (
    <div>
      <label>University:</label>
      <select>
        {items}
      </select>
    </div>
  )
}
