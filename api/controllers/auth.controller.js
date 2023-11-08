import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
  const {
    name,
    email,
    password,
    userName,
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
    bankAccountNumber,
  } = req.body;

  const hashedPassword = bcryptjs.hashSync(password, 10);

  try {
    const newUser = new User({
      name,
      email,
      userName,
      password: hashedPassword,
      telephoneNumber,
      ghanaCardNumber,
      bankBranch,
      bank,
      bankAccountNumber,
      nextOfKinName,
      nextOfKinContact,
      nextOfKinGhanaCardNumber,
      witnessName,
      witnessContact,
      role,
    });

    await newUser.save();
    // Simplified JSON response
    res.status(201).json({ success: true, message: 'User created successfully!' });
  } catch (error) {
    console.error('Error creating user:', error);
    next(error);
  }
};







export const signin = async (req, res, next) => {
  const { userNameOrEmail, password } = req.body;
  try {
    // Find user by userName or email
    const validUser = await User.findOne({
      $or: [{ userName: userNameOrEmail }, { email: userNameOrEmail }],
    });

    if (!validUser) return next(errorHandler(404, 'User not found!'));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));

    // Include userName in the token payload
    const tokenPayload = {
      id: validUser._id,
      userName: validUser.userName,
      email: validUser.email,
      role: validUser.role,
    };

    // Sign the token with the updated payload
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set the token as a cookie and include userName in the response
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json({ id: validUser._id, userName: validUser.userName, email: validUser.email, role: validUser.role });
  } catch (error) {
    next(error);
  }
};



