import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtiicleColumnComponent } from './artiicle-column.component';

describe('ArtiicleColumnComponent', () => {
  let component: ArtiicleColumnComponent;
  let fixture: ComponentFixture<ArtiicleColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtiicleColumnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtiicleColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
