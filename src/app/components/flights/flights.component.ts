import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { FlightsService } from './../../flights.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit,AfterViewInit {


  @ViewChild(MatSort) sort: MatSort;
  flights: any;
  displayedColumns: string[] = ['origin', 'destination', 'date', 'duration','cost','connections'];
  dataSource = new MatTableDataSource([]);
  dataExist: boolean;

  constructor(private _flightsSrv: FlightsService) {    }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  ngOnInit() {
    this.dataExist = true;
    this.launch();
  }
  launch(){
      this.flights = this._flightsSrv.getFlights();
      this.dataSource.data = this.flights;
      this.checkExistData(this.dataSource.data.length);
  }
  checkExistData(length){
    length === 0 ? this.dataExist=false: this.dataExist=true;
  }

}
