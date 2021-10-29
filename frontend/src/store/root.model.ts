import { Models } from '@rematch/core';

import { auth } from './models/auth.model';
import { notes } from './models/notes.model';

export interface RootModel extends Models<RootModel> {
  auth: typeof auth;
  notes: typeof notes;
}

export const models: RootModel = {
  auth,
  notes,
};
