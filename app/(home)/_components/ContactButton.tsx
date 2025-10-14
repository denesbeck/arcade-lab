import Link from "next/link";
import { FaArrowCircleRight } from "react-icons/fa";

interface ContactButtonProps {
  label: string;
}

const ContactButton = ({ label }: ContactButtonProps) => {
  return (
    <Link
      href="/contact"
      prefetch={true}
      className="flex items-center py-2 px-3 mt-6 ring-2 transition-colors duration-200 ease-in-out cursor-pointer animate-text-focus backdrop-blur-md ring-primary text-primary hover:bg-primary hover:text-slate-800"
    >
      {label}
      <FaArrowCircleRight className="inline ml-2 text-xl" />
    </Link>
  );
};

export default ContactButton;
