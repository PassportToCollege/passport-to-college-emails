import express from 'express';

import EmailTransport from '../lib/email';
import { db } from '../lib/firebase';

const router = express.Router();
const Console = console;

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
                uid: req.params.uid,
                user
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
