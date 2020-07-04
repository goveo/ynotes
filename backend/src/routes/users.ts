import { Router, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import Database from '../database';
const { User } = Database;

const router = Router();

// @route     POST api/users
// @desc      Register a user
// @access    Public
router.post('/', [
  check('username', 'username is required').not().isEmpty(),
  check('password', 'Please enter password with 6 or more characters').isLength({ min: 6 }),
], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { username, password } = req.body;

  try {
    const user = await User.getByUsername(username);
    if (user) {
      return res.status(400).json({
        message: `User with username '${username}' already exist`,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = {
      username,
      password: hashedPassword,
    };
    await User.create(newUser);
    res.send(newUser);
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

export default router;
