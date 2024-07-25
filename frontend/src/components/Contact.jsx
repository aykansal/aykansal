import React, { useState } from "react";
import { headingClass } from "../Data";
import { databases, ID, conf } from "../backend";

function Contact({ sectionName }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [buttonText, setButtonText] = useState("Send Message");
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  function toast(message) {
    const toast = document.createElement("div");
    toast.classList.add(
      "fixed",
      "bottom-8",
      "right-10",
      "bg-slate-950",
      "text-white",
      "p-2",
      "rounded-lg",
      "shadow-lg"
    );
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSuccessMessage("");
    setIsSubmitting(true);
    setButtonText("Sending...");

    // Basic validation
    if (name === "" || email === "" || message === "") {
      setFormError("Please fill all the fields");
      setIsSubmitting(false);
      setButtonText("Send Message");
      return;
    }

    if (!validateEmail(email)) {
      toast("Please enter a valid email address");
      setFormError("Please enter a valid email address");
      setIsSubmitting(false);
      setButtonText("Send Message");
      return;
    }

    try {
      await databases.createDocument(
        conf.appwriteDBId,
        conf.appwriteCollectionId,
        ID.unique(),
        {
          name,
          email,
          message,
        }
      );
      console.log("Form submitted successfully");
      setSuccessMessage("Your message has been sent successfully!");
      setEmail("");
      setName("");
      setMessage("");
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormError("Error submitting form. Please try again.");
    } finally {
      setIsSubmitting(false);
      setButtonText("Send Message");
    }
  };

  return (
    <>
      <div id={sectionName} className={headingClass}>
        {sectionName}
      </div>
      <div className="flex flex-col gap-y-5 items-stretch justify-start">
        <h3 className="text-[1.1rem]">
          Want to have a chat? Drop me a message!
        </h3>
        <form className="flex flex-col gap-y-2" onSubmit={handleSubmit}>
          <label className="text-lg font-semibold pl-1" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={name}
            placeholder="Ayush Kansal"
            onChange={(e) => setName(e.target.value)}
            className="outline-none rounded-lg px-4 py-2"
            disabled={isSubmitting}
          />
          <label className="text-lg font-semibold pl-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="text"
            name="email"
            value={email}
            placeholder="abc@xyz.com"
            onChange={(e) => setEmail(e.target.value)}
            className="outline-none rounded-lg px-4 py-2"
            disabled={isSubmitting}
          />
          <div className="flex flex-col gap-y-2">
            <label className="text-lg font-semibold pl-1" htmlFor="message">
              Message
            </label>
            <textarea
              rows="4"
              cols="30"
              id="message"
              name="message"
              value={message}
              placeholder="Your Message"
              onChange={(e) => setMessage(e.target.value)}
              className="outline-none resize-none rounded-lg px-4 py-2"
              disabled={isSubmitting}
            />
          </div>
          {formError && (
            <div className="text-red-500 text-sm mt-2">{formError}</div>
          )}
          {successMessage && (
            <div className="text-green-500 text-sm mt-2">{successMessage}</div>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="text-start text-[1.05rem] rounded-lg py-2 mt-4 px-4 w-fit border border-teal-300 text-teal-400 hover:text-slate-950 hover:bg-teal-400 transition-all duration-200 ease-in-out"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </>
  );
}

export default Contact;
