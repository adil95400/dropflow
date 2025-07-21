import React from "react";

export default function Profile() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Profile</h1>
      <p>
        Consultez la{" "}
        <a href="/docs/Profile.md" className="text-blue-600 underline">
          documentation profil
        </a>{" "}
        pour apprendre à modifier vos informations.
      </p>
    </div>
  );
}
