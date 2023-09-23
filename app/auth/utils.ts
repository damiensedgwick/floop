import { Resend } from "resend";
import EmailTemplate from "@/components/marketing/email-template"

const resend = new Resend(process.env.RESEND_WELCOME_EMAIL_API_KEY);

export default async function SendWelcomeEmail(email: string) {
  try {
    return await resend.emails.send({
      from: 'Floop <no-reply@feedback-loop.io>',
      to: [email],
      subject: 'Welcome to Floop!',
      react: EmailTemplate(),
    });
  } catch (error) {
    console.log(`Error sending welcome email: ${error}`)
  }
};