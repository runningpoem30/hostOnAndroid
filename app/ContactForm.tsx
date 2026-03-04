"use client";

import { useState } from "react";
import { sendEmailAction } from "./actions";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    
    const formData = new FormData(e.currentTarget);
    const result = await sendEmailAction(formData);
    
    if (result.success) {
      setStatus("success");
      // Reset the form manually
      const form = e.target as HTMLFormElement;
      form.reset();
    } else {
      setStatus("error");
      setErrorMessage(result.error || "Failed to send");
    }
  };

  return (
    <div className="w-full max-w-xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full mb-3">
        <input 
          type="email" 
          name="email"
          placeholder="Your email address..." 
          required
          disabled={status === "loading" || status === "success"}
          className="bg-[#0a0a0a] border border-neutral-800 focus:border-neutral-500 text-white px-5 py-4 w-full rounded-lg outline-none transition-colors font-mono text-sm placeholder:text-neutral-600 disabled:opacity-50"
        />
        <textarea
          name="message"
          placeholder="Drop your message here to get in touch..."
          required
          rows={4}
          disabled={status === "loading" || status === "success"}
          className="bg-[#0a0a0a] border border-neutral-800 focus:border-neutral-500 text-white px-5 py-4 w-full rounded-lg outline-none transition-colors font-mono text-sm placeholder:text-neutral-600 disabled:opacity-50 resize-none"
        ></textarea>
        <button 
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="bg-[#ededed] hover:bg-white text-black font-medium px-6 py-4 rounded-lg transition-colors w-full flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {status === "loading" ? "Sending..." : status === "success" ? "Sent!" : "Send Message"}
          {status !== "loading" && status !== "success" && <span>→</span>}
        </button>
      </form>
      
      {status === "success" && (
        <p className="text-sm text-green-400 font-mono">Message sent successfully! I'll be in touch.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-500 font-mono">
          {errorMessage === "Missing API key. Pass it to the constructor `new Resend(\"re_123\")`" 
            ? "Server Error: Missing RESEND_API_KEY." 
            : errorMessage}
        </p>
      )}
    </div>
  );
}
