import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const updateProfile = async (req, res, next) => {
  const userId = req.params.id;
  const { userName, email, password } = req.body;

  try {
    // Authentication check
    if (req.user.id !== userId) {
      return next(errorHandler(401, 'You can only update your own account!'));
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, 'User not found!'));
    }

    // Hash the password if provided
    if (password) {
      user.password = bcryptjs.hashSync(password, 10);
    }

    // Update userName and email fields
    user.userName = userName;
    user.email = email;

    // Save the updated user
    await user.save();

    // Respond with the updated user (excluding sensitive information)
    const { password: userPassword, ...rest } = user._doc;
    res.status(200).json(rest); // Changed variable name to 'rest'

  } catch (error) {
    next(error);
  }
};
