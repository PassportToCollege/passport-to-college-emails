import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';

const auth = {
  auth: {
    api_key: process.env.MAILGUN_API,
    domain: process.env.MAILGUN_DOMAIN
  }
};

const Transporter = nodemailer.createTransport(mg(auth));

export default Transporter;
