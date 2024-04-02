
export default function TableHeader({ titles }: any) {
  const items = titles.map((item: any) => {
    return <div key={item}>{item}</div>
  });
  return (
    <div className='bg-gray-200 border rounded-md p-2 grid' style={{ gridTemplateColumns: `repeat(${titles.length}, 1fr)` }}>
      {items}
    </div>
  );
}
