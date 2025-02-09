import React, { forwardRef, useId, useEffect, useRef } from "react";

const Textarea = forwardRef(function textArea(
  {
    textAreaClasses = "",
    labelClasses = "",
    label,
    name,
    minRows = 3, // Minimum number of visible rows
    maxRows = null, // Maximum number of visible rows (optional)
    ...props
  },
  ref
) {
  const id = useId();
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const resizeTextarea = () => {
      textarea.style.height = "auto"; // Reset height to recalculate
      let newHeight = textarea.scrollHeight;

      if (maxRows) {
        const maxHeight =
          maxRows * parseInt(getComputedStyle(textarea).lineHeight, 10);
        newHeight = Math.min(newHeight, maxHeight);
      }
      if (minRows) {
        const minHeight =
          minRows * parseInt(getComputedStyle(textarea).lineHeight, 10);
        newHeight = Math.max(newHeight, minHeight);
      }
      textarea.style.height = `${newHeight}px`;
    };

    textarea.addEventListener("input", resizeTextarea);
    resizeTextarea(); // Initial resize on mount

    return () => {
      textarea.removeEventListener("input", resizeTextarea);
    };
  }, [maxRows, minRows]);

  return (
    <div className="flex flex-col">
      <label
        className={`text-text-light-sec dark:text-gray-3 font-semibold text-sm py-1 mt-2 ${labelClasses} font-light`}
        htmlFor={id}
      >
        {label}
      </label>
      <textarea
        className={`text-text-light-sec dark:bg-gray-9 dark:text-gray-3 bg-gray-05 border border-gray-3 dark:border-gray-4 p-2 rounded-md focus:outline focus:outline-1 focus:outline-gray-2 dark:focus:outline-gray-4 w-full resize-none ${textAreaClasses}`}
        id={id}
        name={name}
        ref={textareaRef || ref} // Use internal ref for resizing
        style={{ overflowY: "hidden" }} // Hide scrollbar while resizing
        {...props}
      ></textarea>
    </div>
  );
});

export default Textarea;
