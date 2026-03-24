// app/api/send-contact/route.js
import { NextResponse } from 'next/server';
import { sendGraphEmail } from '@/app/utils/graphMail';

export async function POST(request) {
  try {
    const formData = await request.json();

    const { name, email, phone, company, position, requestType, message } = formData;

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
              line-height: 1.6; 
              color: #333;
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
            }
            .email-container { 
              max-width: 650px; 
              margin: 0 auto; 
              background-color: #ffffff;
            }
            .header { 
              background-color: #f97316; 
              color: white; 
              padding: 32px 24px;
              text-align: left;
            }
            .header h1 { 
              margin: 0; 
              font-size: 24px;
              font-weight: 600;
              letter-spacing: -0.5px;
            }
            .header p {
              margin: 8px 0 0 0;
              font-size: 14px;
              opacity: 0.95;
            }
            .content { 
              padding: 32px 24px;
            }
            .section {
              margin-bottom: 32px;
            }
            .section-title {
              font-size: 16px;
              font-weight: 600;
              color: #111;
              margin: 0 0 16px 0;
              padding-bottom: 8px;
              border-bottom: 2px solid #f97316;
            }
            .field-row { 
              display: table;
              width: 100%;
              margin-bottom: 12px;
              border-bottom: 1px solid #e5e5e5;
              padding-bottom: 12px;
            }
            .field-row:last-child {
              border-bottom: none;
              margin-bottom: 0;
              padding-bottom: 0;
            }
            .label { 
              display: table-cell;
              font-weight: 600; 
              color: #666;
              font-size: 14px;
              width: 45%;
              padding-right: 16px;
              vertical-align: top;
            }
            .value { 
              display: table-cell;
              color: #111;
              font-size: 14px;
              word-wrap: break-word;
            }
            .value a {
              color: #f97316;
              text-decoration: none;
            }
            .message-box {
              background-color: #f9f9f9;
              border-left: 4px solid #f97316;
              padding: 16px;
              margin-top: 8px;
              border-radius: 4px;
            }
            .message-box p {
              margin: 0;
              color: #333;
              font-size: 14px;
              line-height: 1.6;
              white-space: pre-wrap;
            }
            .footer {
              background-color: #f9f9f9;
              padding: 24px;
              text-align: center;
              border-top: 1px solid #e5e5e5;
            }
            .footer p {
              margin: 0;
              font-size: 13px;
              color: #666;
            }
            @media only screen and (max-width: 600px) {
              .field-row { display: block; }
              .label, .value { display: block; width: 100%; padding-right: 0; }
              .label { margin-bottom: 4px; }
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h1>New Contact Enquiry</h1>
              <p>Type: ${requestType}</p>
            </div>
            <div class="content">
              <div class="section">
                <h2 class="section-title">Sender Details</h2>
                <div class="field-row"><div class="label">Full Name:</div><div class="value">${name}</div></div>
                <div class="field-row"><div class="label">Email Address:</div><div class="value"><a href="mailto:${email}">${email}</a></div></div>
                <div class="field-row"><div class="label">Phone Number:</div><div class="value"><a href="tel:${phone}">${phone}</a></div></div>
                ${company ? `<div class="field-row"><div class="label">Company:</div><div class="value">${company}</div></div>` : ''}
                ${position ? `<div class="field-row"><div class="label">Position:</div><div class="value">${position}</div></div>` : ''}
              </div>
              <div class="section">
                <h2 class="section-title">Enquiry Information</h2>
                <div class="field-row"><div class="label">Request Type:</div><div class="value">${requestType}</div></div>
                <div class="label">Message:</div>
                <div class="message-box"><p>${message}</p></div>
              </div>
            </div>
            <div class="footer">
              <p>This Enquiry was submitted via RRP Electronics Contact Form</p>
              <p style="margin-top: 8px; color: #999; font-size: 12px;">Received on ${new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
            </div>
          </div>
        </body>
        </html>
    `;

    // Send main Enquiry email
    await sendGraphEmail({
      to: ['info@rrpelectronics.com'],
      replyTo: email,
      subject: `New Contact Enquiry: ${requestType} - ${name}`,
      html: htmlContent,
      from: process.env.AZURE_CONTACT_SENDER_EMAIL
    });

    // Confirmation to user
    try {
      await sendGraphEmail({
        from: process.env.AZURE_CONTACT_SENDER_EMAIL,
        to: email,
        subject: 'Thank You for Reaching Out to RRP Electronics',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f5f5f5; }
              .email-container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
              .header { background-color: #f97316; color: white; padding: 32px 24px; }
              .header h1 { margin: 0; font-size: 24px; font-weight: 600; }
              .content { padding: 32px 24px; }
              .content p { margin: 0 0 16px 0; color: #333; font-size: 15px; }
              .highlight-box { background-color: #fef3e7; border-left: 4px solid #f97316; padding: 16px; margin: 24px 0; }
              .highlight-box p { margin: 0; color: #333; }
              .footer { background-color: #f9f9f9; padding: 24px; text-align: center; border-top: 1px solid #e5e5e5; }
              .footer p { margin: 0; font-size: 13px; color: #666; }
            </style>
          </head>
          <body>
            <div class="email-container">
              <div class="header"><h1>We've Received Your Enquiry</h1></div>
              <div class="content">
                <p>Dear ${name},</p>
                <p>Thank you for reaching out to RRP Electronics. We have successfully received your Enquiry regarding <strong>${requestType}</strong>.</p>
                <div class="highlight-box">
                  <p><strong>What happens next?</strong></p>
                  <p style="margin-top: 8px;">Our team is reviewing your message and we will get back to you with the information you need as soon as possible.</p>
                </div>
                <p>We appreciate your interest in RRP Electronics.</p>
                <p style="margin-top: 24px;">Best regards,<br><strong>RRP Electronics Team</strong></p>
              </div>
              <div class="footer">
                <p>RRP Electronics</p>
                <p style="margin-top: 4px; font-size: 12px; color: #999;">This is an automated confirmation email</p>
              </div>
            </div>
          </body>
          </html>
        `
      });
    } catch (e) {
      console.log('Confirmation email failed', e);
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully' });

  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
