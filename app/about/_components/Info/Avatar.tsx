import profile from "@/../public/avatars/ghibli_avatar.png";
import Image from "next/image";

const Avatar = () => {
  return (
    <div className="hidden overflow-hidden mx-3 w-40 h-40 rounded-full ring-2 sm:block min-w-40 min-h-40 ring-primary">
      <Image
        src={profile}
        alt="profile"
        width={160}
        height={160}
        className="w-40 h-40 rounded-full transition-all duration-200 ease-in-out hover:scale-110 min-w-40 min-h-40"
      />
    </div>
  );
};

export default Avatar;
