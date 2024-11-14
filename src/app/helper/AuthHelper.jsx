import { v4 as uuidv4 } from "uuid";
import { authText } from "../Global/text";

const SignUpHelperFunction = () => {
  return [
    {
      id: uuidv4(),
      label: authText.NAME_LABE,
      placeholder: authText.NAME_PLACEHOLDER,
      value: "",
      type: "text",
    },
    {
      id: uuidv4(),
      label: authText.EMAIL_LABEL,
      placeholder: authText.EMAIL_PLACEHOLDER,
      value: "",
      type: "text",
    },
    {
      id: uuidv4(),
      label: authText.PASSWORD_LABEL,
      placeholder: authText.PASSWORD_PLACEHOLDER,
      value: "",
      type: "password",
    },
  ];
};

const SignInHelperFunction = () => {
  return [
    {
      id: uuidv4(),
      label: authText.EMAIL_LABEL,
      placeholder: authText.EMAIL_PLACEHOLDER,
      value: "",
      type: "text",
    },
    {
      id: uuidv4(),
      label: authText.PASSWORD_LABEL,
      placeholder: authText.PASSWORD_PLACEHOLDER,
      value: "",
      type: "password",
    },
  ];
};

export { SignUpHelperFunction, SignInHelperFunction };
