import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Note } from '../../core/models/note.model';
import { HighlightPipe } from '../../core/pipes/highlight.pipe';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [CommonModule, HighlightPipe, ConfirmDialogComponent],
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent {
  @Input() notes: Note[] = [];
  @Input() search = '';
  @Input() activeId: string | null = null;

  @Output() searchChange = new EventEmitter<string>();
  @Output() select = new EventEmitter<string>();
  @Output() create = new EventEmitter<void>();
  @Output() delete = new EventEmitter<string>();

  confirmOpen = false;
  toDeleteId: string | null = null;

  trackById(_: number, n: Note) { return n.id; }

  openConfirm(id: string) {
    this.toDeleteId = id;
    this.confirmOpen = true;
  }
  cancelConfirm() {
    this.confirmOpen = false;
    this.toDeleteId = null;
  }
  confirmDelete() {
    if (this.toDeleteId) this.delete.emit(this.toDeleteId);
    this.cancelConfirm();
  }

  onInput(term: string) {
    this.searchChange.emit(term);
  }

  snippet(content: string): string {
    const clean = content.replace(/\s+/g, ' ').trim();
    return clean.length > 80 ? clean.slice(0, 80) + '…' : clean;
  }

  formatTime(ts: number): string {
    const d = new Date(ts);
    return d.toLocaleString();
  }
}
