import React, { useState } from "react";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Toast from "@/components/ui/toast";

export default function Profile() {
  const [message, setMessage] = useState("");

  const handleSave = () => {
    setMessage("Profile saved");
  };

  return (
    <div className="p-4 space-y-4">
      <Select
        data-testid="privacy-select"
        options={[
          { value: "public", label: "Public" },
          { value: "private", label: "Private" },
        ]}
      />
      <Button onClick={handleSave}>Save</Button>
      {message && <Toast>{message}</Toast>}
    </div>
  );
}
