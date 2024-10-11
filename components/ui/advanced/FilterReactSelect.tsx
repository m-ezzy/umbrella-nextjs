import { useState } from 'react'
import Select from 'react-select'

export default function({ options }: any) {
  const [selectedOption, setSelectedOption] = useState(null)

  return (
    <Select
      defaultValue={selectedOption}
      onChange={setSelectedOption}
      options={options}
    />
  )
}
