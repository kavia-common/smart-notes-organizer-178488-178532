import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  @Input() open = false;
  @Input() title = 'Confirm';
  @Input() message = 'Are you sure?';
  @Input() confirmText = 'Delete';
  @Input() cancelText = 'Cancel';

  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  // PUBLIC_INTERFACE
  /** Close dialog without action. */
  close(): void {
    this.cancelled.emit();
  }

  // PUBLIC_INTERFACE
  /** Confirm action. */
  confirm(): void {
    this.confirmed.emit();
  }
}
