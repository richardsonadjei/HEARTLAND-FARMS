import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';


export const signup = async (req, res, next) => {
  const {
    name,
    email,
    password,
    telephoneNumber,
    ghanaCardNumber,
    bankBranch,
    nextOfKinName,
    nextOfKinContact,
    nextOfKinGhanaCardNumber,
    witnessName,
    witnessContact,
    role,
    bank,
    bankAccountNumber
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
      bank, // Include bank field
      bankAccountNumber, // Include bankAccountNumber field
      nextOfKinName,
      nextOfKinContact,
      nextOfKinGhanaCardNumber,
      witnessName,
      witnessContact,
      role,
    });

    await newUser.save();
    res.status(201).json('User created successfully!');
  } catch (error) {
    console.error('Error creating user:', error);
    next(error);
  }
};



export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found!'));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
    const tokenPayload = {
      id: validUser._id,
      email: validUser.email,
      role: validUser.role,
    };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json({ id: validUser._id, email: validUser.email, role: validUser.role });
  } catch (error) {
    next(error);
  }
};


