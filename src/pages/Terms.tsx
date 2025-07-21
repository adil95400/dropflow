import React from "react";

export default function Terms() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Terms</h1>
      <p>
        Veuillez lire nos{" "}
        <a href="/docs/Terms.md" className="text-blue-600 underline">
          conditions d'utilisation
        </a>
        .
      </p>
    </div>
  );
}
