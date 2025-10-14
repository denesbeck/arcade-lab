import { RefObject } from "react";

interface ITextArea {
  placeholder: string;
  messageRef: RefObject<HTMLTextAreaElement | null>;
}

const TextArea = ({ placeholder, messageRef }: ITextArea) => {
  return (
    <textarea
      placeholder={placeholder}
      className="py-3 px-4 bg-transparent ring-2 ring-primary min-w-[300px] focus-visible:ring-focus focus-visible:outline-hidden active:ring-active"
      ref={messageRef}
    />
  );
};

export default TextArea;
