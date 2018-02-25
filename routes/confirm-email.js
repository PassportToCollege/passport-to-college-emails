import express from 'express';

import EmailTransporter from '../lib/email';
import { db } from '../lib/firebase';

const router = express.Router();

export default {
  get: () => {
    return router.get('/', (req, res) => {
      res.render('emails/confirm-email-address/html', {
        subject: 'Confirm Email Address - Emails - Passport to College',
        uid: 'Hudheudh88374yrhuhfudfduh8'
      });
    });
  },

  send: () => {
    return router.get('/:uid', (req, res) => {
      db.collection('user')
        .doc(req.params.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const user = doc.data();

            EmailTransporter.send({
              template: '../views/emails/confirm-email-address',
              message: {
                to: user.email,
                subject: 'Confirm your email address - Passport to College'
              },
              locals: {
                uid: req.params.uid
              }
            }).then((info) => {
              res.send(info);
            }).catch((error) => {
              res.send(error);
            });
          } else {
            res.send('no user found');
          }
        })
        .catch((error) => {
          res.send(error);
        });
    });
  }
};
