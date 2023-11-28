import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnadirAutoPage } from './anadir-auto.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { Storage } from '@ionic/storage-angular';

describe('AnadirAutoPage', () => {
  let component: AnadirAutoPage;
  let fixture: ComponentFixture<AnadirAutoPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers:[SQLite, Storage]
    }).compileComponents();



    fixture = TestBed.createComponent(AnadirAutoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
