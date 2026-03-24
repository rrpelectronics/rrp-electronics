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

    // DOB 18-65 validation
    dob: z
      .string()
      .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be in DD/MM/YYYY format")
      .refine((value) => {
        if (!value) return false;
        const [day, month, year] = value.split("/").map(Number);
        const dob = new Date(year, month - 1, day);
        if (isNaN(dob.getTime()) || dob.getDate() !== day || dob.getMonth() !== month - 1) return false;

        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
          age--;
        }

        return age >= 18 && age <= 65;
      }, "You must be between 18 and 65 years old"),

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
          return num <= 99;
        },
        { message: "CTC should not be more than 2 digits (Lakhs)" }
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

    resume: z.any().refine((file) => file && file instanceof File, "Please upload your resume."),
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
    label: "Date of Birth (age between 18-65)",
    inputType: "text",
    placeholder: "dd/mm/yyyy",
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
    readOnly: true,
  },
];

const ADDITIONAL_FIELDS = [
  {
    id: "noticePeriod",
    label: "Notice Period (in days)",
    placeholder: "Notice Period",
  },
];

// Reusable input component
const InputField = React.memo(
  ({ field, register, error, inputStyle, setValue }) => {
    const handleDOBChange = (e) => {
      let value = e.target.value.replace(/\D/g, "");
      if (value.length > 8) value = value.slice(0, 8);
      
      let formatted = value;
      if (value.length > 4) {
        formatted = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}`;
      } else if (value.length > 2) {
        formatted = `${value.slice(0, 2)}/${value.slice(2)}`;
      }
      
      e.target.value = formatted;
      setValue("dob", formatted, { shouldValidate: true });
    };

    const registration = field.id === "dob" 
      ? { ...register(field.id), onChange: handleDOBChange }
      : register(field.id);

    return (
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
          {...registration}
          placeholder={field.placeholder}
          readOnly={field.readOnly}
          style={inputStyle(field.id)}
          className={`px-3 py-4.5 h-14.5 border border-[#d1d1d2] rounded-[2px] text-black text-bodySmall placeholder:text-bodySmall placeholder:font-neueMontreal ${
            field.readOnly ? "bg-gray-100 cursor-not-allowed opacity-70" : ""
          }`}
        />

        {error && (
          <span className="text-sm text-[#ff2929] mt-2 font-neueMontreal">{error.message}</span>
        )}
      </div>
    );
  }
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (
        file.type !== "application/pdf" &&
        file.type !== "application/msword" &&
        file.type !==
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setShowError("Only PDF, DOC, and DOCX files are allowed.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setShowError("File size should be less than 5MB.");
        return;
      }
      setValue("resume", file, { shouldValidate: true });
      setShowError(false);
    }
  };

  const removeFile = () => {
    setValue("resume", null, { shouldValidate: true });
  };

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

        if (data.resume) {
          formData.append("resumeFile", data.resume);
        }

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
            message: "",
            position: jobTitle || "",
            resume: null
          });
        } else {
          setShowError(result.message || result.error || "Unable to process your application.");
        }
      } catch (error) {
        setShowError("An error occurred. Please try again later.");
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
            setValue={setValue}
          />
        ))}

        <CustomDropdown
          placeholder="Select total experience"
          label="Total Experience"
          options={EXPERIENCE_OPTIONS}
          value={watch("totalExperience")}
          onChange={(v) => setValue("totalExperience", v, { shouldValidate: true })}
          error={errors.totalExperience?.message}
        />

        {WORK_FIELDS.map((field) => (
          <InputField
            key={field.id}
            field={field}
            register={register}
            error={errors[field.id]}
            inputStyle={inputStyle}
            setValue={setValue}
          />
        ))}

        <CustomDropdown
          placeholder="Select"
          label="Are you ready for an on-site, full-time work?"
          options={YES_NO_OPTIONS}
          value={watch("onsite")}
          onChange={(v) => setValue("onsite", v, { shouldValidate: true })}
          error={errors.onsite?.message}
        />

        <CustomDropdown
          placeholder="Select"
          label="Are you able to start work immediately?"
          options={YES_NO_OPTIONS}
          value={watch("immediately")}
          onChange={(v) => setValue("immediately", v, { shouldValidate: true })}
          error={errors.immediately?.message}
        />

        {ADDITIONAL_FIELDS.map((field) => (
          <InputField
            key={field.id}
            field={field}
            register={register}
            error={errors[field.id]}
            inputStyle={inputStyle}
            setValue={setValue}
          />
        ))}

        <div className="md:col-span-2 flex flex-col col-span-2">
          <label className="text-[16px] mb-1.5 text-textPrimary font-neueMontreal">
            Upload Resume (PDF, DOC, and DOCX only){" "}
            <span className="text-[#ff2929]">*</span>
          </label>
          <div className="relative">
            {!watch("resume") ? (
              <div
                className={`border-2 border-dashed ${errors.resume ? 'border-[#ff2929]' : 'border-[#d1d1d2]'} rounded-[2px] p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors`}
                onClick={() => document.getElementById("resume-upload").click()}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mb-2 text-primary"
                >
                  <path
                    d="M12 16V8M12 8L9 11M12 8L15 11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 15V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-bodySmall font-neueMontreal text-gray-500">
                  Click to upload your resume (Max 5MB)
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 bg-orange-50 border border-primary rounded-[2px]">
                <div className="flex items-center gap-3">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-primary"
                  >
                    <path
                      d="M7 18H17V16H7V18ZM7 14H17V12H7V14ZM7 10H13V8H7V10ZM14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="text-bodySmall font-neueMontreal font-medium truncate max-w-[200px] md:max-w-md">
                    {watch("resume").name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  className="p-1 hover:bg-orange-100 rounded-full transition-colors"
                  aria-label="Remove file"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-primary"
                  >
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            )}
            <input
              id="resume-upload"
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          {errors.resume && (
            <span className="text-sm text-[#ff2929] mt-2 font-neueMontreal">
              {errors.resume.message}
            </span>
          )}
        </div>

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
            <span className="text-sm text-[#ff2929] mt-2 font-neueMontreal">
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
            {isSubmitting
              ? "Processing..."
              : typeof showError === "string"
                ? showError
                : "Unable to process your application. Try again later."}{" "}
            ×
          </div>
        )}
      </div>
    </form>
  );
}

export default CareersContact;