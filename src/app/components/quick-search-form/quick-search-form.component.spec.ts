import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickSearchFormComponent } from './quick-search-form.component';

describe('QuickSearchFormComponent', () => {
  let component: QuickSearchFormComponent;
  let fixture: ComponentFixture<QuickSearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickSearchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
