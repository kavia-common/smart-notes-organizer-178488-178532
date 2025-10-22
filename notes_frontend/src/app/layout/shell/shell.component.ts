import { Component, HostBinding } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {
  @HostBinding('class.collapsed') collapsed = false;

  // PUBLIC_INTERFACE
  /** Toggle sidebar collapse for small screens. */
  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }
}
