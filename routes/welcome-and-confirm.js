import express from 'express';

import EmailTransporter from '../lib/email';
import { db } from '../lib/firebase';

const router = express.Router();

export default {
  get: () => {
    return router.get('/', (req, res) => {
      res.render('emails/welcome-and-confirm/html', {
        subject: 'Welcome - Emails - Passport to College',
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
              template: '../views/emails/welcome-and-confirm',
              message: {
                to: user.email,
                subject: 'Welcome - Passport to College'
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
