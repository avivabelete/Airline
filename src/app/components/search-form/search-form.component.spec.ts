import { formatDate } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SearchFormComponent } from './search-form.component';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFormComponent ],
      imports:[BrowserAnimationsModule, MatInputModule, MatSelectModule, MatOptionModule,
         MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule, FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Destinations should be list of strings', () => {
    expect(component.Destinations.length > 0).toBeTruthy();
  });
  it('Connections should be list of numbers', () => {
    expect(component.connectionsToSelect.length > 0).toBeTruthy();
  });
  it('form sould be valid at first', () => {
    expect(component.searchForm.invalid).toBeFalsy();
  });
  it('form sould be valid at first', () => {
    component.onSubmit()
    expect(component.searchForm.invalid).toBeFalsy();
  });
    it('Test formgroup element count ', () => {
    const formele = fixture.debugElement.nativeElement.querySelector("form");
    const elements = formele.querySelectorAll('mat-form-field')
    expect(elements.length).toEqual(6);
  });
  it('Test min and max cost validations ', () => {
    const mincost = component.searchForm.controls['mincost'];
    const maxcost = component.searchForm.controls['maxcost'];
    mincost.setValue(5);
    maxcost.setValue('');
    expect(component.searchForm.hasError('confirmedCostAttr')).toBeTruthy();
  });
  it('Test dates validations ', () => {
    const start = component.searchForm.controls['flightstart'];
    const end = component.searchForm.controls['flightend'];
    start.setValue(new Date());
    end.setValue('');
    expect(component.searchForm.hasError('confirmedDatesAttr')).toBeTruthy();
  });

});
