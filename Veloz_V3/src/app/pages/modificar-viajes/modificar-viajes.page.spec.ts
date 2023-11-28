import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarViajesPage } from './modificar-viajes.page';

describe('ModificarViajesPage', () => {
  let component: ModificarViajesPage;
  let fixture: ComponentFixture<ModificarViajesPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: []
    }).compileComponents();
    
    fixture = TestBed.createComponent(ModificarViajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
