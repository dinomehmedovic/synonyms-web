import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SynonymsListComponent } from './synonyms-list.component';

describe('SynonymsListComponent', () => {
  let component: SynonymsListComponent;
  let fixture: ComponentFixture<SynonymsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SynonymsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SynonymsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
