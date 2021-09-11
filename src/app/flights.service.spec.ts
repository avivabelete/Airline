import { TestBed } from '@angular/core/testing';

import { FlightsService } from './flights.service';

describe('FlightsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlightsService = TestBed.get(FlightsService);
    expect(service).toBeTruthy();
  });
  const arr =[{origin: "isreal,Tel aviv", destination:"spain", date: new Date('Sat Sep 11 2021 12:15:05 GMT+0300 (Israel Daylight Time)'),duration:90, cost: 160, connections: 0},
              {origin: "isreal,Tel aviv", destination:"spain", date: new Date('Sat Sep 15 2021 12:15:05 GMT+0300 (Israel Daylight Time)'),duration:100, cost: 100, connections: 1},
              {origin: "isreal,Tel aviv", destination:"new york", date: new Date('Sat Sep 20 2021 12:15:05 GMT+0300 (Israel Daylight Time)'),duration:600, cost: 300, connections: 2},
              {origin: "isreal,Tel aviv", destination:"new york", date: new Date('Sat Sep 7 2021 12:15:05 GMT+0300 (Israel Daylight Time)'),duration:400, cost: 345, connections: 2},
              {origin: "isreal,Tel aviv", destination:"new york", date: new Date('Sat Sep 11 2021 12:15:05 GMT+0300 (Israel Daylight Time)'),duration:660, cost: 320, connections: 1}]

  it('Test search by destination', () => {
    let params = { destination : 'spain'}
    const service: FlightsService = TestBed.get(FlightsService);
    const result = service.searchByDestination(params, arr)
    expect(result).toEqual([{origin: "isreal,Tel aviv", destination:"spain", date: new Date('Sat Sep 11 2021 12:15:05 GMT+0300 (Israel Daylight Time)'),duration:90, cost: 160, connections: 0},
                            {origin: "isreal,Tel aviv", destination:"spain", date: new Date('Sat Sep 15 2021 12:15:05 GMT+0300 (Israel Daylight Time)'),duration:100, cost: 100, connections: 1}]);
  });
  it('Test search by connections', () => {
    let params = { connections   : 0}
    const service: FlightsService = TestBed.get(FlightsService);
    const result = service.searchByConnections(params, arr)
    expect(result.length).toEqual(1);
  });
  it('Test search by dates', () => {
    let params = { flightstart: new Date('Sat Sep 5 2021 12:15:05 GMT+0300 (Israel Daylight Time)')
    , flightend : new Date('Sat Sep 12 2021 12:15:05 GMT+0300 (Israel Daylight Time)')}
    const service: FlightsService = TestBed.get(FlightsService);
    const result = service.searchByDates(params, arr)
    expect(result.length).toEqual(3);
  });
  it('Test with min and max cost', () => {
    let params = { mincost: 50, maxcost: 200}
    const service: FlightsService = TestBed.get(FlightsService);
    const result = service.searchByCost(params, arr)
    expect(result.length).toEqual(2);
  });
  it('Test with max cost', () => {
    let params = { maxcost: 200, mincost: ''}
    const service: FlightsService = TestBed.get(FlightsService);
    const result = service.searchByCost(params, arr)
    expect(result.length).toEqual(2);
  });
});
