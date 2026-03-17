
import jwt, { decode } from 'jsonwebtoken';
import { User } from "../models/User.js";
import { json } from 'express';

const signinToken = function (id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRED_IN
  })
}

const signup = async (req, res) => {
  try {
    // const newUser = await User.create(req.body);
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm
    });

    const token = signinToken(newUser._id)
    console.log(token);
    res.status(202).json({
      status: 'success',
      message: 'the user has been created successfully',
      token,
      data: {
        user: newUser,
      }
    })
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: 'fail',
      message: err.message
    })
  }
}

const login = async (req, res, next) => {
  try {
    // 1) check the password and email exist
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({
        status: 'fail',
        message: 'please provide an email and password'
      });
    };
    //2) check if the user exist && password is correct
    //Find a user with this email and include the password field even though it is normally hidden.
    const user = await User.findOne({ email }).select('+password');
    const correct = await user.correctPassword(password, user.password);
    console.log(correct);
    if (!user || !correct) {
      return res.status(401).json({
        status: 'fail',
        message: 'incorrect email or password!'
      });
    };
    //3) if everting is ok send token to the client
    const token = signinToken(user._id);

    res.status(200).json({
      status: 'success',
      token
    });

  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
}

const protect = async (req, res, next) => {
  let token, decoded
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return res.status(401).json({
      status: 'fail',
      message: 'you are not logged in! please log-in to get access'
    })
  }

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  } catch (err) {
    return res.status(401).json({
      status: 'fail',
      message: 'invalid token please log-in again'
    })
  }
  console.log(decoded);
  const freshUser = await User.findById(decoded.id)
  if (!freshUser) {
    return res.status(401).json({
      status: 'fail',
      message: 'the user belonging to token does no longer exist'
    })
  }
  req.user = freshUser;
  console.log(req.user);
  next()
}
export { signup, login, protect }