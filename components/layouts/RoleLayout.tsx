import { getRoleMenus } from '@/constants/menus'
import MenuList from '@/components/ui/advanced/MenuList'
import FilterList from '@/components/ui/advanced/FilterList'
import FounderFilters from '@/components/filters/FounderFilters'
import AdminFilters from '../filters/AdminFilters'
import StudentFilters from '../filters/StudentFilters'

export default function RoleLayout({ children, role, data, dataset, FilterComponent }: any) {
  return (
    <div className="bg-white w-full h-full flex">
      <MenuList menus={getRoleMenus(role)} selected="" pathSegment={`/dashboard/${role}`} pathPosition={3} />
      <div className="w-full grid">
        {/* <FilterList role={role} data={data} dataset={dataset} /> */}

        {/* <FilterComponent data={data} dataset={dataset} /> */}

        {/* {role === "founder" && <FounderFilters />} */}
        {/* {role === "admin" && <AdminFilters />} */}
        {/* {role === "professor" && <ProfessorFilters />} */}
        {/* {role == "student" && <StudentFilters />} */}
        <div className="w-full h-full p-2 space-y-2 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
