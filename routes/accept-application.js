import express from 'express';

import EmailTransport from '../lib/email';
import { db } from '../lib/firebase';

const router = express.Router();

export default {
  get: () => {
    return router.get('/', (req, res) => {
      res.render('emails/accept-application/html', {
        subject: 'Application Accepted - Emails - Passport to College',
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

            EmailTransport.send({
              template: '../views/emails/accept-application',
              message: {
                to: user.email,
                subject: 'Congratulations! Your Passport to College Application was Accepted'
              },
              locals: {
                user
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
