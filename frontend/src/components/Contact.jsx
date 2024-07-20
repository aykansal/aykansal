import React, { useState } from "react";
import { headingClass } from "../Data";
import { db } from "../firebase";

function Contact({ sectionName }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.prevantDefault();
    db.collection("contacts")
      .add({
        email: email,
        message: message,
      })
      .then(() =>
        alert("Message has been Submitted, I'll conatact you shortly!!")
      )
      .catch((error) => alert(error.message));
  };

  return (
    <>
      <div className={headingClass}>{sectionName}</div>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col gap-y-5 items-stretch justify-start"
      >
        <h3 className="text-[1.1rem] font -sans">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure,
          voluptates?
        </h3>
        <div className="flex flex-col gap-y-2 ">
          <label className=" text-lg font-semibold pl-1" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="abc@xyz.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="outline-none rounded-lg px-4 py-2"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label className=" text-lg font-semibold pl-1" htmlFor="message">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="4"
            placeholder="Your Message"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            className="outline-none resize-none rounded-lg px-4 py-2"
          />
        </div>
        <button
          type="submit"
          className="text-start text-[1.05rem] rounded-lg py-2 px-4 w-fit border border-teal-300 text-teal-400 hover:text-slate-950 hover:bg-teal-400 transition-all duration-200 ease-in-out"
        >
          Send Message
        </button>
      </form>
    </>
  );
}

export default Contact;
