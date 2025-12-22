"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomDropdown from "@/app/components/CustomDropdown";

// Validation schema
const createSchema = () =>
  z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Please enter a valid email address."),
    phone: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit phone number."),

    // New PINCODES
    currentPincode: z
      .string()
      .regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
    permanentPincode: z
      .string()
      .regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),

    // DOB 18+ validation
    dob: z.string().refine((value) => {
      if (!value) return false;

      const dob = new Date(value);
      if (isNaN(dob.getTime())) return false;

      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();

      const hasBirthdayPassed =
        today.getMonth() > dob.getMonth() ||
        (today.getMonth() === dob.getMonth() &&
          today.getDate() >= dob.getDate());

      return age > 18 || (age === 18 && hasBirthdayPassed);
    }, "You must be at least 18 years old"),

    qualification: z.string().min(2, "Qualification is required."),
    college: z.string().min(2, "College is required."),
    currentRole: z.string().min(2, "Role is required."),
    currentCompany: z.string().min(2, "Current Company is required."),

    ctcPA: z
      .string()
      .min(1, "CTC is required")
      .refine(
        (val) => {
          const num = Number(val.replace(/,/g, ""));
          return !isNaN(num) && num > 0;
        },
        { message: "CTC must be a valid positive number" }
      )
      .refine(
        (val) => {
          const num = Number(val.replace(/,/g, ""));
          return num <= 100000000;
        },
        { message: "CTC seems unusually high" }
      ),

    position: z.string().min(2, "Position is required."),
    totalExperience: z.string().nonempty("Please select total experience."),
    onsite: z.string().nonempty("Please select an option."),
    immediately: z.string().nonempty("Please select an option."),

    noticePeriod: z
      .string()
      .nonempty("Notice Period is required.")
      .refine((val) => !isNaN(Number(val)), "Must be a number")
      .refine((val) => Number(val) >= 0, "Must be positive")
      .refine((val) => Number(val) <= 99, "Must be less than 100")
      .refine((val) => Number.isInteger(Number(val)), "Must be a whole number"),

    resumePortfolioLink: z
      .string()
      .nonempty("URL is required.")
      .url("Please enter a valid URL."),

    message: z.string().min(2, "Message must be at least 2 characters."),
  });

// Options
const EXPERIENCE_OPTIONS = [
  { label: "Fresher", value: "Fresher" },
  { label: "0-1 years", value: "0-1 years" },
  { label: "1-3 years", value: "2-4 years" },
  { label: "3-5 years", value: "3-5 years" },
  { label: "5-10 years", value: "5-10 years" },
  { label: "10+ years", value: "10+ years" },
];

const YES_NO_OPTIONS = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

// Input fields
const BASIC_FIELDS = [
  { id: "name", label: "Full Name", placeholder: "Your full name" },
  { id: "email", label: "Email", placeholder: "Your e-mail" },
  { id: "phone", label: "Phone Number", placeholder: "Your contact number" },
  // NEW DOB FIELD
  {
    id: "dob",
    label: "Date of Birth (18+)",
    inputType: "date",
    placeholder: "",
  },

  // NEW PINCODE FIELDS
  {
    id: "currentPincode",
    label: "Current Address Pincode",
    placeholder: "6-digit pincode",
  },
  {
    id: "permanentPincode",
    label: "Permanent Address Pincode",
    placeholder: "6-digit pincode",
  },


  {
    id: "qualification",
    label: "Qualification",
    placeholder: "Your qualification",
  },
  { id: "college", label: "College", placeholder: "Your college name" },
];

const WORK_FIELDS = [
  {
    id: "currentRole",
    label: "Current Role",
    placeholder: "Your current role",
  },
  {
    id: "currentCompany",
    label: "Company in which you are working currently",
    placeholder: "Your current company",
  },
  {
    id: "ctcPA",
    label: "CTC PA (in Lakhs)",
    inputType: "number",
    placeholder: "Your current CTC",
  },
  {
    id: "position",
    label: "Position you are applying for",
    placeholder: "Position you are applying for",
    disabled: true,
  },
];

const ADDITIONAL_FIELDS = [
  {
    id: "noticePeriod",
    label: "Notice Period (in days)",
    placeholder: "Notice Period",
  },
  {
    id: "resumePortfolioLink",
    label: "Share CV link OR the LinkedIn Profile link",
    inputType: "url",
    placeholder: "Your CV, or LinkedIn URL",
    className: "col-span-2"
  },
];

