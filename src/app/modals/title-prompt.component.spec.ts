import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitlePromptComponent } from './title-prompt.component';

describe('TitlePromptComponent', () => {
  let component: TitlePromptComponent;
  let fixture: ComponentFixture<TitlePromptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitlePromptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitlePromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
