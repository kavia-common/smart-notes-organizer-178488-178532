import { Routes } from '@angular/router';
import { ShellComponent } from './layout/shell/shell.component';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        redirectTo: 'notes',
        pathMatch: 'full'
      },
      {
        path: 'notes',
        loadChildren: () =>
          import('./notes/notes.routes').then(m => m.NOTES_ROUTES)
      }
    ]
  },
  { path: '**', redirectTo: 'notes' }
];
