import express from 'express';

import EmailTransporter from '../lib/email';
import { db } from '../lib/firebase';

const router = express.Router();

export default {
  get: () => {
    return router.get('/', (req, res) => {
      res.render('emails/application-submitted-applicant/html', {
        subject: 'Application Submitted - Emails - Passport to College',
        uid: 'Hudheudh88374yrhuhfudfduh8'
      });
    });
  },

  send: () => {
    return router.get('/:uid', (req, res) => {
      db.collection('users')
        .doc(req.params.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const user = doc.data();

            EmailTransporter.send({
              template: '../views/emails/application-submitted-applicant',
              message: {
                to: user.email,
                subject: 'Your application has been submitted - Passport to College'
              },
              locals: {
                uid: req.params.uid
              }
            }).then((info) => {
              res.json(info);
            }).catch((error) => {
              res.json(error);
            });
          } else {
            res.json({ error: 'no user found' });
          }
        })
        .catch((error) => {
          res.json(error);
        });
    });
  }
};
