import { Spinner } from ".";

interface ButtonProps {
  disabled?: boolean;
  label: string;
  action: () => void;
  loading?: boolean;
}

const Button = ({
  disabled = false,
  label,
  action,
  loading = false,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={action}
      className="flex justify-center items-center py-2 px-4 space-x-4 font-semibold ring-2 transition-colors duration-200 ease-in-out cursor-pointer text-root ring-primary bg-primary min-w-[300px] hover:not-disabled:text-primary hover:not-disabled:bg-root hover:not-disabled:shadow-[10px_10px_0px_0px_black] active:not-disabled:not-hover:text-root active:not-disabled:text-primary active:not-disabled:shadow-[10px_10px_0px_0px_black] active:not-disabled:brightness-125 disabled:grayscale-100"
    >
      {loading && <Spinner />}
      <span>{label}</span>
    </button>
  );
};

export default Button;
