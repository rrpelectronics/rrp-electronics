import { Client } from '@microsoft/microsoft-graph-client';
import { ConfidentialClientApplication } from '@azure/msal-node';
import 'isomorphic-fetch';

let pca = null;

async function getAccessToken() {
  if (!pca) {
    if (!process.env.AZURE_CLIENT_SECRET) {
      throw new Error('AZURE_CLIENT_SECRET is not defined');
    }
    const msalConfig = {
      auth: {
        clientId: process.env.AZURE_CLIENT_ID,
        authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}`,
        clientSecret: process.env.AZURE_CLIENT_SECRET,
      },
    };
    pca = new ConfidentialClientApplication(msalConfig);
  }

  const tokenRequest = {
    scopes: ['https://graph.microsoft.com/.default'],
  };

  try {
    const response = await pca.acquireTokenByClientCredential(tokenRequest);
    return response.accessToken;
  } catch (error) {
    console.error('Error acquiring access token:', error);
    throw error;
  }
}

interface GraphMailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
  attachments?: any[];
}

/**
 * Sends an email using Microsoft Graph API.
 */
export async function sendGraphEmail({ to, subject, html, from, replyTo, attachments }: GraphMailOptions) {
  const accessToken = await getAccessToken();

  const client = Client.init({
    authProvider: (done) => {
      done(null, accessToken);
    },
  });

  const senderEmail = from || process.env.AZURE_SENDER_EMAIL;

  if (!senderEmail) {
    throw new Error('Sender email is not defined');
  }

  // Handle 'to' as string or array
  const recipients = Array.isArray(to) ? to : [to];
  const toRecipients = recipients.map(email => ({
    emailAddress: {
      address: email.trim()
    }
  }));

  const mailMessage: any = {
    message: {
      subject: subject,
      body: {
        contentType: 'HTML',
        content: html,
      },
      toRecipients: toRecipients,
      from: {
        emailAddress: {
          address: senderEmail,
        },
      },
      attachments: attachments ? attachments.map(att => ({
        "@odata.type": "#microsoft.graph.fileAttachment",
        name: att.name,
        contentType: att.contentType,
        contentBytes: att.contentBytes,
      })) : [],
    },
    saveToSentItems: 'true',
  };

  if (replyTo) {
    mailMessage.message.replyTo = [
       {
         emailAddress: {
           address: replyTo,
         },
       },
    ];
  }

  try {
    const res = await client.api(`/users/${senderEmail}/sendMail`).post(mailMessage);
    return res;
  } catch (error) {
    console.error('Error sending email via Graph API:', error);
    if (error.body) {
      console.error('Error body:', JSON.stringify(JSON.parse(error.body), null, 2));
    }
    throw error;
  }
}
