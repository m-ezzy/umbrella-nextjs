"use client"
import { useState, useContext } from "react"
import { useStudentContext } from "@/contexts/StudentContext"

export default function RecordsFilter({ label, options, selected, setter, valueType }: any) {
  // let { semester, setSemester }: any = useStudentContext();

  // console.log(selected);
  function handleChange(e: any) {
    setter((prev: any) => {
      if(prev.includes(e.target.value)) {
        return prev.filter((item: any) => item != e.target.value);
      } else {
        let value: number | string = valueType == "number" ? parseInt(e.target.value) : e.target.value;
        return [...prev, value];
      }
    }); //e.target.selectedIndex
  }

  // const items: any = options.map((option: any) => <option key={option}>{option}</option>);
  const items: any = options.map((option: any) => {
    return <option key={option.id} value={option.id}>{option.name}</option> //id value
  });
  
  return (
    <div className="fle">
      <label>{label}</label>
      <select className="block rounded" value={selected.id} onChange={handleChange} multiple size={0}>
        <option value="">Select</option>
        {items}
      </select>
    </div>
  );
}
