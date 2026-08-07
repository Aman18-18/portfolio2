import { useState } from "react";
import { profile } from "../data/portfolio";

export function Avatar() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <img
        src="/avatar.svg"
        alt={`${profile.name} ${profile.surname}`}
        className="w-full h-full object-cover"
      />
    );
  }

  return (
    <img
      src={profile.avatar}
      alt={`${profile.name} ${profile.surname}`}
      className="w-full h-full object-cover"
      onError={() => setFailed(true)}
    />
  );
}
