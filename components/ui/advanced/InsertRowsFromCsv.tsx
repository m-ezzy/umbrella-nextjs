import { useState } from "react";

export default function InsertRowsFromCsv({ onInsert, setInsertRows }: any) {
  const [csv, setCsv] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleChangeFile = (e: any) => {
    // try {
    //   const rows = parseCsv(csv);
    //   onInsert(rows);
    //   setCsv('');
    //   setError(null);
    // } catch (e: any) {
    //   setError(e.message);
    // }
  };

  return (
    <div>
      <textarea value={csv} onChange={(e) => setCsv(e.target.value)} />
      <input type="file" onChange={(e) => {}} />
      <button onClick={handleChangeFile}>Insert</button>
      {error && <div>{error}</div>}
    </div>
  );
}
