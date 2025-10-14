"use client";
import { Button, Heading2, Input, TextArea } from "@/_components";
import { Turnstile } from "./_components";
import Link from "next/link";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useRef, useState } from "react";
import { contact } from "./actions";
import { useAlert } from "@/_components/AlertBox/_hooks";
import validate from "./_utils/validate";

const Contact = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const tsToken = useRef<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { alert } = useAlert("global");

  const handleSubmit = async () => {
    const { valid, messages } = validate(
      nameRef.current?.value || "",
      emailRef.current?.value || "",
      messageRef.current?.value || "",
    );
    if (!valid) {
      alert({
        id: "contact-invalid",
        title: "Invalid input",
        message: messages.join("\n"),
        severity: "error",
      });
      return;
    }

    setLoading(true);
    if (tsToken.current) {
      const res = await contact({
        token: tsToken.current,
        name: nameRef.current?.value || "",
        email: emailRef.current?.value || "",
        message: messageRef.current?.value || "",
      });

      if (!res.success) {
        alert({
          id: "contact-error",
          title: "Error",
          message: res.message,
          severity: "error",
        });
      } else {
        alert({
          id: "contact-success",
          title: "Success",
          message: res.message,
          severity: "success",
        });
      }
      setLoading(false);
      nameRef.current!.value = "";
      emailRef.current!.value = "";
      messageRef.current!.value = "";
      // @ts-expect-error: Turnstile object should be present
      window.turnstile.reset();
      return;
    }
  };

  return (
    <div className="flex overflow-auto flex-col max-h-[calc(100dvh-170px)]">
      <div className="flex relative top-0 justify-end items-center px-6 space-x-2 underline underline-offset-4 w-dvw text-dark-100 animate-text-focus hover:decoration-dashed">
        <FaArrowCircleLeft />
        <Link href="/">Go back</Link>
      </div>
      <div className="flex flex-col justify-center items-center my-auto w-dvw animate-slide-in-from-bottom">
        <div className="relative group">
          <div className="hidden absolute w-12 h-12 border-t-2 border-r-2 transition-all duration-200 ease-in-out sm:block border-primary -top-[24px] -right-[24px] group-hover:-top-[16px] group-hover:-right-[16px]" />
          <div className="hidden absolute w-48 h-48 border-t-2 border-l-2 transition-all duration-200 ease-in-out sm:block border-primary -top-[24px] -left-[24px] group-hover:-top-[16px] group-hover:-left-[16px]" />
          <div className="hidden absolute w-12 h-12 border-b-2 border-l-2 transition-all duration-200 ease-in-out sm:block border-primary -bottom-[24px] -left-[24px] group-hover:-bottom-[16px] group-hover:-left-[16px]" />
          <div className="hidden absolute w-48 h-48 border-r-2 border-b-2 transition-all duration-200 ease-in-out sm:block border-primary -right-[24px] -bottom-[24px] group-hover:-right-[16px] group-hover:-bottom-[16px]" />
          <div className="flex overflow-auto relative flex-col p-6 min-w-max ring-2 transition-all duration-200 ease-in-out hover:ring-gray-500 hover:ring-offset-2 ring-secondary ring-offset-root h-max max-h-[calc(100dvh-200px)] max-w-[90dvw] gap-[1rem] backdrop-blur-md">
            <Heading2>Contact </Heading2>
            <Input placeholder="Name" nameRef={nameRef} />
            <Input placeholder="Email" nameRef={emailRef} />
            <TextArea placeholder="Message" messageRef={messageRef} />
            <Turnstile
              getToken={(token: string) => (tsToken.current = token)}
            />
            <Button
              disabled={!tsToken}
              label={"Submit"}
              action={handleSubmit}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
