import { Router } from 'express';
import Auth from '../lib/auth';
import passport from 'passport';

// BASE: /auth

let router = Router();

router.post('/local', loginWithEmail);

function loginWithEmail(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    let  error = err || info;

    if (error) {
      return res.status(401).json(error);
    } else if (!user) {
      return res.status(404).json({message: 'Something went wrong, please try again.'});
    }

    res.status(200).json({ token: Auth.signToken(user._id, user.role) });
  })(req, res, next);
}

module.exports = router;