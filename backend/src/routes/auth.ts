import { Router, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Database from '../database';
import { JWT_SECRET } from '../app.config';
import auth from '../middleware/auth';
const { User } = Database;
const router = Router();

// @route     GET api/auth
// @desc      Get logged in user
// @access    Private
router.get('/', auth, async (req: Request, res: Response) => {
  try {
    const id = req.user?.id as number;
    const user = await User.getById(id);
    delete user?.password;
    res.json(user);
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/auth
// @desc      Auth user and get token
// @access    Public
router.post('/', [
  check('username', 'Username is required').exists(),
  check('password', 'Password is required').exists(),
], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const username: string = req.body.username;
    const password: string = req.body.password;

    const user = await User.getByUsername(username);
    if (!user) {
      return res.status(400).json({
        message: 'Invalid credentials',
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({
        message: 'Invalid credentials',
      });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, JWT_SECRET, {
      expiresIn: 60 * 60, // 1 hour
    }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

export default router;
