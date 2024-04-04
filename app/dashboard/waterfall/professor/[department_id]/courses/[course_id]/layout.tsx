import { ReactNode } from 'react'
import MenuList from '../../../../_components/MenuList'

export default async function Layout({ children, params }: { children: ReactNode, params: { department_id: string, course_id: string } }) {
  const menus = [
    // {
    //   key: 'analysis',
    //   title: 'Analysis',
    //   link: `/dashboard/waterfall/professor/${params.department_id}/courses/${params.course_id}/analysis`,
    //   icon: 'assessment',
    // },
    {
      key: 'description',
      title: 'Description',
      link: `/dashboard/waterfall/professor/${params.department_id}/courses/${params.course_id}/description`,
      icon: 'description',
    },
    {
      key: 'material',
      title: 'Material',
      link: `/dashboard/waterfall/professor/${params.department_id}/courses/${params.course_id}/material`,
      icon: 'book',
    },
    {
      key: 'teaching', //or division. use division instead of teaching
      title: 'Teaching',
      link: `/dashboard/waterfall/professor/${params.department_id}/courses/${params.course_id}/teaching`,
      icon: 'school',
    },
  ]
  return (
    <>
      <MenuList menus={menus} pathPosition={7} />
      {children}
    </>
  );
}
