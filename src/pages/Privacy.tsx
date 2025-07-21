import React from "react";

export default function Privacy() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Privacy</h1>
      <p>
        Détails disponibles dans notre{" "}
        <a href="/docs/Privacy.md" className="text-blue-600 underline">
          politique de confidentialité
        </a>
        .
      </p>
    </div>
  );
}
