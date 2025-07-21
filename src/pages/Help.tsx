import React from "react";

export default function Help() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Help</h1>
      <p>
        Pour plus d'informations, consultez la{" "}
        <a href="/docs/Help.md" className="text-blue-600 underline">
          documentation d'aide
        </a>
        .
      </p>
    </div>
  );
}
