"use client";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

function ContactForm() {
  const schema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Please enter a valid email address."),
    phone: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit phone number."),
    company: z.string().min(2, "Company Name must be at least 2 characters."),
    // position: z.string().min(2, "Company Name must be at least 2 characters."),
    requestType: z.string().nonempty("Please select request type."),
    message: z.string().min(2, "Name must be at least 2 characters."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitData = async (data) => {
    try {
      setIsSubmitting(true); // Start loader
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        data,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
      setShowSuccess(true);
      setShowError(false);
      reset();

      // Auto-hide after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setShowSuccess(false);
      setShowError(true);

      // Optional: auto-hide error as well
      setTimeout(() => setShowError(false), 5000);
    } finally {
      setIsSubmitting(false); // Stop loader
    }
  };

  const onError = (err) => {
    return;
  };

  const inputStyle = (fieldName) =>
    errors[fieldName] ? { border: "1px solid #ff2929", color: "#808080" } : {};

  return (
    <form
      onSubmit={handleSubmit(submitData, onError)}
      className="col-span-4 @6xl:col-span-2 w-full"
    >
      <div className="grid grid-cols-2 gap-x-3 md:gap-x-5 gap-y-5 md:gap-y-8">
        {[
          {
            id: "name",
            label: "Full Name",
            required: true,
            placeholder: "Your Full Name",
          },
          {
            id: "email",
            label: "Email",
            required: true,
            placeholder: "Your Business Mail",
          },
          {
            id: "phone",
            label: "Phone Number",
            required: true,
            placeholder: "Your Contact Number",
          },
          {
            id: "company",
            label: "Company",
            required: true,
            placeholder: "Your Company Name",
          },
        ].map((field) => (
          <div
            className="flex flex-col mb-1 col-span-2 md:col-span-1"
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
              style={inputStyle(field.id)}
              className="px-3 py-4.5 h-13.5 border border-[#d1d1d2] rounded-[2px] text-black text-bodySmall placeholder:text-bodySmall placeholder:font-neueMontreal"
              placeholder={field.placeholder}
            />
            {errors[field.id] && (
              <span className="text-sm text-[#ff2929] leading-[100%] mt-2 font-neueMontreal">
                {errors[field.id].message}
              </span>
            )}
          </div>
        ))}

        <div className="flex flex-col mb-1 col-span-2 md:col-span-1">
          <label
            htmlFor="position"
            className="text-[16px] font-neueMontreal leading-[120%] text-textPrimary mb-1.5"
          >
            Position
          </label>
          <input
            id="position"
            type="text"
            {...register("position")}
            style={inputStyle("position")}
            className="px-3 py-4.5 h-13.5 border border-[#d1d1d2] rounded-[2px] text-black text-bodySmall placeholder:text-bodySmall placeholder:font-neueMontreal"
            placeholder="Enter Position"
          />
        </div>

        <div
          className={`mb-1 custom-select-wrapper relative flex flex-col col-span-2 md:col-span-1`}
        >
          <label
            htmlFor="requestType"
            className="text-[16px] font-neueMontreal leading-[120%] text-textPrimary mb-1.5"
          >
            How could we assist you
            <span className="text-[#ff2929]">*</span>
          </label>
          <select
            id="requestType"
            {...register("requestType")}
            style={inputStyle("requestType")}
            className="px-3 py-4.5 h-13.5 border border-[#d1d1d2] rounded-[2px] text-textPrimary text-bodySmall font-neueMontreal leading-[120%]"
          >
            <option value="">Select</option>
            <option value="Technology Partnership">
              Technology Partnership
            </option>
            <option value="Production Supplies">Production Supplies</option>
            <option value="Media Enquiries">Media Enquiries</option>
            <option value="Career Opportunities">Career Opportunities</option>
          </select>
          {errors.requestType ? (
            <span className="text-sm text-[#ff2929] leading-[100%] mt-2 font-neueMontreal">
              {errors.requestType.message}
            </span>
          ) : (
            <span className="opacity-0 h-5"></span>
          )}
        </div>

        <div
          className={`md:col-span-2 flex flex-col col-span-2 ${
            errors.requestType ? "mt-0" : "-mt-4"
          }`}
        >
          <label
            htmlFor="message"
            className="text-[16px] font-neueMontreal leading-[120%] text-textPrimary mb-1.5"
          >
            Message<span className="text-[#ff2929]">*</span>
          </label>
          <textarea
            id="message"
            rows="6"
            {...register("message")}
            style={inputStyle("message")}
            className="px-3 py-4.5 border border-[#d1d1d2] rounded-[2px] text-black text-bodySmall placeholder:text-bodySmall placeholder:font-neueMontreal"
            placeholder="Enter your message here..."
          ></textarea>
          {errors.message && (
            <span className="text-sm text-[#ff2929] leading-[100%] mt-2 font-neueMontreal">
              {errors.message.message}
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
              Submitting...
            </>
          ) : (
            showSuccess ? "Submitted Successfully" : "Submit"
          )}
        </button>
        {showSuccess && (
          <div
            onClick={() => setShowSuccess(false)}
            className="w-fit flex justify-center items-center gap-1.5 cursor-pointer text-bodySmall leading-[120%] mt-8 text-green-700 transition-all"
          >
            Message sent successfully!
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
            className="w-fit flex justify-center items-center gap-1.5 cursor-pointer text-bodySmall leading-[120%] mt-8 text-[#ff2929]  transition-all"
          >
            Failed to send message.
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

export default ContactForm;
