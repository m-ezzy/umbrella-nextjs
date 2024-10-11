import { getRoleMenus } from '@/constants/menus'
import MenuList from '@/components/ui/advanced/MenuList'

export default function ProfessorLayout({ children, data, dataset }: any) {
  return (
    <div className="bg-white w-full h-full flex">
      <MenuList menus={getRoleMenus("professor")} selected="" pathSegment="/dashboard/professor" pathPosition={3} />
      <div className="w-full grid">
        <ProfessorFilters data={data} dataset={dataset} />
        <div className="w-full h-full p-2 space-y-2 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
