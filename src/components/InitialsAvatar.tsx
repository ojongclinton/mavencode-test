import React from "react";

function InitialsAvatar({
  fullName,
  avatarUrl,
}: {
  fullName?: string;
  avatarUrl?: string;
}) {
  if (avatarUrl) {
    // return <img src={avatarUrl} />
    return <img className="h-8 w-8" src={avatarUrl} />
  } else if (fullName) {
    return <p>Avatar here</p>;
  }
  return <p>Nothing here</p>;
}

export default InitialsAvatar;
