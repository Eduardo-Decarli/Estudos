import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Primeiro } from './primeiro';

describe('Primeiro', () => {
  let component: Primeiro;
  let fixture: ComponentFixture<Primeiro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Primeiro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Primeiro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
