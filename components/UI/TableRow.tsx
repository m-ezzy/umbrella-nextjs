
export default function TableRow({ data }: any) {
  const items = data.map((item: any) => {
    return <div key={item} className='p-1'>{item}</div>
  });
  return (
    <div className='bg-gray-200 border rounded-md p-2 grid' style={{ gridTemplateColumns: `repeat(${data.length}, 1fr)` }}>
      {items}
    </div>
  );
}
