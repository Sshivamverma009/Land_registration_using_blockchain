import React from "react";

export default function Button(
    {
        type="button",
        className="",
        children,
        ...props
    }
){
    return(
        <button className={`${className}`} type={type} {...props}>{children}</button>
    );
}