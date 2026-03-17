import mongoose from "mongoose";

const restrictTo = (...roles) => {
  //["admin"]=req.user.role="user"
  return (req, res, next) => {
    console.log(req.user.role);
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'fail',
        message: 'you do not have the permission for this action'
      })
    }
    next();
  }
};

export {
  restrictTo
}