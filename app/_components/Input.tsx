import { RefObject } from "react";

interface IInput {
  placeholder: string;
  nameRef: RefObject<HTMLInputElement | null>;
}

const Input = ({ placeholder, nameRef }: IInput) => {
  return (
    <input
      placeholder={placeholder}
      className="py-3 px-4 bg-transparent ring-2 ring-primary min-w-[300px] focus-visible:ring-focus focus-visible:outline-hidden active:ring-active"
      ref={nameRef}
    />
  );
};

export default Input;
