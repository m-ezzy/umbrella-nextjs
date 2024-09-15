// Read Add Edit Delete
// Get Create Update Delete
// Select Insert Update Delete
export default function ActionButton({ type, label }: any) {
  const buttonIcons: any = {
    "Create": "add",
    "Edit": "edit",
    "Update": "update",
    "Delete": "delete",
  };
  return (
    <button type="submit" className="">
      <span className="material-symbols-outlined">{buttonIcons[type]}</span>
      <span>{type} {label}</span>
    </button>
  );
}
