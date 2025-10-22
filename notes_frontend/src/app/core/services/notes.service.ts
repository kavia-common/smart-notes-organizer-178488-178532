import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Note } from '../models/note.model';
import { StorageService } from './storage.service';
import { generateId } from '../utils/id.util';

const STORAGE_KEY = 'smart-notes-v1';

@Injectable({ providedIn: 'root' })
export class NotesService {
  private readonly notes$ = new BehaviorSubject<Note[]>(this.loadInitial());

  constructor(private storage: StorageService) {
    this.notes$.subscribe(list => this.storage.set(STORAGE_KEY, list));
  }

  private loadInitial(): Note[] {
    const data = this.storage.get<Note[]>(STORAGE_KEY, []);
    if (!data || !Array.isArray(data) || data.length === 0) {
      const now = Date.now();
      const initial: Note[] = [{
        id: generateId(),
        title: 'Welcome to Smart Notes',
        content: 'Start typing your thoughts here. This app supports a markdown-friendly textarea.',
        createdAt: now,
        updatedAt: now
      }];
      this.storage.set(STORAGE_KEY, initial);
      return initial;
    }
    return data;
  }

  // PUBLIC_INTERFACE
  /** Observable of all notes, sorted by updatedAt desc. */
  getAll(): Observable<Note[]> {
    return this.notes$.asObservable().pipe(
      map(list => [...list].sort((a, b) => b.updatedAt - a.updatedAt))
    );
  }

  // PUBLIC_INTERFACE
  /** Get one note by id as observable. */
  getById(id: string): Observable<Note | undefined> {
    return this.getAll().pipe(map(list => list.find(n => n.id === id)));
  }

  // PUBLIC_INTERFACE
  /** Create a new note with optional initial data. */
  create(partial?: Partial<Note>): Note {
    const now = Date.now();
    const note: Note = {
      id: generateId(),
      title: partial?.title?.trim() || 'Untitled',
      content: partial?.content || '',
      createdAt: now,
      updatedAt: now
    };
    const list = [note, ...this.notes$.value];
    this.notes$.next(list);
    return note;
  }

  // PUBLIC_INTERFACE
  /** Update a note fields and bump updatedAt. */
  update(id: string, changes: Partial<Note>): void {
    const list = this.notes$.value.map(n => {
      if (n.id !== id) return n;
      return {
        ...n,
        ...changes,
        title: (changes.title ?? n.title).trim(),
        updatedAt: Date.now()
      };
    });
    this.notes$.next(list);
  }

  // PUBLIC_INTERFACE
  /** Delete a note by id. */
  delete(id: string): void {
    const list = this.notes$.value.filter(n => n.id !== id);
    this.notes$.next(list);
  }

  // PUBLIC_INTERFACE
  /** Simple client-side search in title/content. */
  search(term: string): Observable<Note[]> {
    const q = term.trim().toLowerCase();
    if (!q) return this.getAll();
    return this.getAll().pipe(
      map(list =>
        list.filter(n =>
          n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
        )
      )
    );
  }

  // PUBLIC_INTERFACE
  /** Check if a note exists by id. */
  exists(id: string): boolean {
    return this.notes$.value.some(n => n.id === id);
  }
}
