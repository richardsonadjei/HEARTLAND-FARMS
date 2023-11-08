import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

export const updateProfile = async (req, res, next) => {
  const userId = req.params.id;
  const { userName, email } = req.body;

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
