// Add Edit Delete
// Create, Update, Delete
export default function CreateButton({ text }: any) { //ActionButton
  // console.log(text);
  return (
    <button className="">
      <span className="material-symbols-outlined">add</span>
      <span>{text}</span>
    </button>
  );
}
