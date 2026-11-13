const bcrypt = require('bcrypt');
const User = require('../models/User');

const toPublicUser = (user) => ({
  _id: user._id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  location: user.location,
  description: user.description,
  occupation: user.occupation,
});

exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, location, description, occupation } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      location,
      description,
      occupation,
    });

    res.status(201).json(toPublicUser(user));
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json(toPublicUser(user));
  } catch (err) {
    next(err);
  }
};