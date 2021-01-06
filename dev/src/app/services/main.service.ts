import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { group } from '../main-page/main-page.component';
import { Observable, of } from 'rxjs';
import {children} from '../children/children.component'
import {timesheet} from 'src/app/timesheets/timesheets.component'
import { causes } from 'src/app/timesheets/create-timesheets/create-timesheets.component';

const  httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })/*.set('Authorization','token')*/
};

const  httpOptions2 = {
  headers: new HttpHeaders({ 'Bearer':'token'})
};

const getGroups = "api/group/findAll"
const addGroup = "/api/group/createGroup"
const deleteGroup = "/api/group/delete"
const updateGroup= "/api/group/updateGroup"

const getchildren= "/api/children/findByGroupId"
const updateChild = "/api/children/update"
const addChild = "/api/children/register"
const getChildById= "/api/children/findById"

const timesheets = "api/timesheet/findAll"
const getGroupByType = "/api/group/findByGroupTypeId"
const getGroupTypes = "/api/group/findAllGroupTypes"
const getTimeSheetsByGroupId="/api/timesheet/findByGroupId"
const createTimesheet= "api/timesheet/create"
const updateTimesheet = "/api/timesheet/update"
const addCause= "/api/children/addCause"
const downloadTimesheets = "/api/file/downloadT"
const goodAbsent="/api/children/countOfTrue"
const badAbsent="/api/children/countOfFalse"
const allAbsent="/api/children/AllGap"

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor( 
    private http: HttpClient,
    private router: Router,
    private injector: Injector) { }

    getchildren(id:number): Observable<children[]> {
      return this.http.get<children[]>(`${getchildren}/${id}`)
    }

    getChildById(id:number):Observable<children>{
        const url = `${getChildById}/${id}`;
        return this.http.get<children>(url);
    }

  getGroups(): Observable<group[]> {
    return this.http.get<group[]>(getGroups);
  }

  getGroup(id:number): Observable<group> {
    const url = `${getGroups}/${id}`;
    return this.http.get<group>(url);
  }

  addGroup(Record: group): Observable<any> {
    return this.http.post(addGroup, Record, httpOptions);
  }

  addChild(Record: children): Observable<any>{
    return this.http.post(addChild, Record, httpOptions);
  }

  deleteGroup(Record: group | number): Observable<group> {
   const id = typeof Record === 'number' ? Record : Record.id;
   const url = `${deleteGroup}/${id}`;
    return this.http.delete<group>(url, httpOptions)
  }

  updateGroup(Record: group): Observable<any>{
    const idw = typeof Record === 'number' ? Record : Record.id;
    return this.http.put<group>(`${updateGroup}/${Record.id}`,Record, httpOptions); 
  } 

  updateChild(Record: children): Observable<any>{
    const idw = typeof Record === 'number' ? Record : Record.id;
  return this.http.put<children>( `${updateChild}/${Record.id}`,Record, httpOptions); 
  }  

                               /* For timesheets */

  getTimesheets(){
    return this.http.get(timesheets);
  }

  getGoodAbsent(id){
    return this.http.get(`${goodAbsent}/${id}`);
  }

  getBadAbsent(id){
    return this.http.get(`${badAbsent}/${id}`);
  }

  getAllAbsent(id){
    return this.http.get(`${allAbsent}/${id}`);
  }

  getGroupByType(id){
    return this.http.get(`${getGroupByType}/${id}`)
  }

  getGroupTypes(){
    return this.http.get(getGroupTypes)
  }

  getTimesheetsForGroup(id){
    return this.http.get(`${getTimeSheetsByGroupId}/${id}`)
  }

  createTimesheet(record:timesheet):Observable<any>{
    return this.http.post(`${createTimesheet}/${record.id}`, record)
  }  
  
  updateTimesheet(Record: timesheet): Observable<any>{
  return this.http.put<timesheet>( `${updateTimesheet}/${Record.id}`,Record, httpOptions); 
  }  

  addcause(Record: causes): Observable<any>{
    return this.http.put<causes>( `${addCause}/${Record.id}`,Record, httpOptions); 
    }  

  downloadTimesheet(id, month){
    return this.http.get(`${downloadTimesheets}/${id}/${month}`,{
      responseType: 'arraybuffer'} 
     ).subscribe(response => this.downLoadFile(response, "application/ms-excel"));
  }
  downLoadFile(response: ArrayBuffer, arg1: string): void {
    throw new Error('Method not implemented.');
  }



}

