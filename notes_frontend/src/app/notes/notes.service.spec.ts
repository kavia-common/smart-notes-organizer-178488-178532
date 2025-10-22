import { TestBed } from '@angular/core/testing';
import { NotesService } from '../core/services/notes.service';
import { StorageService } from '../core/services/storage.service';

describe('NotesService', () => {
  let service: NotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotesService, StorageService],
    });
    service = TestBed.inject(NotesService);
  });

  it('should create and update a note', (done) => {
    const created = service.create({ title: 'Test' });
    service.update(created.id, { title: 'Updated' });
    service.getById(created.id).subscribe(n => {
      if (n) {
        expect(n.title).toBe('Updated');
        done();
      }
    });
  });

  it('should delete note', (done) => {
    const created = service.create({ title: 'To Delete' });
    service.delete(created.id);
    service.getById(created.id).subscribe(n => {
      if (n === undefined) {
        done();
      }
    });
  });
});
