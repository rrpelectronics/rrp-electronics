"use client";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

function CareersContact({ jobTitle }) {
  const schema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Please enter a valid email address."),
    phone: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit phone number."),
    position: z.string().min(2, "Position is required."),
    resume: z
      .instanceof(FileList)
      .refine((files) => files.length === 1, "Please upload a resume.")
      .refine(
        (files) =>
          files.length === 1 &&
          [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ].includes(files[0].type),
        "Only PDF or DOCX files are allowed."
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      position: jobTitle || "",
    },
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const selectedFile = watch("resume");

  // Set position value when jobTitle prop changes
  React.useEffect(() => {
    if (jobTitle) {
      setValue("position", jobTitle);
    }
  }, [jobTitle, setValue]);

  const submitData = async (data) => {
    try {
      setIsSubmitting(true);
      const formData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        position: data.position,
        resume: data.resume[0].name,
      };

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        formData,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
      setShowSuccess(true);
      setShowError(false);
      reset({ position: jobTitle });

      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setShowSuccess(false);
      setShowError(true);

      setTimeout(() => setShowError(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onError = (err) => {
    return;
  };

  const inputStyle = (fieldName) =>
    errors[fieldName] ? { border: "1px solid #ff2929", color: "#808080" } : {};

  const clearFile = () => {
    setValue("resume", null);
  };

  return (
    <form
      onSubmit={handleSubmit(submitData, onError)}
      className="col-span-4 @6xl:col-span-2 w-full"
      encType="multipart/form-data"
    >
      <div className="grid grid-cols-2 gap-x-3 md:gap-x-5 gap-y-5 md:gap-y-8">
        {[
          {
            id: "name",
            label: "Full Name",
            required: true,
            placeholder: "Your Full Name",
            disabled: false,
          },
          {
            id: "email",
            label: "Email",
            required: true,
            placeholder: "Your Business Mail",
            disabled: false,
          },
          {
            id: "phone",
            label: "Phone Number",
            required: true,
            placeholder: "Your Contact Number",
            disabled: false,
          },
          {
            id: "position",
            label: "Position you are applying for",
            required: true,
            placeholder: "Position you are applying for",
            disabled: true,
          },
        ].map((field) => (
          <div
            className="flex flex-col mb-1 col-span-2 sm:col-span-1"
            key={field.id}
          >
            <label
              htmlFor={field.id}
              className="text-[16px] font-neueMontreal leading-[120%] text-textPrimary mb-1.5"
            >
              {field.label}
              <span className="text-[#ff2929]">*</span>
            </label>
            <input
              id={field.id}
              type="text"
              {...register(field.id)}
              disabled={field.disabled}
              style={inputStyle(field.id)}
              className={`px-3 py-4.5 h-14.5 border border-[#d1d1d2] rounded-[2px] text-black text-bodySmall placeholder:text-bodySmall placeholder:font-neueMontreal ${
                field.disabled
                  ? "bg-gray-100 cursor-not-allowed opacity-70"
                  : ""
              }`}
              placeholder={field.placeholder}
            />
            {errors[field.id] && (
              <span className="text-sm text-[#ff2929] leading-[100%] mt-2 font-neueMontreal">
                {errors[field.id].message}
              </span>
            )}
          </div>
        ))}
        <div className="flex flex-col mb-1 col-span-2 sm:col-span-1">
          <label
            htmlFor="resume"
            className="text-[16px] font-neueMontreal leading-[120%] text-textPrimary mb-1.5"
          >
            Upload Resume <span className="text-[#ff2929]">*</span>
          </label>
          <div className="relative">
            <input
              id="resume"
              type="file"
              accept=".pdf,.docx"
              {...register("resume")}
              // style={inputStyle("resume")}
              className="py-4.5 h-fit flex items-center rounded-[2px] text-black text-bodySmall placeholder:text-bodySmall placeholder:font-neueMontreal file:mr-4 file:py-2 file:px-2 file:rounded-full file:border-0 file:text-sm file:font-neueMontreal file:bg-transparent file:text-orange-500 hover:file:text-orange-600"
            />
            <style jsx>{`
              input[type="file"]::file-selector-button {
                background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="%23F97316"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 0115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>')
                  no-repeat center;
                background-size: 24px 24px;
                width: 24px;
                height: 24px;
                text-indent: -9999px;
                overflow: hidden;
              }
            `}</style>
          </div>
          {selectedFile && selectedFile.length > 0 && (
            <div className="flex items-center mt-2">
              <span className="text-sm text-gray-600 font-neueMontreal">
                {selectedFile[0].name}
              </span>
              <button
                type="button"
                onClick={clearFile}
                className="ml-2 text-[#ff2929] hover:text-red-900 text-lg"
                aria-label="Remove file"
              >
                ×
              </button>
            </div>
          )}
          {errors.resume && (
            <span className="text-sm text-[#ff2929] leading-[100%] mt-2 font-neueMontreal">
              {errors.resume.message}
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-fit bg-primary text-[16px] text-white px-6 py-3 rounded-full font-neueMontreal mt-8 cursor-pointer flex items-center justify-center gap-2`}
        >
          {isSubmitting ? (
            <>
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
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
            onClick={() => setShowSuccess(false)}
            className="w-fit flex justify-center items-center gap-1.5 cursor-pointer text-bodySmall leading-[120%] mt-8 text-green-700 transition-all"
          >
            Application submitted successfully. We will review and respond soon.
            <button
              type="button"
              className="text-green-700 hover:text-green-900 text-lg"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        )}

        {showError && (
          <div
            onClick={() => setShowError(false)}
            className="w-fit flex justify-center items-center gap-1.5 cursor-pointer text-bodySmall leading-[120%] mt-8 text-[#ff2929] transition-all"
          >
            Unable to process your application. Try again later.
            <button
              type="button"
              className="text-[#ff2929] hover:text-red-900 text-lg"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        )}
      </div>
    </form>
  );
}

export default CareersContact;
