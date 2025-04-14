const User = require('../Model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const messages = require('../Utilities/Message');

const register = async (req, res) => {
    const { name, email, password, alias, role } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ error: messages.AUTH.EMAIL_EXISTS});
  
      const hashPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        role: role || 'guest',
        name,
        email,
        password: hashPassword,
        alias,
      });
    
      await newUser.save();
  
      res.status(201).json({ message: messages.USER.CREATED });
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: messages.USER.REG_FAILED});
    }
  };
  
  const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                error: messages.AUTH.LOGIN_FAILED,
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: messages.AUTH.LOGIN_FAILED });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.status(200).json({
            message: messages.USER.LOGGED_IN,
            token
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            error: messages.AUTH.LOGIN_FAILED
        });
    }
};


module.exports = { register, login };
