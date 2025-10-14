import { useEffect } from "react";
import { Severity } from "../AlertBox";
import {
  FaInfoCircle,
  FaCheckCircle,
  FaExclamationTriangle,
  FaExclamationCircle,
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

interface IAlert {
  title: string;
  message: string;
  severity: Severity;
  duration?: number;
  closable?: boolean;
  close: () => void;
}

const Alert = ({
  title,
  message,
  severity,
  duration = 5000,
  closable = true,
  close,
}: IAlert) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      close();
    }, duration);
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const calculateIcon = () => {
    const ICON_STYLE = "mr-3 text-xl text-black";

    switch (severity) {
      case "error":
        return <FaExclamationCircle className={ICON_STYLE} />;
      case "warning":
        return <FaExclamationTriangle className={ICON_STYLE} />;
      case "info":
        return <FaInfoCircle className={ICON_STYLE} />;
      case "success":
        return <FaCheckCircle className={ICON_STYLE} />;
      default:
        break;
    }
  };

  const calculateStyle = () => {
    switch (severity) {
      case "error":
        return "bg-alert-error";
      case "warning":
        return "bg-alert-warning";
      case "info":
        return "bg-alert-info";
      case "success":
        return "bg-alert-success";
      default:
        break;
    }
  };

  return (
    <div
      className={`animate-text-focus relative flex flex-col items-start px-4 py-2 text-black ${calculateStyle()} w-[30rem] max-w-[95dvw] rounded-sm`}
    >
      <div className="flex items-center">
        {calculateIcon()}
        <div className="font-bold text-wrap">{title}</div>
      </div>
      <div className="ml-8 text-sm text-wrap">{message}</div>
      {closable && (
        <button
          className="absolute top-1 right-1 p-1 rounded-full cursor-pointer"
          onClick={close}
        >
          <IoMdClose className="text-xl" />
        </button>
      )}
    </div>
  );
};

export default Alert;
