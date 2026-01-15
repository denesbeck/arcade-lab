"use client";
import profile from "@/../public/avatars/ghibli_avatar.png";
import Image from "next/image";
import { useState, useCallback } from "react";
import { Skeleton, ThemeProvider } from "@mui/material";
import { darkTheme } from "@/theme";

interface IAvatar {
  autoHide?: boolean;
}

const Avatar = ({ autoHide = true }: IAvatar) => {
  const [loading, setLoading] = useState(true);

  const handleLoad = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <div
      className={`${autoHide ? "hidden" : ""} overflow-hidden mx-3 w-40 h-40 rounded-full ring-2 sm:block min-w-40 min-h-40 ring-primary`}
    >
      {loading && (
        <ThemeProvider theme={darkTheme}>
          <Skeleton
            variant="rounded"
            animation="wave"
            width={160}
            height={160}
            className="min-w-40 min-h-40 !bg-dark-800"
          />
        </ThemeProvider>
      )}

      <Image
        src={profile}
        alt="profile"
        width={160}
        height={160}
        quality={100}
        className="w-40 h-40 rounded-full transition-all duration-200 ease-in-out hover:scale-110 animate-text-focus min-w-40 min-h-40"
        onLoad={() => handleLoad()}
      />
    </div>
  );
};

export default Avatar;
