import { IconType } from "react-icons";

interface SocialProps {
  url: string;
  icon: IconType;
}
const Social = ({ url, icon }: SocialProps) => {
  const Icon = icon;
  return (
    <a
      className="transition-all duration-200 ease-in-out hover:scale-110 hover:brightness-125"
      href={url}
      target="_blank"
    >
      <Icon className="text-3xl" />
    </a>
  );
};

export default Social;
