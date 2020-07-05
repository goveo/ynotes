import { Router, Request, Response } from 'express';
import auth from '../middleware/auth';
import Note from '../database/lib/note';
const router = Router();

// @route     GET api/notes
// @desc      Get all users notes
// @access    Private
router.get('/', auth, async (req: Request, res: Response) => {
  try {
    const notes = await Note.getByOwnerId(req.user?.id as number);
    res.json(notes);
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
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
