import express from 'express';

import EmailTransport from '../lib/email';
import { db } from '../lib/firebase';

const router = express.Router();
const Console = console;

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
