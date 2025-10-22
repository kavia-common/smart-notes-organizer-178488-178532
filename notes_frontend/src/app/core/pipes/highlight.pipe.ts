import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
  standalone: true
})
export class HighlightPipe implements PipeTransform {
  // PUBLIC_INTERFACE
  /** Wraps matched substrings with a <mark> tag. */
  transform(text: string, search: string): string {
    if (!text) return '';
    const term = (search || '').trim();
    if (!term) return this.escape(text);
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`(${escaped})`, 'ig');
    return this.escape(text).replace(re, '<mark>$1</mark>');
  }

  private escape(str: string): string {
    return str.replace(/[&<>"'`=\/]/g, s =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '/': '&#x2F;', '`': '&#x60;', '=': '&#x3D;' } as any)[s]
    );
  }
}
