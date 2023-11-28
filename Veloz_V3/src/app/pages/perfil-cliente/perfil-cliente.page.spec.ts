import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilClientePage } from './perfil-cliente.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { Storage } from '@ionic/storage-angular';

describe('PerfilClientePage', () => {
  let component: PerfilClientePage;
  let fixture: ComponentFixture<PerfilClientePage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [SQLite, Storage]
    }).compileComponents();
    
    fixture = TestBed.createComponent(PerfilClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
