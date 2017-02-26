import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetpieComponent } from './netpie.component';

describe('NetpieComponent', () => {
  let component: NetpieComponent;
  let fixture: ComponentFixture<NetpieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetpieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetpieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
