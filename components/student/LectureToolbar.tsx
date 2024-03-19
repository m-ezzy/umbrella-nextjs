"use client";
import { revalidatePath } from "next/cache";

export default function LectureToolbar({ children, courses, setFilterBy }: any) {
  const handleChangeFilterByCourse = (event: any) => {
    event.preventDefault();
    setFilterBy(event.target.value);
  };

  return (
    <div className="my-2 border p-2 flex gap-2">
      {/* <form className="space-x-2">
        <label>Sort By</label>
        <select name="sort_by" onChange={handleChangeSortBy}>
          <option value="date">Date & Time</option>
        </select>
      </form> */}
      {/* <form className="space-x-2" onChange={handleChangeSortBy}>
        <label>Filter By</label>
        <select name="filter_by">
          <option value="course">Course</option>
          <option value="professor">Professor</option>
          <option value="room number">Room Number</option>
        </select>
      </form> */}
      <form className="space-x-2" onChange={handleChangeFilterByCourse}>
        <label>Filter By Course</label>
        <select name="filter_by_course">
          {courses.map((course, index) => {
            return <option key={index} value={course}>{course}</option>;
          })}
        </select>
      </form>
      {children}
    </div>
  );
}
