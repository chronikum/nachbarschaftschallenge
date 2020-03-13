import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Template3ComponentComponent } from './template3-component.component';

describe('Template3ComponentComponent', () => {
  let component: Template3ComponentComponent;
  let fixture: ComponentFixture<Template3ComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Template3ComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Template3ComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
