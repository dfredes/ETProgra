import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearViajesPage } from './crear-viajes.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { Storage } from '@ionic/storage-angular';

describe('CrearViajesPage', () => {
  let component: CrearViajesPage;
  let fixture: ComponentFixture<CrearViajesPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [SQLite, Storage]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearViajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
