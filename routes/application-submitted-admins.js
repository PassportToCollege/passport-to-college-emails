import express from 'express';

import EmailTransporter from '../lib/email';
import { db } from '../lib/firebase';

const router = express.Router();
const Console = console;

export default {
  get: () => {
    return router.get('/', (req, res) => {
      res.render('emails/application-submitted-admins/html', {
        subject: 'Application Received - Emails - Passport to College',
        uid: 'Hudheudh88374yrhuhfudfduh8'
      });
    });
  },

  send: () => {
    return router.get('/:uid', (req, res) => {
      db.collection('users')
        .where('isAdmin', '==', true)
        .get()
        .then((docs) => {
          const emails = [];

          docs.forEach((doc) => {
            const admin = doc.data();
            emails.push(admin.email);
          });

          EmailTransporter.send({
            template: '../views/emails/application-submitted-admins',
            message: {
              to: emails,
              subject: 'New application - Passport to College'
            },
            locals: {
              uid: req.params.uid
            }
          }).then((info) => {
            Console.log(info);
            res.json(info);
          }).catch((error) => {
            Console.log(error);
            res.json(error);
          });
        })
        .catch((error) => {
          Console.log(error);
          res.json(error);
        });
    });
  }
};
