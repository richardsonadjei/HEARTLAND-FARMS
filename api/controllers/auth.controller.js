import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req, res, next) => {
  const {
    name,
    email,
    password,
    telephoneNumber,
    ghanaCardNumber,
    bankBranch,
    nextOfKin,
    witness,
    role
  } = req.body;

  const hashedPassword = bcryptjs.hashSync(password, 10);

  try {
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      telephoneNumber,
      ghanaCardNumber,
      bankBranch,
      nextOfKin,
      witness,
      role
    });

    await newUser.save();
    res.status(201).json('User created successfully!');
  } catch (error) {
    next(error);
  }
};
