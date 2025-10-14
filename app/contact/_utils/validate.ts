import { isEmail } from "validator";

const validate = (name: string, email: string, message: string) => {
  const output: {
    valid: boolean;
    messages: string[];
    invalidFields: string[];
  } = {
    valid: false,
    messages: [],
    invalidFields: [],
  };

  if (!name) {
    output.messages.push("Name is required.");
    output.invalidFields.push("name");
  }

  if (!email) {
    output.messages.push("Email is required.");
    output.invalidFields.push("email");
  }

  if (!message) {
    output.messages.push("Message is required.");
    output.invalidFields.push("message");
  }

  if (!isEmail(email)) output.messages.push("Invalid email format.");

  if (output.messages.length === 0) output.valid = true;

  return output;
};

export default validate;
