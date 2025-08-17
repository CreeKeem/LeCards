import { useState, useCallback } from "react";

export interface ValidationRules {
  email?: boolean;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  match?: string;
}

export interface FieldError {
  message: string;
  type: string;
}

export interface FormValidation {
  errors: Record<string, FieldError | null>;
  isValid: boolean;
  validateField: (
    name: string,
    value: string,
    rules: ValidationRules,
    compareValue?: string
  ) => boolean;
  clearError: (name: string) => void;
  clearAllErrors: () => void;
}

export const useFormValidation = (): FormValidation => {
  const [errors, setErrors] = useState<Record<string, FieldError | null>>({});

  const validateField = useCallback(
    (
      name: string,
      value: string,
      rules: ValidationRules,
      compareValue?: string
    ): boolean => {
      let error: FieldError | null = null;

      // Required validation
      if (rules.required && (!value || value.trim().length === 0)) {
        error = { message: "This field is required", type: "required" };
      }
      // Email validation
      else if (rules.email && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          error = {
            message: "Please enter a valid email address",
            type: "email",
          };
        }
      }
      // Min length validation
      else if (rules.minLength && value && value.length < rules.minLength) {
        error = {
          message: `Must be at least ${rules.minLength} characters long`,
          type: "minLength",
        };
      }
      // Max length validation
      else if (rules.maxLength && value && value.length > rules.maxLength) {
        error = {
          message: `Must be no more than ${rules.maxLength} characters long`,
          type: "maxLength",
        };
      }
      // Match validation (for password confirmation)
      else if (rules.match && compareValue && value !== compareValue) {
        error = { message: "Passwords do not match", type: "match" };
      }

      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));

      return error === null;
    },
    []
  );

  const clearError = useCallback((name: string) => {
    setErrors((prev) => ({
      ...prev,
      [name]: null,
    }));
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);

  const isValid = Object.values(errors).every((error) => error === null);

  return {
    errors,
    isValid,
    validateField,
    clearError,
    clearAllErrors,
  };
};

import React from "react";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string | null;
  required?: boolean;
  className?: string;
  disabled?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  required,
  className = "",
  disabled = false,
}) => {
  const inputClass = `h-[50px] border ${
    error
      ? "border-red-400 focus:border-red-500 focus:ring-red-200"
      : "border-[#E5E7EB] focus:border-laker-purple focus:ring-laker-purple/20"
  } placeholder-[#ADAEBC] rounded-[8px] focus:outline-none focus:ring-2 p-3 transition-all duration-200 bg-white disabled:bg-gray-50 disabled:cursor-not-allowed ${className}`;

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-sm font-medium mb-1 text-[#374151]">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        className={inputClass}
        autoComplete={
          type === "password"
            ? name.includes("confirm")
              ? "new-password"
              : "current-password"
            : type === "email"
            ? "email"
            : name
        }
      />
      {/* Fixed height error container */}
      <div className="h-[20px] mt-1">
        <div
          className={`transition-all duration-200 ${
            error
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform -translate-y-1"
          }`}
        >
          {error && (
            <p className="text-red-500 text-xs font-medium flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
