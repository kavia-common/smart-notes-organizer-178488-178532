import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { NotesService } from '../services/notes.service';

export const NoteExistsGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const id = route.paramMap.get('id') || '';
  const notes = inject(NotesService);
  const router = inject(Router);
  if (id && notes.exists(id)) return true;
  router.navigate(['/notes']);
  return false;
};
