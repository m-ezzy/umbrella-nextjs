import { ReactNode } from "react";

export default function Sidebar({ children }: { children: ReactNode}) {
  return (
    <div className="h-full min-h-full border-r overflow-auto">
      {children}
    </div>
  );
}
