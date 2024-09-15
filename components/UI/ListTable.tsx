
export default function ListTable({ data }: { data: any[] }) { //DatasetTable DataTable DataList TableHeader TableRow ListHeader ListItem
  const attributes: string[] = Object.keys(data[0] as object);

  const headerItems = attributes.map((item: any) => {
    return <div key={item} className="border-r p-2">{item}</div>
  });

  const rowItems = data.map((row: any, index: number) => {
    const cellItems: any = Object.values(row as object).map((item: any) => {
      return <div key={item} className='border-r p-2'>{item}</div>
    });
    return (
      <div key={row.id} className="border-b grid" style={{ gridTemplateColumns: `repeat(${attributes.length}, 1fr)` }}>
        {cellItems}
      </div>
    );
  });

  return (
    <div className='border-l border-t rounded'>
      <div className='bg-gray-200 font-bold border-b grid' style={{ gridTemplateColumns: `repeat(${attributes.length}, 1fr)` }}>
        {headerItems}
      </div>
      {rowItems}
    </div>
  );
}