// Reusable input component
const InputField = React.memo(
  ({ field, register, error, inputStyle, className }) => (
    <div
      className={`flex flex-col mb-1 ${
        field.className ? field.className : "col-span-2 sm:col-span-1"
      }`}
    >
      <label className="text-[16px] font-neueMontreal leading-[120%] text-textPrimary mb-1.5">
        {field.label}
        <span className="text-[#ff2929]">*</span>
      </label>

      <input
        id={field.id}
        type={field.inputType || "text"}
        {...register(field.id)}
        placeholder={field.placeholder}
        disabled={field.disabled}
        style={inputStyle(field.id)}
        className={`px-3 py-4.5 h-14.5 border border-[#d1d1d2] rounded-[2px] text-black text-bodySmall placeholder:text-bodySmall placeholder:font-neueMontreal ${
          field.disabled ? "bg-gray-100 cursor-not-allowed opacity-70" : ""
        }`}
      />

      {error && (
        <span className="text-sm text-[#ff2929] mt-2">{error.message}</span>
      )}
    </div>
  )
);

InputField.displayName = "InputField";

// Component
function CareersContact({ jobTitle }) {
  const schema = useMemo(() => createSchema(), []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { position: jobTitle || "" },
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (jobTitle) setValue("position", jobTitle);
  }, [jobTitle, setValue]);

  useEffect(() => {
    if (showSuccess || showError) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
        setShowError(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showSuccess, showError]);

  const submitData = useCallback(
    async (data) => {
      try {
        setIsSubmitting(true);

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          formData.append(key, value);
        });

        const response = await fetch("/api/send-application", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (result.success) {
          setShowSuccess(true);
          setShowError(false);

          reset({
            name: "",
            email: "",
            phone: "",
            qualification: "",
            college: "",
            currentPincode: "",
            permanentPincode: "",
            dob: "",
            currentRole: "",
            currentCompany: "",
            totalExperience: "",
            ctcPA: "",
            onsite: "",
            immediately: "",
            noticePeriod: "",
            resumePortfolioLink: "",
            message: "",
            position: jobTitle || "",
          });
        } else {
          setShowError(true);
        }
      } catch (error) {
        setShowError(true);
      } finally {
        setIsSubmitting(false);
      }
    },
    [reset, jobTitle]
  );

  const inputStyle = useCallback(
    (fieldName) => (errors[fieldName] ? { border: "1px solid #ff2929" } : {}),
    [errors]
  );

  return (
    <form
      onSubmit={handleSubmit(submitData)}
      className="col-span-4 @6xl:col-span-2 w-full"
    >
      <div className="grid grid-cols-2 gap-x-3 md:gap-x-5 gap-y-5 md:gap-y-8">
        {BASIC_FIELDS.map((field) => (
          <InputField
            key={field.id}
            field={field}
            register={register}
            error={errors[field.id]}
            inputStyle={inputStyle}
          />
        ))}

        <CustomDropdown
          placeholder="Select total experience"
          label="Total Experience"
          options={EXPERIENCE_OPTIONS}
          value={watch("totalExperience")}
          onChange={(v) => setValue("totalExperience", v)}
          error={errors.totalExperience?.message}
        />

        {WORK_FIELDS.map((field) => (
          <InputField
            key={field.id}
            field={field}
            register={register}
            error={errors[field.id]}
            inputStyle={inputStyle}
          />
        ))}

        <CustomDropdown
          placeholder="Select"
          label="Are you ready for an on-site, full-time work?"
          options={YES_NO_OPTIONS}
          value={watch("onsite")}
          onChange={(v) => setValue("onsite", v)}
          error={errors.onsite?.message}
        />

        <CustomDropdown
          placeholder="Select"
          label="Are you able to start work immediately?"
          options={YES_NO_OPTIONS}
          value={watch("immediately")}
          onChange={(v) => setValue("immediately", v)}
          error={errors.immediately?.message}
        />

        {ADDITIONAL_FIELDS.map((field) => (
          <InputField
            key={field.id}
            field={field}
            register={register}
            error={errors[field.id]}
            inputStyle={inputStyle}
          />
        ))}

        <div className="md:col-span-2 flex flex-col col-span-2">
          <label className="text-[16px] mb-1.5 text-textPrimary font-neueMontreal ">
            What unique value will you bring?{" "}
            <span className="text-[#ff2929]">*</span>
          </label>

          <textarea
            id="message"
            rows="6"
            {...register("message")}
            style={inputStyle("message")}
            className="px-3 py-4.5 border border-[#d1d1d2] rounded-[2px] placeholder:text-bodySmall placeholder:font-neueMontreal"
            placeholder="Enter your message here..."
          />

          {errors.message && (
            <span className="text-sm text-[#ff2929] mt-2">
              {errors.message.message}
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-fit bg-primary text-white px-6 py-3 rounded-full mt-8 flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Applying...
            </>
          ) : showSuccess ? (
            "Application submitted"
          ) : (
            "Apply Now"
          )}
        </button>

        {showSuccess && (
          <div
            className="mt-8 text-green-700 cursor-pointer"
            onClick={() => setShowSuccess(false)}
          >
            Application submitted successfully. We will review and respond soon.
            ×
          </div>
        )}

        {showError && (
          <div
            className="mt-8 text-[#ff2929] cursor-pointer"
            onClick={() => setShowError(false)}
          >
            Unable to process your application. Try again later. ×
          </div>
        )}
      </div>
    </form>
  );
}

export default CareersContact;