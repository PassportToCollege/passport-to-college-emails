import express from 'express';

import EmailTransport from '../lib/email';
import { db } from '../lib/firebase';

const router = express.Router();

export default {
  get: () => {
    return router.get('/', (req, res) => {
      res.render('emails/reject-application/html', {
        subject: 'Application Reject - Emails - Passport to College',
        uid: 'Hudheudh88374yrhuhfudfduh8',
        message: 'You have strong academics. However, your family seems to be able to afford sending you to a university.'
      });
    });
  },

  send: () => {
    return router.post('/:uid', (req, res) => {
      db.collection('users')
        .doc(req.params.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const user = doc.data();

            EmailTransport.send({
              template: '../views/emails/reject-application',
              message: {
                to: user.email,
                subject: 'Your Application to Passport to College'
              },
              locals: {
                user,
                message: req.body.message
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
