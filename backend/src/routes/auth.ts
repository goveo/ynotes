import { Router, Request, Response } from 'express';
const router = Router();

// @route     GET api/auth
// @desc      Get logged in user
// @access    Private
router.get('/', (req: Request, res: Response) => {
  res.send('Get logged user');
});

// @route     POST api/auth
// @desc      Auth user and get token
// @access    Public
router.post('/', (req: Request, res: Response) => {
  res.send('Log in user');
});

export default router;
