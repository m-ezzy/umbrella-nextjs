
export default function FilterForm({ children }: any) {
  return (
    <div className="border rounded-md p-2 gap-2 grid-cols-2 items-center md:grid-cols-4 lg:grid-cols-8">
      {children}
    </div>
  );
}
