"use client";
import { useState } from "react";
import ActionForm from "./ActionForm";

export default function ListWithFilters({ dataset, id_column, deleteMultipleAction }: { dataset: any[], id_column: string, deleteMultipleAction?: any }) {
  const [rows, setRows] = useState(dataset);
  const [filters, setFilters] = useState([]);
  
  if(dataset.length == 0) {
    return <div>No records found</div>;
  }

  let attributes: string[] = Object.keys(dataset[0] as object);
  attributes.splice(attributes.findIndex((item: any) => item == id_column), 1);

  let headerItems: any = attributes.map((item: any) => {
    return <div key={item} className="p-2">{item}</div>;
  });
  headerItems.unshift(<div key="jhgxfdghjklkjhcfx"></div>);

  let filterItems: any = attributes.map((column: any) => {
    let options: any = new Set();
    dataset.forEach((row: any) => options.add(row[column]));

    function handleSelect(e: any) {
      console.log(e);
      setFilters((prev: any) => {
        return {
          ...prev,
          [e.target.name]: e.target.value
        };
      });
      setRows((prev: any) => {
        return dataset.filter((row: any) => row[column] == e.target.value)
      });
    }
    return (
      <select key={column} name={column} className="block" value={filters[column]} onChange={handleSelect}> {/* multiple size={0} */}
        <option value="">Select</option>
        {[...options].map((option: any) => <option key={option} value={option}>{option}</option>)}
      </select>
    );
  });
  filterItems.unshift(<div key="jhgxfdghjklkjhcfx"></div>);

  const rowItems = rows.map((row: any, index: number) => {
    const cellItems: any = Object.values(row as object).map((item: any) => {
      if(item == row[id_column]) return null;
      return <div key={item}>{item}</div>
    });
    return (
      <div key={row.id} className="border-b p-2 grid" style={{ gridTemplateColumns: `repeat(${attributes.length + 1}, 1fr)` }}>
        <input type="checkbox" defaultValue={row[id_column]} />
        {cellItems}
      </div>
    );
  });

  return (
    <div>
      <div>
        <form action={deleteMultipleAction}>
          <button type="submit">Delete Selected</button>
        </form>
      </div>
      <div className='bg-gray-200 font-bold border-b grid' style={{ gridTemplateColumns: `repeat(${attributes.length + 1}, 1fr)` }}>
        {headerItems}
      </div>
      <div className='border-b p-2 grid gap-4' style={{ gridTemplateColumns: `repeat(${attributes.length + 1}, 1fr)` }}>
        {filterItems}
      </div>
      {rowItems}
    </div>
  );
}
