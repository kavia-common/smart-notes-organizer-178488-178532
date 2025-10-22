import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Note } from '../../core/models/note.model';

@Component({
  selector: 'app-note-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.scss']
})
export class NoteEditorComponent implements OnChanges {
  @Input() note: Note | null = null;
  @Output() titleChange = new EventEmitter<string>();
  @Output() contentChange = new EventEmitter<string>();

  title = '';
  content = '';

  private titleTimer: any;
  private contentTimer: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['note']) {
      this.title = this.note?.title ?? '';
      this.content = this.note?.content ?? '';
    }
  }

  onTitleInput(v: string) {
    this.title = v;
    if (typeof globalThis !== 'undefined') {
      if (this.titleTimer) { (globalThis as any).clearTimeout(this.titleTimer); }
      this.titleTimer = (globalThis as any).setTimeout(() => this.titleChange.emit(v), 250);
    }
  }
  onContentInput(v: string) {
    this.content = v;
    if (typeof globalThis !== 'undefined') {
      if (this.contentTimer) { (globalThis as any).clearTimeout(this.contentTimer); }
      this.contentTimer = (globalThis as any).setTimeout(() => this.contentChange.emit(v), 300);
    }
  }
}
