import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('emails/confirm-email', {
    title: 'Confirm Email Address - Emails - Passport to College'
  });
});

export default router;
