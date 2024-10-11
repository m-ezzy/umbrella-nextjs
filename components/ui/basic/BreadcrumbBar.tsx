import Link from "next/link";

type breadcrumb = {
  label: string
  href: string
  active?: true
}
export default function BreadcrumbBar({ breadcrumbs }: breadcrumb[]) {
  const items = breadcrumbs.map((item: any, index: number) => {
    let href = ""
    for(let i = 0; i < index; i++) {
      href += "/" + breadcrumbs[index].path;
    }

    return (
      <span key={index}>
        <Link href={item.path}>{item.label}</Link> {index < breadcrumbs.length - 1 && <span>&gt;</span>}
      </span>
    )
  })
  return (
    <div className="bg-gray-200 rounded-md flex p-2 gap-2" aria-label="breadcrumbs">
      {items}
    </div>
  );
}
