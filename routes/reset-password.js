import express from 'express';

import EmailTransporter from '../lib/email';
import { db } from '../lib/firebase';

const router = express.Router();
const Console = console;

export default {
  get: () => {
    return router.get('/', (req, res) => {
      res.render('emails/reset-password/html', {
        subject: 'Reset Your Password - Emails - Passport to College',
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
              template: '../views/emails/reset-password',
              message: {
                to: user.email,
                subject: 'Reset Your Password - Passport to College'
              },
              locals: {
                uid: req.params.uid
              }
            }).then((info) => {
              Console.log(info);
              res.send(info);
            }).catch((error) => {
              Console.log(error);
              res.send(error);
            });
          } else {
            Console.log('No user found');
            res.send('no user found');
          }
        })
        .catch((error) => {
          Console.log(error);
          res.send(error);
        });
    });
  }
};
