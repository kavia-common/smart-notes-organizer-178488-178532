 // PUBLIC_INTERFACE
export function generateId(prefix = 'note'): string {
  /** Generates a simple unique-ish id for local use. */
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}_${Date.now().toString(36)}`;
}
