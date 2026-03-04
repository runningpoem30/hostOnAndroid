"use server"

import { Resend } from "resend";

// Resend allows easy sending from Next.js Server Actions.
// IMPORTANT: Please set your RESEND_API_KEY in a .env.local file, and change the 'to' address below!
const resend = new Resend(process.env.RESEND_API_KEY || "YOUR_API_KEY");

export async function sendEmailAction(formData: FormData) {
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;
  
  if (!email || !message) {
    return { success: false, error: "Email and message are required" };
  }

  try {
    const { data, error } = await resend.emails.send({
    from: "Contact Form <onboarding@resend.dev>", // Keep this as onboarding domain for testing, or use verified domain
    to: ["aryaanandpathak30@gmail.com"], // Replace with YOUR email address to receive these messages!
    replyTo: email, // This allows you to just hit "Reply" in your inbox to reply to the user!
    subject: "New Contact Form Submission",
    html: `<p>A new user wants to get in touch!</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p style="white-space: pre-wrap;">${message}</p>`
    });

    if (error) {
      console.error("Resend Error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err: any) {
    console.error("Action Error:", err);
    return { success: false, error: err.message || "Failed to send email" };
  }
}
