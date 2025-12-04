function InitialsAvatar({
  fullName,
  avatarUrl,
}: {
  fullName?: string;
  avatarUrl?: string;
}) {
  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");

    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }
    return parts[0][0].toUpperCase() + parts[parts.length - 1][0].toUpperCase();
  };

  if (avatarUrl) {
    return (
      <img className="h-8 w-8 rounded-full object-cover" src={avatarUrl} />
    );
  }

  if (fullName) {
    const initials = getInitials(fullName);

    return (
      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-700 select-none">
        {initials}
      </div>
    );
  }

  return (
    <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-xs text-gray-600">
      ?
    </div>
  );
}

export default InitialsAvatar;
