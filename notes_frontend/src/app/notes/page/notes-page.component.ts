import { Component, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';;
import { NotesService } from '../../core/services/notes.service';
import { Note } from '../../core/models/note.model';
import { NotesListComponent } from '../notes-list/notes-list.component';
import { NoteEditorComponent } from '../note-editor/note-editor.component';

@Component({
  selector: 'app-notes-page',
  standalone: true,
  imports: [CommonModule, NotesListComponent, NoteEditorComponent],
  template: `
    <section class="notes-layout">
      <aside class="sidebar card" [class.hidden]="sidebarHidden()">
        <app-notes-list
          [notes]="filteredNotes()"
          [search]="search()"
          [activeId]="activeId()"
          (searchChange)="onSearch($event)"
          (create)="onCreate()"
          (select)="onSelect($event)"
          (delete)="onDelete($event)">
        </app-notes-list>
      </aside>

      <section class="editor-area">
        <app-note-editor
          [note]="activeNote()"
          (titleChange)="onTitle($event)"
          (contentChange)="onContent($event)">
        </app-note-editor>
      </section>
    </section>
  `,
  styles: [`
    .notes-layout {
      display: grid;
      grid-template-columns: var(--sidebar-width) 1fr;
      gap: 16px;
      padding: 16px;
    }
    .sidebar { height: calc(100dvh - 88px); overflow: hidden; }
    .editor-area { height: calc(100dvh - 88px); }
    @media (max-width: 900px) {
      .notes-layout {
        grid-template-columns: 1fr;
      }
      .sidebar.hidden { display: none; }
    }
  `]
})
export class NotesPageComponent {
  notes = signal<Note[]>([]);
  search = signal('');
  activeId = signal<string | null>(null);
  sidebarHidden = signal(false);

  filteredNotes = computed(() => {
    const term = this.search().trim();
    if (!term) return this.notes();
    const lower = term.toLowerCase();
    return this.notes().filter(n => n.title.toLowerCase().includes(lower) || n.content.toLowerCase().includes(lower));
  });

  activeNote = computed<Note | null>(() => {
    const id = this.activeId();
    if (!id) return null;
    return this.notes().find(n => n.id === id) || null;
  });

  constructor(
    private notesService: NotesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.notesService.getAll().subscribe(list => this.notes.set(list));
    // Sync active id with route
    effect(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id && this.notesService.exists(id)) {
        this.activeId.set(id);
      } else if (this.notes().length && !id) {
        this.activeId.set(this.notes()[0].id);
      }
    });
  }

  onSearch(term: string) { this.search.set(term); }
  onCreate() {
    const created = this.notesService.create({ title: 'New note' });
    this.router.navigate(['../', created.id], { relativeTo: this.route });
  }
  onSelect(id: string) {
    this.router.navigate(['../', id], { relativeTo: this.route });
  }
  onDelete(id: string) {
    if (this.activeId() === id) {
      // After delete, navigate to first remaining note or /notes
      if (typeof globalThis !== 'undefined') {
        (globalThis as any).setTimeout(() => {
          const remaining = this.notes();
          if (remaining.length) {
            this.router.navigate(['/notes', remaining[0].id]);
          } else {
            this.router.navigate(['/notes']);
          }
        }, 0);
      }
    }
    this.notesService.delete(id);
  }
  onTitle(title: string) {
    const id = this.activeId();
    if (id) this.notesService.update(id, { title });
  }
  onContent(content: string) {
    const id = this.activeId();
    if (id) this.notesService.update(id, { content });
  }
}
