import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { flight } from './flight';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {
  static flightsMap = new Map<string, flight>([
    ["1", {origin: "isreal,Tel aviv", destination:"new york", date: new Date('Sat Sep 20 2021 20:00:00 GMT+0300 (Israel Daylight Time)'),duration:600, cost: 300, connections: 2}],
    ["2", {origin: "isreal,Tel aviv", destination:"spain", date: new Date('Sat Sep 5 2021 12:15:00 GMT+0300 (Israel Daylight Time)'),duration:100, cost: 160, connections: 0}],
    ["3", {origin: "isreal,Tel aviv", destination:"usa", date: new Date('Sat Sep 15 2021 16:00:00 GMT+0300 (Israel Daylight Time)'),duration:450, cost: 400, connections: 3}],
    ["4", {origin: "isreal,Tel aviv", destination:"spain", date: new Date('Sat Sep 17 2021 01:30:00 GMT+0300 (Israel Daylight Time)'),duration:90, cost: 100, connections: 1}],
    ["5", {origin: "isreal,Tel aviv", destination:"new york", date: new Date('Sat Sep 30 2021 12:00:00 GMT+0300 (Israel Daylight Time)'),duration:500, cost: 345, connections: 2}]
  ]);

  filterFlights: flight[];
  constructor() { this.filterFlights = Array.from(FlightsService.flightsMap.values());  }
  getFlights(){
    return this.filterFlights;
  }
  getDestinations(){
    const arr = Array.from(FlightsService.flightsMap.values());
    return [...new Set(arr.map(item => item.destination))];
  }
  getConnections(){
    const arr = Array.from(FlightsService.flightsMap.values());
    return [...new Set(arr.map(item => item.connections).sort())];
  }
  searchFlights(params){
    const arr = Array.from(FlightsService.flightsMap.values());
    this.filterFlights =  this.searchByConnections(params,this.searchByCost(params, this.searchByDates(params, this.searchByDestination(params, arr))))
  }
  searchByDestination(params, arr){
    return (params.destination !== ''&&params.destination !== null) ? arr.filter(item => item.destination === params.destination): arr;
  }
  searchByDates(params, arr){
    return (params.flightstart !== ''&&params.flightstart !==null) && (params.flightend!=='' && params.flightend !== null) ? 
    arr.filter(item => item.date <= params.flightend && item.date >= params.flightstart):
    arr;
  }
  searchByCost(params, arr){
    return (params.maxcost != ''&&params.maxcost !== null) ? 
    arr.filter(item => item.cost <= params.maxcost && item.cost >= ((params.mincost !== ''&& params.mincost!==null)? params.mincost : 0)):
    arr;

  }
  searchByConnections(params, arr){
    return (params.connections !== ''&&params.connections !== null) ? arr.filter(item => item.connections === params.connections): arr;
  }
}
