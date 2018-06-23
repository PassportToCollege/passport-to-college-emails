import express from 'express';

import EmailTransporter from '../lib/email';
import { db } from '../lib/firebase';

const router = express.Router();
const Console = console;

export default {
  get: () => {
    return router.get('/', (req, res) => {
      res.render('emails/share-story/html', {
        subject: 'A Very Big Story - Passport to College',
        post_id: 'Hudheudh88374yrhuhfudfduh8',
        title: 'Kitty',
        excerpt: 'American shorthair siamese. Balinese persian tomcat so munchkin but lynx bombay yet tiger. Russian blue. American bobtail cheetah and jaguar and donskoy puma. Jaguar grimalkin and jaguar for sphynx abyssinian ocelot but cougar. Tabby.',
        sharedBy: 'Orlando'
      });
    });
  },

  send: () => {
    return router.post('/:post_id', (req, res) => {
      const { sharedBy, emails } = req.body;

      db.collection('posts')
        .doc(req.params.post_id)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            const post = snapshot.data();

            EmailTransporter.send({
              template: '../views/emails/share-story',
              message: {
                to: emails,
                subject: 'Awesome Story Enclosed - Passport to College'
              },
              locals: {
                sharedBy,
                post_id: req.params.post_id,
                title: post.title,
                excerpt: post.excerpt
              }
            }).then((info) => {
              Console.log(info);
              res.send(info);
            }).catch((error) => {
              Console.log(error);
              res.send(error);
            });
          } else {
            Console.log('no post found');
            res.send({ message: 'no post found' });
          }
        })
        .catch((error) => {
          Console.log(error);
          res.send(error);
        });
    });
  }
};
