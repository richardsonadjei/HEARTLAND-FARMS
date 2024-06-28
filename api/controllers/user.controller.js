import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import Employee from '../models/newEmployee.model.js';
import { errorHandler } from '../utils/errorHandler.js';

export const signup = async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    userName,
    phoneNumber,
    role,
    category,
    dateOfBirth, // Additional fields for the employee
    department,
    position,
    hireDate,
    salary
  } = req.body;

  const hashedPassword = bcryptjs.hashSync(password, 10);

  try {
    // Create new User document
    const newUser = new User({
      firstName,
      lastName,
      email,
      userName,
      password: hashedPassword,
      phoneNumber,
      role: Array.isArray(role) ? role : [role], // Ensure role is always an array
      categories: Array.isArray(category) ? category : [category], // Ensure categories is always an array
    });

    const savedUser = await newUser.save();

    // Create new Employee document
    const newEmployee = new Employee({
      firstName,
      lastName,
      email,
      phoneNumber,
      dateOfBirth,
      department,
      position,
      hireDate,
      salary,
      isActive: true
    });

    await newEmployee.save();

    // Simplified JSON response
    res.status(201).json({ success: true, message: 'User and Employee created successfully!' });
  } catch (error) {
    console.error('Error creating user and employee:', error);
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

    // Include userName, email, role, and categories in the token payload
    const tokenPayload = {
      id: validUser._id,
      userName: validUser.userName,
      email: validUser.email,
      role: validUser.role, // Updated role
      categories: validUser.categories, // Include categories in the token payload
    };

    // Sign the token with the updated payload
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set the token as a cookie and include userName, email, role, and categories in the response
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json({
        id: validUser._id,
        userName: validUser.userName,
        email: validUser.email,
        role: validUser.role, // Include role in the response
        categories: validUser.categories, // Include categories in the response
      });
  } catch (error) {
    next(error);
  }
};



export const signout = (req, res) => {
  // Clear the token cookie to sign the user out
  res.clearCookie('access_token', { httpOnly: true });

  // Send a response indicating successful sign out
  res.status(200).json({ success: true, message: 'User signed out successfully!' });
};


// Controller function to fetch all users
export const getAllUsers = async (req, res, next) => {
  try {
    // Query all users from the database
    const users = await User.find({});

    // Send a JSON response with the list of users
    res.status(200).json(users);
  } catch (error) {
    // Handle errors and pass them to the error handler
    console.error('Error fetching users:', error);
    next(errorHandler(500, 'Failed to fetch users.'));
  }
};





// Controller function to update a user
export const updateUser = async (req, res, next) => {
  const userId = req.params.id; // Extract user id from request params
  const updateFields = req.body; // Extract updated fields from request body

  try {
    // Find the user by id and update with new fields
    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });

    // Check if user was found and updated successfully
    if (!updatedUser) {
      return next(errorHandler(404, 'User not found.'));
    }

    // Send a JSON response with the updated user object
    res.status(200).json(updatedUser);
  } catch (error) {
    // Handle errors and pass them to the error handler
    console.error('Error updating user:', error);
    next(errorHandler(500, 'Failed to update user.'));
  }
};


// Controller function to delete a user
export const deleteUser = async (req, res, next) => {
  const userId = req.params.id; // Extract user id from request params

  try {
    // Find the user by id and delete
    const deletedUser = await User.findByIdAndDelete(userId);

    // Check if user was found and deleted successfully
    if (!deletedUser) {
      return next(errorHandler(404, 'User not found.'));
    }

    // Send a JSON response with the deleted user object
    res.status(200).json({ message: 'User deleted successfully!' });
  } catch (error) {
    // Handle errors and pass them to the error handler
    console.error('Error deleting user:', error);
    next(errorHandler(500, 'Failed to delete user.'));
  }
};



// Update username and/or password for authenticated user
export const updateUsernamePassword = async (req, res, next) => {
  const { username, password } = req.body;
  const userId = req.user.id; // Assuming req.user contains the authenticated user's details

  try {
    // Initialize an object to hold the fields to update
    const updateFields = {};

    // Check if username is provided and add to updateFields
    if (username) {
      updateFields.userName = username; // Ensure you are updating 'userName' field correctly
    }

    // Check if password is provided and hash it
    if (password) {
      const hashedPassword = bcryptjs.hashSync(password, 10);
      updateFields.password = hashedPassword;
    }

    // Update user document in the database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return next(errorHandler(404, 'User not found'));
    }

    // Generate a new JWT token with updated user details (optional)
    const token = jwt.sign({ id: updatedUser._id, username: updatedUser.userName }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Example expiration time
    });

    // Respond with success message and optionally the new token
    res.status(200).json({ success: true, message: 'Username and/or password updated successfully', token });
  } catch (error) {
    console.error('Error updating username and/or password:', error);
    next(errorHandler(500, 'Server error'));
  }
};


