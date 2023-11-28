import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestablecerContrasenaPage } from './restablecer-contrasena.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { Storage } from '@ionic/storage-angular';

describe('RestablecerContrasenaPage', () => {
  let component: RestablecerContrasenaPage;
  let fixture: ComponentFixture<RestablecerContrasenaPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [SQLite, Storage]
    }).compileComponents();
    
    fixture = TestBed.createComponent(RestablecerContrasenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
