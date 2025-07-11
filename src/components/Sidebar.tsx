import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-60 p-4 bg-muted">
      <nav className="space-y-2">
        <Link to="/">Home</Link>
      </nav>
    </aside>
  );
}
