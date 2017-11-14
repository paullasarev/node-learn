import { find } from 'lodash';
export const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');

export function passwordInit(users) {
  passport.use(new LocalStrategy({
    usernameField: 'login', 
    passwordField : 'password', 
  },
    function(username, password, done) {
      const el = find(users, {login: username, password});
      console.log('LocalStrategy', username, password, el)
      if (el) {
        return done(null, el);
      } else {
        done(null, false)
      } 
    }
  ));

  passport.serializeUser(function(user, done) {
    console.log('serialize', user)
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    const el = find(users, {id});
    console.log('deserialize', user, el)
    done(null, el);
  });
}

export function passwordAuthenticate() {
  return passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
   });
}