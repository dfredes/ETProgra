import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarAutoPage } from './modificar-auto.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { Storage } from '@ionic/storage-angular';

describe('ModificarAutoPage', () => {
  let component: ModificarAutoPage;
  let fixture: ComponentFixture<ModificarAutoPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [SQLite, Storage]
    }).compileComponents();
    
    fixture = TestBed.createComponent(ModificarAutoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
