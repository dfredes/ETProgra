import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarDatosClientePage } from './modificar-datos-cliente.page';
import { ActivatedRoute } from '@angular/router';

describe('ModificarDatosClientePage', () => {
  let component: ModificarDatosClientePage;
  let route: ActivatedRoute;
  let fixture: ComponentFixture<ModificarDatosClientePage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: ['ModificarDatosClientePage'],
      providers: []
    }).compileComponents();
    
    fixture = TestBed.createComponent(ModificarDatosClientePage);
    route = TestBed.inject(ActivatedRoute)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
