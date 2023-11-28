import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InterfazViajePage } from './interfaz-viaje.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('InterfazViajePage', () => {
  let component: InterfazViajePage;
  let fixture: ComponentFixture<InterfazViajePage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [SQLite,Storage]
    }).compileComponents();
    
    fixture = TestBed.createComponent(InterfazViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
