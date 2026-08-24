import { NextResponse } from "next/server";
import { ISMAIL_DATA } from "@/data/portfolio";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, service, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields (Name, Email, Message)" },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const ismailEmail = "esmailepoo1236@gmail.com";
    const developerEmail = "ibrahimahmed172018@gmail.com";
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || ismailEmail;

    console.log(`[Contact API] Inquiry from: ${name} (${email}) | Service: ${service}`);

    let emailSent = false;

    // 1. Try sending via Resend API
    if (resendApiKey) {
      // First attempt to send to receiverEmail
      let targetEmail = receiverEmail;

      const sendViaResend = async (toAddress: string) => {
        return fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM_EMAIL || "Ismail Portfolio <onboarding@resend.dev>",
            to: [toAddress],
            reply_to: email,
            subject: `New Project Inquiry from ${name} • ${service || "Portfolio"}`,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 32px 24px; border: 1px solid #27272a; border-radius: 20px; background-color: #09090b; color: #f4f4f5;">
                
                <!-- Header -->
                <div style="border-bottom: 1px solid #27272a; padding-bottom: 20px; margin-bottom: 24px;">
                  <div style="display: inline-block; background-color: #dc2626; color: #ffffff; font-weight: 800; font-size: 11px; padding: 4px 12px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">
                    New Client Inquiry
                  </div>
                  <h2 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">
                    Ismail Mohamed — Portfolio Contact
                  </h2>
                  <p style="color: #a1a1aa; font-size: 13px; margin: 6px 0 0 0;">
                    Retina Creative Agency • Direct Client Dispatch System
                  </p>
                </div>

                <!-- Client Details Box -->
                <div style="background-color: #18181b; border: 1px solid #27272a; border-radius: 14px; padding: 20px; margin-bottom: 20px; line-height: 1.7; font-size: 14px;">
                  <p style="margin: 4px 0; color: #d4d4d8;">
                    <strong style="color: #ffffff;">Client Name:</strong> ${name}
                  </p>
                  <p style="margin: 4px 0; color: #d4d4d8;">
                    <strong style="color: #ffffff;">Client Email:</strong> 
                    <a href="mailto:${email}" style="color: #ef4444; text-decoration: none; font-weight: 600;">${email}</a>
                  </p>
                  <p style="margin: 4px 0; color: #d4d4d8;">
                    <strong style="color: #ffffff;">Discipline / Service:</strong> 
                    <span style="color: #f87171; font-weight: 600;">${service || "General Inquiry"}</span>
                  </p>
                  <p style="margin: 4px 0; color: #a1a1aa; font-size: 12px;">
                    <strong>Timestamp:</strong> ${new Date().toLocaleString("en-US", { timeZone: "Africa/Cairo" })} (Cairo Time)
                  </p>
                </div>

                <!-- Message Body -->
                <div style="background-color: #18181b; border-left: 4px solid #dc2626; border-radius: 0 14px 14px 0; padding: 20px; margin-bottom: 24px;">
                  <h4 style="margin: 0 0 10px 0; color: #ffffff; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">
                    Project Brief & Requirements:
                  </h4>
                  <div style="white-space: pre-wrap; color: #e4e4e7; font-size: 14px; line-height: 1.65;">
                    ${message}
                  </div>
                </div>

                <!-- Direct Reply CTA -->
                <div style="text-align: center; margin: 28px 0 16px 0;">
                  <a href="mailto:${email}" style="display: inline-block; background-color: #dc2626; color: #ffffff; font-weight: 700; font-size: 13px; text-decoration: none; padding: 12px 28px; border-radius: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                    Reply via Email
                  </a>
                </div>

                <!-- Footer -->
                <div style="border-top: 1px solid #27272a; padding-top: 18px; margin-top: 24px; text-align: center; color: #71717a; font-size: 12px;">
                  Ismail Mohamed Portfolio • Forwarded to ${toAddress}
                </div>
              </div>
            `,
          }),
        });
      };

      try {
        let res = await sendViaResend(targetEmail);
        let data = await res.json();

        // If Resend free tier blocks sending to external unverified email, fallback to developer's registered email
        if (!res.ok && data.statusCode === 403) {
          console.warn(`[Contact API] Resend free sandbox restricted ${targetEmail}. Fallback sending to developer email: ${developerEmail}`);
          res = await sendViaResend(developerEmail);
          data = await res.json();
        }

        if (res.ok) {
          emailSent = true;
          console.log("[Contact API] Email delivered via Resend with ID:", data.id);
        } else {
          console.error("[Contact API] Resend error:", data);
        }
      } catch (err) {
        console.error("[Contact API] Resend network error:", err);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Inquiry received successfully.",
        delivered: emailSent,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Contact API] Server error:", error);
    return NextResponse.json(
      { error: "Internal server error processing contact submission." },
      { status: 500 }
    );
  }
}
