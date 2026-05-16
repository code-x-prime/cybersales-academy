import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, role, city } = await req.json();

    // Validation
    if (!name || !email || !phone || !role) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const waPhone = phone.replace(/[\s+\-]/g, "");

    const mailOptions = {
      from: `"CyberSales Academy" <${process.env.FROM_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Enquiry: ${name} — CyberSales Academy`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#0a0f1e;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:580px;margin:0 auto;padding:24px 16px;">
    
    <!-- Header -->
    <div style="background:#101828;border-radius:10px 10px 0 0;overflow:hidden;border:1px solid rgba(0,212,255,0.2);border-bottom:none;">
      <div style="height:4px;background:linear-gradient(90deg,#00d4ff,#f5a623);"></div>
      <div style="padding:28px 32px 24px;">
        <p style="margin:0 0 4px;font-family:'Courier New',monospace;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#00d4ff;">// New Enquiry Received</p>
        <h1 style="margin:0;font-size:22px;font-weight:700;color:#eef2ff;letter-spacing:0.5px;">CyberSales Academy</h1>
        <p style="margin:6px 0 0;font-size:13px;color:#7e9ab5;">Someone just requested the program brochure</p>
      </div>
    </div>

    <!-- Details Card -->
    <div style="background:#131e30;border:1px solid rgba(0,212,255,0.2);border-top:none;border-bottom:none;padding:8px 32px;">
      
      <!-- Each field row -->
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid rgba(0,212,255,0.08);">
            <span style="font-family:'Courier New',monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#3d5068;display:block;margin-bottom:4px;">Full Name</span>
            <span style="font-size:15px;font-weight:600;color:#eef2ff;">${name}</span>
          </td>
        </tr>
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid rgba(0,212,255,0.08);">
            <span style="font-family:'Courier New',monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#3d5068;display:block;margin-bottom:4px;">Email Address</span>
            <span style="font-size:15px;font-weight:600;color:#00d4ff;">${email}</span>
          </td>
        </tr>
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid rgba(0,212,255,0.08);">
            <span style="font-family:'Courier New',monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#3d5068;display:block;margin-bottom:4px;">WhatsApp Number</span>
            <span style="font-size:15px;font-weight:600;color:#eef2ff;">${phone}</span>
          </td>
        </tr>
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid rgba(0,212,255,0.08);">
            <span style="font-family:'Courier New',monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#3d5068;display:block;margin-bottom:4px;">Current Role</span>
            <span style="font-size:15px;font-weight:600;color:#f5a623;">${role}</span>
          </td>
        </tr>
        <tr>
          <td style="padding:14px 0;">
            <span style="font-family:'Courier New',monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#3d5068;display:block;margin-bottom:4px;">City</span>
            <span style="font-size:15px;font-weight:600;color:#eef2ff;">${city || "Not Provided"}</span>
          </td>
        </tr>
      </table>
    </div>

    <!-- Action Button -->
    <div style="background:#101828;border:1px solid rgba(0,212,255,0.2);border-top:none;border-radius:0 0 10px 10px;padding:24px 32px;">
      <a href="https://wa.me/${waPhone}" 
         style="display:inline-block;background:#25d366;color:#ffffff;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:12px 28px;border-radius:6px;margin-right:12px;">
        WhatsApp Lead
      </a>
      <a href="mailto:${email}"
         style="display:inline-block;background:transparent;color:#00d4ff;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:12px 28px;border-radius:6px;border:1.5px solid rgba(0,212,255,0.4);">
        Reply via Email
      </a>
    </div>

    <!-- Footer -->
    <p style="text-align:center;margin:20px 0 0;font-family:'Courier New',monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#3d5068;">
      CYBERSALES ACADEMY · AUTOMATED NOTIFICATION · DO NOT REPLY
    </p>
  </div>
</body>
</html>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Email sent" });
  } catch (error: unknown) {
    console.error("Email Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to send email";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
