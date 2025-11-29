import React, { useState } from "react";

interface AvatarProps {
  name: string;
  src?: string;
  size?: number; 
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ name, src, size = 40, className }) => {
  const [imageError, setImageError] = useState(false);

  const getInitials = (fullName: string) => {
    const names = fullName.trim().split(" ");
    if (names.length === 0) return "";
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const shouldShowImage = src && !imageError;

  return shouldShowImage ? (
    <img
      src={src}
      alt={name}
      className={`rounded-full object-cover ${className}`}
      style={{ width: size, height: size }}
      onError={handleImageError}
    />
  ) : (
    <div
      className={`rounded-full bg-green-700 text-white font-semibold flex items-center justify-center text-2xl ${className}`}
      style={{ width: size, height: size }}
    >
      {getInitials(name)}
    </div>
  );
};

export default Avatar;
