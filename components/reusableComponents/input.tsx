import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
  bgColorChange?:boolean
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type = "text",
  required,
  register,
  errors,
  disabled,
  bgColorChange
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="
            text-sm 
            font-medium 
            leading-6 
          "
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
          className={clsx(
            `
              form-input
              dark:bg-gray-500
              block 
              w-full 
              rounded-md
              text-gray-900 
              dark:text-white
              border-0 
              py-1.5 
              shadow-sm 
              ring-1 
              ring-inset 
              ring-gray-300
              dark:ring-gray-50 
              placeholder:text-gray-400 
              dark:placeholder:text-gray-600
              focus:ring-2 
              focus:ring-inset 
              focus:ring-sky-500
              
              sm:text-sm 
              sm:leading-6`,
            errors[id] && "focus:ring-rose-500",
            disabled && "opacity-50 cursor-default",
            bgColorChange && "dark:bg-inherit"
          )}
        />
      </div>
    </div>
  );
};

export default Input;
