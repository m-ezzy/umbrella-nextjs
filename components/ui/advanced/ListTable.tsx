'use client'

import { useEffect, useRef, useState, use } from 'react'

//DatasetTable DataTable DataList TableHeader TableRow ListHeader ListItem
export default function ListTable({
  data,
  id_column_name="id",
  updateAction,
  deleteAction,
  deleteMultipleAction,
}: {
  data: any,
  id_column_name?: string,
  updateAction?: any,
  deleteAction?: any,
  deleteMultipleAction?: any,
  // dataset: any,
  // headersMapper: any,
}) {
  const [filteredRows, setFilteredRows] = useState([])
  const [selectedRows, setSelectedRows] = useState<any[]>([])
  const [filters, setFilters] = useState([])
  const [view, setView] = useState<string>("list")
  const [orderBy, setOrderBy] = useState<string>("id")
  const [sortOrder, setSortOrder] = useState<string>("desc")
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setFilteredRows(data)
  }, [data])

  // returning early if there are no rows to display
  if(data == undefined || data == null || data?.length == 0 || filteredRows == undefined || filteredRows == null || filteredRows?.length == 0 || filteredRows[0] == undefined || filteredRows[0] == null) {
    return <div>No records found</div>
  }

  /* setting the sorting type of records */
  const handleClickSortOrder = () => {
    setSortOrder((prev: string) => prev == "asc" ? "desc" : "asc")
  }

  /* handling events */
  const handleChangeSearch = () => {
    const searchValue: string | undefined = searchRef.current?.value

    setFilteredRows((prev: any) => {
      if(searchValue) {
        // implement optimisation that if prev is already filtered, then filter on that based on searchValue's length
        // (searchValue.length > prev.length ? prev : rows)
        return data.filter((row: any) => {
          return properties.some((property: any) => {
            return row[property]?.toString().toLowerCase().includes(searchValue.toLowerCase());
          })
        })
      } else {
        return data
      }
    })
  }
  const handleCheck = (e: any) => {
    const id = Number(e.target.value)
    if(e.target.checked) {
      setSelectedRows((prev: any) => [...prev, id])
    } else {
      setSelectedRows((prev: any) => prev.filter((item: any) => item != id))
    }
  }

  /* getting attributes/columns/headers/properties from the first row */
  const properties: string[] = Object.keys(data[0] as object)
  // const attributes: string[] = Object.keys(headerMapper)

  /* table header */
  const headerItems = (
    <>
      <th className="border-r p-2">
        <input type="checkbox" className='w-6 h-6 text-black' checked={selectedRows.length == data.length} onChange={(e) => {
          // if(e.target.checked) {
          //   setSelectedRows(filteredRows.map((row: any) => row[id_column_name]))
          // } else {
          //   setSelectedRows([])
          // }

          setSelectedRows(e.target.checked ? filteredRows.map((row: any) => row[id_column_name]) : [])
        }} />
      </th>
      { properties.map((property: any) => <th key={property} className="border-r p-2">{property}</th>) }
    </>
  )

  /* filters for unique values in each column */
  // let filterItems: any = properties.map((column: any) => {
  //   let options: any = new Set();
  //   data.forEach((row: any) => options.add(row[column]));

  //   function handleSelect(e: any) {
  //     console.log(e);
  //     setFilters((prev: any) => {
  //       return {
  //         ...prev,
  //         [e.target.name]: e.target.value
  //       };
  //     });
  //     setFilteredRows((prev: any) => {
  //       return data.filter((row: any) => row[column] == e.target.value)
  //     });
  //   }
  //   return (
  //     <select key={column} name={column} className="block" value={filters[column]} onChange={handleSelect}> {/* multiple size={0} */}
  //       <option value="">Select</option>
  //       {[...options].map((option: any) => <option key={option} value={option}>{option}</option>)}
  //     </select>
  //   )
  // })
  // filterItems.unshift(<div key="jhgxfdghjklkjhcfx"></div>)

  /* data list */
  const rowItems = filteredRows.map((row: any, index: number) => {
    let id = row[id_column_name]
    return (
      <tr key={row.id} className="border-t grid items-center" style={{ gridTemplateColumns: `repeat(${properties.length + 1}, 1fr)` }}>
        <td className='ps-2'>
          <input type="checkbox" className='w-6 h-6 text-black' value={id} checked={selectedRows.includes(id)} onChange={handleCheck} />
        </td>
        {/* {cellItems} */}
        {properties.map((property: any) => {
          return <td key={property} className='p-1'>{row[property]}</td>
        })}
      </tr>
    )
  })

  return (
    <div className="border rounded">
      <div className="p-2 flex justify-between gap-2">
        {/* <h1>List</h1> */}

        {deleteMultipleAction && 
          <form action={deleteMultipleAction}>
            {selectedRows.length > 0 &&
              selectedRows.map((id: any) => <input key={id} type="hidden" name="ids[]" value={id} />)
            }
            <button type="submit" className="hover:bg-red-500">
              <span className="material-symbols-outlined">delete</span>
              Delete Selected
            </button>
          </form>
        }

        {/* <button className={view == "card" ? "bg-black text-white" : ""} onClick={() => setView("card")}> */}
          {/* <span className="material-symbols-outlined">square</span> */}
        {/* </button> */}
        {/* <button className={view == "list" ? "bg-black text-white" : ""} onClick={() => setView("list")}> */}
          {/* <span className="material-symbols-outlined">list</span> */}
        {/* </button> */}

        <button onClick={handleClickSortOrder}>
          <span className="material-symbols-outlined">sort</span>
          sort by {sortOrder}
        </button>

        <input type="search" placeholder="Search" className="ms-auto" ref={searchRef} onChange={handleChangeSearch} />
      </div>
      <table className="block *:block">
        <thead className="sticky top-0">
          <tr className='bg-gray-200 text-gray-600 text-left font-bold break-words grid' style={{ gridTemplateColumns: `repeat(${properties.length + 1}, 1fr)` }}>
            {headerItems}
          </tr>
          {/* <div className='border-b p-2 grid gap-4' style={{ gridTemplateColumns: `repeat(${properties.length + 1}, 1fr)` }}> */}
            {/* {filterItems} */}
          {/* </div> */}
        </thead>
        <tbody>
          {rowItems}
        </tbody>
      </table>
    </div>
  );
}

// for zebra stripe effect in table
// tr:nth-child(even) {
//   background-color: #f2f2f2;
// }
