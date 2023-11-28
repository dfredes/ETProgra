import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroClientePage } from './registro-cliente.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { Storage } from '@ionic/storage-angular';

describe('RegistroClientePage', () => {
  let component: RegistroClientePage;
  let fixture: ComponentFixture<RegistroClientePage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [SQLite, Storage]
    }).compileComponents();
    
    fixture = TestBed.createComponent(RegistroClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
