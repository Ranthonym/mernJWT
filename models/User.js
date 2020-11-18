cons mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 6,
    max: 15,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    required: true
  },
  todos: [{type: mongoose.Schema.Types.ObjectID, ref: 'Todo'}]
})

// password hash condition on user submission
UserSchema.pre('save', function(next){
  if(!this.isModified('password'))
    return next()
    bcrypt.hash(this.password,10, (err, passwordHash)=> {
      if(err)
        return next(err)
      this.password = passwordHash;
      next()
    });
});

// checking is user entered password matches password hash stored in db
UserSchema.methods.comparePassword = function(password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch)=> {
    if(err)
      return console(err)
    else {
      if (!isMatch)
        return cb(null, isMatch);
      return cb(null, this)
    }
  })
}