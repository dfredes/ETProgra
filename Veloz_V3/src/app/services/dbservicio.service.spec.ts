import { TestBed } from '@angular/core/testing';

import { DbservicioService } from './dbservicio.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { Storage } from '@ionic/storage-angular';

describe('DbservicioService', () => {
  let service: DbservicioService;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [SQLite, Storage]
    }).compileComponents();

    TestBed.configureTestingModule({});
    service = TestBed.inject(DbservicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
