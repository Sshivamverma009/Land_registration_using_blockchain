import React, { forwardRef, useId } from "react";

function Input(
  { label, type = "text", placeholder = "Enter your text here", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="input">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        className="ipt"
        placeholder={placeholder}
        {...props}
        ref={ref}
        id={id}
      />
    </div>
  );
}

export default forwardRef(Input);
