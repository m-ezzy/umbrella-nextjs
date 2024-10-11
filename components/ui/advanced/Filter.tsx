'use client'

import { useEffect, useRef, useState } from 'react'

export type FilterOption = {
  name: string
  value: string | number
  selected?: boolean
  show?: boolean // show/hide option based on search and other filters selection
}
export type FilterProps = {
  label?: string
  name: string
  options: FilterOption[]
  valueType?: string
  multiple?: boolean
  setFilters: any
  setLastChangedFilter: any
  dispatch: any

  // combination of single, multiple | value, object
  // you can store option's values only or option's name and value as object
  // selectedValue?: any; //string | number;
  // selectedValues?: any[]; //string[]
  // selectedOption?: any;
  // selectedOptions?: any[];
  // setSelectedValue?: any;
  // setSelectedValues?: any;
  // setSelectedOption?: any;
  // setSelectedOptions?: any;
}
export default function Filter({
  name, label, options=[], valueType="string", multiple=false, setFilters, setLastChangedFilter, dispatch
}: FilterProps
) {
  // let [viewValues, setViewValues] = useState(options.filter((option: any) => option.selected).map((option: any) => option.value))
  const [viewOptions, setViewOptions] = useState(options)
  // let [searchShow, setSearchShow] = useState(false)
  // let [overflowOpen, setOverflowOpen] = useState(false)
  // let selectRef: any = useRef()
  // let overflowRef: any = useRef()

  let filteredOptions = options

  // const handleClickOverflow = (e: any) => {
  //   overflowRef.current.classList.toggle("hidden")
  // }
  // const handleFocusSelect = (e: any) => {
  //   selectRef.current.size = viewOptions.length
  //   setSearchShow((prev: any) => true)
  // }
  // const handleBlurSelect = (e: any) => {
  //   selectRef.current.size = 1;
  //   setSearchShow((prev: any) => false);
  // }
  // const handleFocusSearch = (e: any) => {
  // }
  // const handleBlurSearch = (e: any) => {
  // }
  // const handleChangeSearch = (e: any) => {
  //   let query: string = e.target.value;
  //   let filteredOptions: any[] = options.filter((item: any) => item.name.toString().toLowerCase().includes(query.toLowerCase()));
  //   setViewOptions((prev: any) => filteredOptions);
  // }
  const handleChangeSelect = (e: any) => {
    // console.log(e.target.value, e.target.selectedOptions)
    // setSearchShow((prev: any) => false)
    let selectedValue: number | string = (valueType == "number" ? parseInt(e.target.value) : e.target.value)
    // let selectedValue = (valueType == "number" ? parseInt(e.target.value) : e.target.value)
    // let newSelectedValues: string[] = Array.from(e.target.selectedOptions, (option: any) => option.value);

    // if(selectedValues.includes(e.target.value)) {
    //   return prev.filter((item: any) => item != e.target.value);
    // } else {
    //   let value: number | string = valueType == "number" ? parseInt(e.target.value) : e.target.value;
    //   return [...prev, value];
    // }

    // setSelectedValues((prev: any) => ({
    //   ...prev,
    //   [name]: newSelectedValues
    // }));








    dispatch({
      type: "OPTION_SELECTED",
      payload: {
        name: name,
        value: selectedValue,
      }
    })
    
    setLastChangedFilter(name)

  //   setFilters((prev: any) => {
  //     let newFilters: any = prev.map((filter: any) => {
  //       if(filter.name == name) {
  //         // following code is applied if selected filed is added to option object instead of selectedValues array in filter object
  //         let updatedOptions: any = filter.options.map((option: FilterOption) => {
  //           return {
  //             ...option,
  //             selected: option.value == selectedValue,
  //             // selected: (option.value == selectedValue) ? !option.selected : option.selected,
  //           }
  //           // return {
  //           //   ...option,
  //           //   selected: newSelectedValues.includes(option.value),
  //           // }
  //         });
  //         return {
  //           ...filter,
  //           options: updatedOptions,
  //           // selectedValues: newSelectedValues,
  //         }
  //       } else {
  //         return filter;
  //       }
  //     });
  //     return newFilters;
  //   });
  }

  const handleClickOption = (clickedOptionValue: any) => {}

  return (
    <div className='w-36 borde flex flex-col'>
      {/* <label className="bg-gray-200 rounded-t p-2">{label}</label> */}
      {/* {searchShow &&
        <input type="search" placeholder="Search" onChange={handleChangeSearch} onFocus={handleFocusSearch} onBlur={handleBlurSearch} />
      } */}
      <select
        // ref={selectRef}
        name={name}
        value={filteredOptions.find((option: any) => option.selected)?.value} /* value={viewOptions.map((item: any) => item.value)} */
        // defaultValue={defaultValue}
        multiple={multiple}
        // size={0}
        onChange={handleChangeSelect}
        // onFocus={handleFocusSelect}
        // onBlur={handleBlurSelect}
      >
        <option value="">{name}</option>
        {/* <option value="all">Select All</option> */}
        {filteredOptions.map((item: any) => <option key={item.value} value={item.value}>{item.name}</option>)}
      </select>
    </div>
  )
  // return (
  //   <div className='min-w-56 relative border'>
  //     <label className="bg-gray-200 block p-2">{name}</label>
  //     <div className="p-2" onClick={handleClickOverflow}>
  //       {options.find((item: any) => item.selected)?.name}
  //     </div>
  //     <div className="absolute border" ref={overflowRef}>
  //       <input type="text" placeholder="Search" className="block" onChange={handleSearch} onFocus={handleFocusSearch} onBlur={handleBlurSearch} />
  //         {/* <option value="">Select {name}</option> */}
  //         {/* <option value="all">Select All</option> */}
  //         {viewOptions.map((item: any) => (
  //           <p key={item.value} className={`p-1 ${ item.selected ? "bg-gray-400" : "" }`} onClick={() => handleClickOption(item.value)}>{item.name}</p>
  //         ))}
  //     </div>
  //   </div>
  // );
}
