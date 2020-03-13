import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Template2ComponentComponent } from './template2-component.component';

describe('Template2ComponentComponent', () => {
  let component: Template2ComponentComponent;
  let fixture: ComponentFixture<Template2ComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Template2ComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Template2ComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
