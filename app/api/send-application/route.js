// app/api/send-application/route.js
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Parse form data
    const formData = await request.formData();
    
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const dob = formData.get('dob');
    const currentPincode = formData.get('currentPincode');
    const permanentPincode = formData.get('permanentPincode');
    const qualification = formData.get('qualification');
    const college = formData.get('college');
    const totalExperience = formData.get('totalExperience');
    const currentRole = formData.get('currentRole');
    const currentCompany = formData.get('currentCompany');
    const ctcPA = formData.get('ctcPA');
    const position = formData.get('position');
    const onsite = formData.get('onsite');
    const immediately = formData.get('immediately');
    const noticePeriod = formData.get('noticePeriod');
    const resumePortfolioLink = formData.get('resumePortfolioLink');
    const message = formData.get('message');

    // Validate required fields
    if (!name || !email || !phone || !position) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify connection before sending
    try {
      await transporter.verify();
    } catch (verifyError) {
      return NextResponse.json(
        { success: false, message: 'Email service configuration error' },
        { status: 500 }
      );
    }

    // Prepare email content
    const mailOptions = {
      from: `"Job Applications" <${process.env.EMAIL_USER}>`,
      to: 'hr@rrpelectronics.com',
      replyTo: email,
      subject: `New Job Application: ${position} - ${name}`,
      html: `
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
            .value a:hover {
              text-decoration: underline;
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
              .field-row {
                display: block;
              }
              .label, .value {
                display: block;
                width: 100%;
                padding-right: 0;
              }
              .label {
                margin-bottom: 4px;
              }
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h1>New Job Application Received</h1>
              <p>Position: ${position}</p>
            </div>
            
            <div class="content">
              <!-- Personal Information -->
              <div class="section">
                <h2 class="section-title">Personal Information</h2>
                <div class="field-row">
                  <div class="label">Full Name:</div>
                  <div class="value">${name}</div>
                </div>
                <div class="field-row">
                  <div class="label">Email Address:</div>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
                </div>
                <div class="field-row">
                  <div class="label">Phone Number:</div>
                  <div class="value"><a href="tel:${phone}">${phone}</a></div>
                </div>
                ${dob ? `
                <div class="field-row">
                  <div class="label">Date of Birth:</div>
                  <div class="value">${new Date(dob).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                </div>
                ` : ''}
                ${currentPincode ? `
                <div class="field-row">
                  <div class="label">Current Address Pincode:</div>
                  <div class="value">${currentPincode}</div>
                </div>
                ` : ''}
                ${permanentPincode ? `
                <div class="field-row">
                  <div class="label">Permanent Address Pincode:</div>
                  <div class="value">${permanentPincode}</div>
                </div>
                ` : ''}
              </div>

              <!-- Educational Background -->
              <div class="section">
                <h2 class="section-title">Educational Background</h2>
                <div class="field-row">
                  <div class="label">Qualification:</div>
                  <div class="value">${qualification || 'Not provided'}</div>
                </div>
                <div class="field-row">
                  <div class="label">College:</div>
                  <div class="value">${college || 'Not provided'}</div>
                </div>
              </div>

              <!-- Professional Experience -->
              <div class="section">
                <h2 class="section-title">Professional Experience</h2>
                <div class="field-row">
                  <div class="label">Current Role:</div>
                  <div class="value">${currentRole || 'Not provided'}</div>
                </div>
                <div class="field-row">
                  <div class="label">Current Company:</div>
                  <div class="value">${currentCompany || 'Not provided'}</div>
                </div>
                <div class="field-row">
                  <div class="label">Total Experience:</div>
                  <div class="value">${totalExperience || 'Not provided'}</div>
                </div>
                <div class="field-row">
                  <div class="label">Current CTC (PA):</div>
                  <div class="value">${ctcPA ? `₹${ctcPA} Lakhs` : 'Not provided'}</div>
                </div>
              </div>

              <!-- Application Details -->
              <div class="section">
                <h2 class="section-title">Application Details</h2>
                <div class="field-row">
                  <div class="label">Position Applied For:</div>
                  <div class="value"><strong>${position}</strong></div>
                </div>
                <div class="field-row">
                  <div class="label">Ready for On-site Full-time:</div>
                  <div class="value">${onsite || 'Not provided'}</div>
                </div>
                <div class="field-row">
                  <div class="label">Can Start Immediately:</div>
                  <div class="value">${immediately || 'Not provided'}</div>
                </div>
                <div class="field-row">
                  <div class="label">Notice Period:</div>
                  <div class="value">${noticePeriod ? `${noticePeriod} days` : 'Not provided'}</div>
                </div>
                <div class="field-row">
                  <div class="label">CV / LinkedIn Profile:</div>
                  <div class="value">${resumePortfolioLink ? `<a href="${resumePortfolioLink}" target="_blank">${resumePortfolioLink}</a>` : 'Not provided'}</div>
                </div>
              </div>

              <!-- Candidate Message -->
              ${message ? `
              <div class="section">
                <h2 class="section-title">What Unique Value Will They Bring?</h2>
                <div class="message-box">
                  <p>${message}</p>
                </div>
              </div>
              ` : ''}
            </div>

            <div class="footer">
              <p>This application was submitted via RRP Electronics Career Portal</p>
              <p style="margin-top: 8px; color: #999; font-size: 12px;">
                Received on ${new Date().toLocaleDateString('en-IN', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
New Job Application

PERSONAL INFORMATION
--------------------
Name: ${name}
Email: ${email}
Phone: ${phone}
Date of Birth: ${dob ? new Date(dob).toLocaleDateString('en-IN') : 'Not provided'}
Current Pincode: ${currentPincode || 'Not provided'}
Permanent Pincode: ${permanentPincode || 'Not provided'}

EDUCATIONAL BACKGROUND
---------------------
Qualification: ${qualification || 'Not provided'}
College: ${college || 'Not provided'}

PROFESSIONAL EXPERIENCE
----------------------
Current Role: ${currentRole || 'Not provided'}
Current Company: ${currentCompany || 'Not provided'}
Total Experience: ${totalExperience || 'Not provided'}
Current CTC: ${ctcPA ? `₹${ctcPA} Lakhs PA` : 'Not provided'}

APPLICATION DETAILS
------------------
Position Applied For: ${position}
Ready for On-site Full-time: ${onsite || 'Not provided'}
Can Start Immediately: ${immediately || 'Not provided'}
Notice Period: ${noticePeriod ? `${noticePeriod} days` : 'Not provided'}
CV / LinkedIn: ${resumePortfolioLink || 'Not provided'}

CANDIDATE MESSAGE
----------------
${message || 'No message provided'}

---
Submitted: ${new Date().toLocaleString('en-IN')}
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.messageId);

    // Send confirmation email to applicant
    try {
      await transporter.sendMail({
        from: `"RRP Electronics" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Application Received: ${position}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
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
                max-width: 600px; 
                margin: 0 auto; 
                background-color: #ffffff;
              }
              .header { 
                background-color: #f97316; 
                color: white; 
                padding: 32px 24px;
              }
              .header h1 { 
                margin: 0; 
                font-size: 24px;
                font-weight: 600;
              }
              .content { 
                padding: 32px 24px;
              }
              .content p {
                margin: 0 0 16px 0;
                color: #333;
                font-size: 15px;
              }
              .highlight-box {
                background-color: #fef3e7;
                border-left: 4px solid #f97316;
                padding: 16px;
                margin: 24px 0;
              }
              .highlight-box p {
                margin: 0;
                color: #333;
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
            </style>
          </head>
          <body>
            <div class="email-container">
              <div class="header">
                <h1>Thank You for Your Application!</h1>
              </div>
              
              <div class="content">
                <p>Dear ${name},</p>
                
                <p>We have successfully received your application for the position of <strong>${position}</strong>.</p>
                
                <div class="highlight-box">
                  <p><strong>What happens next?</strong></p>
                  <p style="margin-top: 8px;">Our HR team will carefully review your application and get back to you within 5-7 business days.</p>
                </div>
                
                <p>We appreciate your interest in joining RRP Electronics and look forward to learning more about your qualifications.</p>
                
                <p style="margin-top: 24px;">Best regards,<br><strong>RRP Electronics HR Team</strong></p>
              </div>

              <div class="footer">
                <p>RRP Electronics</p>
                <p style="margin-top: 4px; font-size: 12px; color: #999;">This is an automated confirmation email</p>
              </div>
            </div>
          </body>
          </html>
        `,
      });
    } catch (confirmError) {
      console.log('⚠️ Could not send confirmation email:', confirmError.message);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Application sent successfully',
      messageId: info.messageId 
    });

  } catch (error) {
    console.error('❌ Error in send-application API:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      command: error.command
    });

    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to send application',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS(request) {
  return NextResponse.json({}, { status: 200 });
}