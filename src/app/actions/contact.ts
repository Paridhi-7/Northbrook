"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export async function sendContactEmail(data: ContactFormData) {
  const { name, phone, email, message } = data;

  if (!name || !email || !message) {
    return { success: false, error: "Name, email, and message are required." };
  }

  try {
    await resend.emails.send({
      from: "NorthBrook Contact <onboarding@resend.dev>",
      to: "northbrook.official@gmail.com",
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #2D2D2D; background: #FAF8F5; padding: 40px; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
            .header { background: #2D2D2D; color: #FAF8F5; padding: 24px 32px; }
            .header h1 { margin: 0; font-size: 20px; letter-spacing: 2px; text-transform: uppercase; }
            .body { padding: 32px; }
            .field { margin-bottom: 20px; }
            .label { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #8B6F47; margin-bottom: 6px; display: block; }
            .value { font-size: 15px; color: #2D2D2D; line-height: 1.6; }
            .message-box { background: #F5F0E8; padding: 20px; border-radius: 4px; border-left: 3px solid #B7472A; }
            .footer { padding: 20px 32px; border-top: 1px solid #E8DFD4; font-size: 12px; color: #8B6F47; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Contact Form Submission</h1>
            </div>
            <div class="body">
              <div class="field">
                <span class="label">Name</span>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <span class="label">Email</span>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              ${phone ? `
              <div class="field">
                <span class="label">Phone</span>
                <div class="value">${phone}</div>
              </div>
              ` : ""}
              <div class="field">
                <span class="label">Message</span>
                <div class="message-box">
                  <div class="value">${message.replace(/\n/g, "<br/>")}</div>
                </div>
              </div>
            </div>
            <div class="footer">
              Sent from the NorthBrook website contact form.
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error: "Failed to send message. Please try again." };
  }
}
