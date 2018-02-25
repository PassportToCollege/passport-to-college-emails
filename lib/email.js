import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';
import Email from 'email-templates';

const auth = {
  auth: {
    api_key: process.env.MAILGUN_API,
    domain: process.env.MAILGUN_DOMAIN
  }
};

const Transporter = nodemailer.createTransport(mg(auth));

const EmailTransporter = new Email({
  message: { from: 'no-reply@passporttocollege.org' },
  send: true,
  transport: Transporter
});

export default EmailTransporter;
