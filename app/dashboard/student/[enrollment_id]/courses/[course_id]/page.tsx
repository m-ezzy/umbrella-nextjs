
export default async function Page({ params }: any) {
  console.log(params.course_id)
  return (
    <main>
      <div className="text-xl">{params.course_id}</div>
    </main>
  );
}
