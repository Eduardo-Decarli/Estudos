import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilhoB } from './filho-b';

describe('FilhoB', () => {
  let component: FilhoB;
  let fixture: ComponentFixture<FilhoB>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilhoB]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilhoB);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
