"use client";
import { useState } from "react";

export type SelectOptions = { //FormFieldSelectOptions
  name: string;
  value: string;
  selected?: boolean;
  show?: boolean;
}
export type FilterType = {
  name: string;
  // label: string;
  options: any[];
  valueType?: string;
  selectMultiple?: boolean;

  // option's values only as string
  value?: string;
  // value: any;
  values?: string[];
  // values: any[];

  // option's name and value as object
  selectedValue?: string;
  // selectedValue: any;
  selectedValues?: string[];
  // selectedValues: any[];

  setSelectedValues?: any;
  setSelectedOptions?: any;
}
export default function Filter({ name, options, valueType="string", selectMultiple=false, selectedValues=[], setSelectedValues, setSelectedOptions, setFilters }: any) {
  console.log(name, options, valueType, selectMultiple, selectedValues, setSelectedValues, setSelectedOptions, setFilters);

  let [viewOptions, setViewOptions] = useState(options);
  // let [viewValues, setViewValues] = useState(options.filter((option: any) => option.selected).map((option: any) => option.value));

  const handleSearch = (e: any) => {
    let query: string = e.target.value;
    let filteredOptions: any[] = options.filter((item: any) => item.name.toLowerCase().includes(query.toLowerCase()));
    setViewOptions((prev: any) => filteredOptions);
  }

  const handleSelect = (e: any) => {
    // console.log(e.target.value);
    // console.log(e.target.selectedOptions);

    let selectedValue: number | string = (valueType == "number" ? parseInt(e.target.value) : e.target.value);
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








    setFilters((prev: any) => {
      let newFilters: any = prev.map((filter: any) => {
        if(filter.name == name) {
          // following code is applied if selected filed is added to option object instead of selectedValues array in filter object
          let options: any = filter.options.map((option: any) => {
            return {
              ...option,
              selected: option.value == selectedValue,
            }
            // return {
            //   ...option,
            //   selected: newSelectedValues.includes(option.value),
            // }
          });
          return {
            ...filter,
            options: options,
            // selectedValues: newSelectedValues,
          }
        } else {
          return filter;
        }
      });
      return newFilters;
    });
  }
  return (
    <div className='border'>
      <label className="bg-gray-200 block p-2">{name}</label>
      <input type="text" placeholder="Search" className="block" onChange={handleSearch} />
      <select className="w-full" value={viewOptions.find((item: any) => item.selected)} onChange={handleSelect} multiple={selectMultiple}>
      {/* <select className="w-full" value={viewOptions.map((item: any) => item.value)} onChange={handleSelect} multiple={selectMultiple}> */}
        <option value="">Select {name}</option>
        {viewOptions.map((item: any) => <option key={item.value} value={item.value}>{item.name}</option>)}
      </select>
    </div>
  );
}
