import React from "react";

export default function Settings() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Settings</h1>
      <p>
        Les différentes options sont détaillées dans la{" "}
        <a href="/docs/Settings.md" className="text-blue-600 underline">
          documentation des paramètres
        </a>
        .
      </p>
    </div>
  );
}
