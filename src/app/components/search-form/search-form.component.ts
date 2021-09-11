import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FlightsService } from 'src/app/flights.service';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { flight } from 'src/app/flight';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  Destinations: any[];
  connectionsToSelect:any[];
  searchForm :FormGroup;
  @Output() activateTable = new EventEmitter();
  
  constructor(private _flightsSrv:FlightsService) { }
  ngOnInit() {
    this.Destinations = this._flightsSrv.getDestinations();
    this.connectionsToSelect = this._flightsSrv.getConnections();
    this.searchForm = new FormGroup({
      destination: new FormControl(''),
      connections: new FormControl(''),
      mincost: new FormControl('',[Validators.min(0)]),
      maxcost: new FormControl('',[Validators.min(0)]),
      flightstart: new FormControl(''),
      flightend: new FormControl(''),
    },[validateCost, validateDates]);
  }
  
  onSubmit(){
    const data =this._flightsSrv.searchFlights(this.searchForm.value);
    this.activateTable.emit()
  }

}
export const validateCost: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const min = control.get('mincost').value;
  const max = control.get('maxcost').value;
  return (min !== '' && max === '') || min > max ? {confirmedCostAttr : true} : null;
};
export const validateDates: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const start = control.get('flightstart').value;
  const end = control.get('flightend').value;
  return (start === '' && end !== '')||(start !== '' && end === '') || start > end ? {confirmedDatesAttr : true} : null;
};