import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {  MatSortModule, MatTableModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlightsComponent } from './flights.component';

describe('FlightsComponent', () => {
  let component: FlightsComponent;
  let fixture: ComponentFixture<FlightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightsComponent ],
      imports: [ MatTableModule,MatSortModule, BrowserAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create flights component', () => {
    expect(component).toBeTruthy();
  });
  it('displayedColumns should be array of strings', ()=>{
    expect(component.displayedColumns)
    .toEqual(['origin', 'destination', 'date', 'duration','cost','connections']);
  })
  it('sould create sort object (MatSort)', ()=>{
    expect(component.sort).toBeTruthy();
  })
  it('should create sort for table', () => {
    spyOn(component, 'sort');
    component.launch();
    expect(component.dataSource.sort = component.sort).toBeTruthy();
  });
  it('check if data is empty', () => {
    component.checkExistData(0)
    expect(component.dataExist).toBeFalsy();
  });
});
