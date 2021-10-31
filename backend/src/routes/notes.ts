import { Request, Response, Router } from 'express';
import { check, validationResult } from 'express-validator';
import _ from 'lodash';

import Note from '../database/lib/note';
import auth from '../middleware/auth';
import { INote } from '../models/note';
const router = Router();

// @route     GET api/notes
// @desc      Get all users notes
// @access    Private
router.get('/', auth, async (req: Request, res: Response) => {
  try {
    const notes = await Note.getByOwnerId(req.user?.id as number);
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/notes
// @desc      Add new note
// @access    Private
router.post(
  '/',
  [
    auth,
    check('title', 'Title is required').not().isEmpty(),
    check('color', 'Please enter a hex color').matches(
      /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/,
    ),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

      const title: string = req.body.title;
      const description: string = req.body.description;
      const color: string = req.body.color;

      const newNote = await Note.create(
        {
          title,
          description,
          color,
        },
        req.user?.id as number,
      );
      res.json(newNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  },
);

// @route     PUT api/notes/:id
// @desc      Update note
// @access    Private
router.put(
  '/:id',
  [
    auth,
    check('color', 'Please enter a hex color')
      .optional()
      .matches(/#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

      const title: string = req.body.title;
      const description: string = req.body.description;
      const color: string = req.body.color;

      const noteId = Number(req.params.id);
      const userId = req.user?.id as number;
      const newNoteFields = _.omitBy(
        {
          title,
          description,
          color,
        },
        _.isNil,
      );

      const note = await Note.getById(noteId);
      if (!note) {
        return res.status(404).json({
          message: 'Note not found',
        });
      }

      if (userId !== note.ownerId) {
        return res.status(401).json({
          message: 'Not authorized',
        });
      }

      const newNote = await Note.update(noteId, {
        ...note,
        ...newNoteFields,
      });

      res.json(newNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  },
);

// @route     DELETE api/notes/:id
// @desc      Delete note
// @access    Private
router.delete('/:id', auth, async (req: Request, res: Response) => {
  try {
    const noteId = Number(req.params.id);
    const userId = req.user?.id as number;

    const note = await Note.getById(noteId);
    if (!note) {
      return res.status(404).json({
        message: 'Note not found',
      });
    }

    if (userId !== note.ownerId) {
      return res.status(401).json({
        message: 'Not authorized',
      });
    }

    await Note.delete(noteId);
    res.json({
      message: 'Note deleted',
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/notes/:id/changeIndex
// @desc      Change index of note (and other notes)
// @access    Private
router.post(
  '/:id/changeIndex',
  [auth, check('index', 'Index is required').not().isEmpty()],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

      const noteId = Number(req.params.id);
      const userId = Number(req.user?.id);
      const index = req.body.index as number;

      const note = (await Note.getById(noteId)) as INote;

      if (userId !== note.ownerId) {
        return res.status(401).json({
          message: 'Not authorized',
        });
      }

      const newNote = await Note.updateIndex(note, index);
      res.json(newNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  },
);

export default router;
