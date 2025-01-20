import React, {ChangeEvent, useState} from "react";

// Define types for props
interface InputFieldProps {
    field: string; // The name of the input field (e.g., "email", "message")
    label: string; // Label for the input field
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Icon component to be displayed inside the input field
    formData: Record<string, string>; // Form data object, where field values are stored
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; // Change handler function
}

const InputField: React.FC<InputFieldProps> = ({ field, label, icon: Icon, formData, handleChange }) => {
    const [isFocused, setIsFocused] = useState<boolean>(false); // State to track if the input is focused

    // Helper function to generate input classes dynamically
    const getInputClasses = (isTextArea = false): string => {
        const baseClasses = `
      w-full p-4 rounded-xl bg-white/10 text-white placeholder-transparent 
      focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-2 
      focus:ring-offset-[#1c1e26] transition-all duration-300 peer
    `;

        // Add different styles when the input is focused
        const hoverFocusClasses = isFocused
            ? "shadow-[0_4px_12px_rgba(99,102,241,0.4)] border-[#6366f1]"
            : "border-white/20 hover:border-[#6366f1]";

        return `${baseClasses} ${hoverFocusClasses} ${isTextArea ? "h-52 pt-12" : "pl-12"}`;
    };

    // Render the correct input or textarea based on the field type
    const renderInputContent = () => {
        if (field === "message") {
            return (
                <textarea
                    id={field}
                    name={field}
                    placeholder={label}
                    value={formData[field]}
                    onChange={handleChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={getInputClasses(true)} // Use text area specific classes
                    required
                />
            );
        }

        // For other fields, render an input element
        return (
            <input
                id={field}
                type={field === "email" ? "email" : "text"} // If it's the "email" field, set type="email"
                name={field}
                placeholder={label}
                value={formData[field]}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={getInputClasses()} // Use default input classes
                required
            />
        );
    };

    return (
        <div className="relative w-full group">
            {/* Icon and Label */}
            <div className="absolute left-4 top-4 flex items-center space-x-2 text-gray-400 transition-colors group-hover:text-[#6366f1]">
                <Icon className="w-5 h-5" />
                <label
                    htmlFor={field}
                    className={`
            absolute left-12 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm transition-all duration-300 
            peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-0 
            peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base 
            peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[#6366f1] peer-focus:text-sm
          `}
                >
                    {label}
                </label>
            </div>

            {/* Input or Textarea */}
            {renderInputContent()}

            {/* Focus/Hover Border Effect */}
            <div
                className={`
          absolute inset-0 border rounded-xl pointer-events-none 
          transition-all duration-300 
          ${isFocused ? "border-[#6366f1]" : "border-transparent"}
        `}
            ></div>
        </div>
    );
};

export default InputField;
