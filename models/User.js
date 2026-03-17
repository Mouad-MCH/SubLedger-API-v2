import mongoose from "mongoose";
import validator from 'validator';
import bcrypt, { hash } from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, ''],
    required: [true, 'please tell your name']
  },

  email: {
    type: String,
    unique: [true, ''],
    required: [true, 'please provide your email'],
    isLowercase: true,
    validate: [validator.isEmail, 'please enter a valid email']
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'please provide a password'],
    minlength: [6, 'the password must be more than 6 characters'],
    select: false
  },

  passwordConfirm: {
    type: String,
    require: [true, 'pleas confirm your password']
  }
});

userSchema.pre('save', async function (next) {
  // only run if password was modified
  if (!this.isModified('password')) return next()
  // hash the pass with the cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
});

// instance method: is a method that going to be available on all document on a certain collection
//candidatePassword: the provided password
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
}


const User = mongoose.model('User', userSchema);
export { User }