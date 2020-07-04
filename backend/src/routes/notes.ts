import { Router, Request, Response } from 'express';
const router = Router();

// @route     GET api/notes
// @desc      Get all users notes
// @access    Private
router.get('/', (req: Request, res: Response) => {
  res.send('Get all notes');
});

// @route     POST api/notes
// @desc      Add new note
// @access    Private
router.post('/', (req: Request, res: Response) => {
  res.send('Add note');
});

// @route     PUT api/notes/:id
// @desc      Update note
// @access    Private
router.put('/', (req: Request, res: Response) => {
  res.send('Update note');
});

// @route     DELETE api/notes/:id
// @desc      Delete note
// @access    Private
router.delete('/', (req: Request, res: Response) => {
  res.send('Delete note');
});

export default router;
