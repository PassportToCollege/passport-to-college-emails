import express from 'express';

import EmailTransporter from '../lib/email';
import { db } from '../lib/firebase';

const router = express.Router();

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
      db.collection('user')
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
            res.json(info);
          }).catch((error) => {
            res.json(error);
          });
        })
        .catch((error) => {
          res.json(error);
        });
    });
  }
};
