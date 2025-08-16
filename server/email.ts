import sgMail from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY environment variable must be set");
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
}

export async function sendContactEmail(formData: ContactFormData): Promise<boolean> {
  try {
    const emailContent = {
      to: 'aliyaanmohd42@gmail.com',
      from: 'aliyaanmohd42@gmail.com', // Use your verified email as sender
      subject: `Portfolio Contact: ${formData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #8b45c7; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #8b45c7;">Contact Details:</h3>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ''}
            <p><strong>Subject:</strong> ${formData.subject}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #8b45c7;">Message:</h3>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; border-left: 4px solid #8b45c7;">
              ${formData.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
            <p>This email was sent from your portfolio contact form.</p>
            <p>Sent at: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${formData.name}
        Email: ${formData.email}
        ${formData.phone ? `Phone: ${formData.phone}` : ''}
        Subject: ${formData.subject}
        
        Message:
        ${formData.message}
        
        Sent at: ${new Date().toLocaleString()}
      `
    };

    await sgMail.send(emailContent);
    console.log('Contact email sent successfully');
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}