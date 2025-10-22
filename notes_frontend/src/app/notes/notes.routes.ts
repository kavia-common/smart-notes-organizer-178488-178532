import { Routes } from '@angular/router';
import { NotesPageComponent } from './page/notes-page.component';
import { NoteExistsGuard } from '../core/guards/note-exists.guard';

export const NOTES_ROUTES: Routes = [
  {
    path: '',
    component: NotesPageComponent
  },
  {
    path: ':id',
    component: NotesPageComponent,
    canActivate: [NoteExistsGuard]
  }
];
