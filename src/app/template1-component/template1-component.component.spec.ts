import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Template1ComponentComponent } from './template1-component.component';

describe('Template1ComponentComponent', () => {
  let component: Template1ComponentComponent;
  let fixture: ComponentFixture<Template1ComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Template1ComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Template1ComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
