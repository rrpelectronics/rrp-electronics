"use client";
import React from "react";
import ContactForm from "./ContactForm";

const Contact = () => {
  return (
    <section className="@container h-fit w-full pt-25 md:pt-32 lg:pt-35 pb-10 px-3.5 md:px-5 lg:px-10 grid grid-cols-4 gap-x-3 md:gap-x-5">
      <div className="flex flex-col gap-8 col-span-4 @6xl:col-span-2 mb-10">
        <h3 className="text-display text-black tracking-display leading-[110%]">
          Let’s Build the <br /> Future Together
        </h3>
        <p className="text-bodyLarge leading-[120%] text-textPrimary font-neueMontreal lg:w-[75%] @6xl:max-w-[50%]">
          Have questions or want to collaborate? Reach out to us for business
          inquiries, partnerships, or general information.
        </p>
      </div>
      <ContactForm />
    </section>
  );
};

export default Contact;
