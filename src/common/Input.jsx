import clsx from "clsx";

const Input = ({
  name,
  label,
  type,
  value,
  placeHolder,
  required,
  className,
  ...rest
}) => {
  const baseClassNames = clsx(
    "block w-full bg-[#212228] text-[#6D7A86] placeholder:text-[#6D7A86] font-display font-medium text-[19px] leading-[27px] px-4 h-[48px] rounded-[10.96px] shadow-sm border border-[#1A1C22] focus:outline-none",
    className
  );

  return (
    <div className="space-y-1">
      <label
        className="font-display text-[15.5px] leading-[20px] font-medium text-[#6D7A86]"
        htmlFor={name}
      >
        {label}
        {required && (
          <span className="text-[#655B67] dark:text-[#FFF] ml-1">*</span>
        )}
      </label>
      <input
        className={baseClassNames}
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeHolder}
        {...rest}
      />
    </div>
  );
};

export default Input;
