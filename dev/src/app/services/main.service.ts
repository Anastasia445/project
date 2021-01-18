import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { group } from '../main-page/main-page.component';
import { Observable, of } from 'rxjs';
import {children, file} from '../children/children.component'
import {timesheet} from 'src/app/timesheets/timesheets.component'
import { causes } from 'src/app/timesheets/create-timesheets/create-timesheets.component';
import { plans } from '../plans/plans.component';
import { users } from '../users/users.component';

const  httpC = {
  headers: new HttpHeaders({ 'Content-Type': 'tutorials.xlsx' })
};

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
const getGroupForEducators= "/api/group/findByEduc"

const getchildren= "/api/children/findByGroupId"
const updateChild = "/api/children/update"
const addChild = "/api/children/register"
const getChildById= "/api/children/findById"
const downloadChildren = "/api/file/downloadC"

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
const deleteTimesheet = "/api/timesheet/delete"
const attending = "/api/children/attendance"

const getPlanById = "/api/plans/findById"
const getAllPlans = "/api/plans/findAll"
const updatePlan = "/api/plans/update"
const createPlan = "/api/plans/createPlan"
const deletePlan = "/api/plans/delete"
const downloadPlan = "/api/file/downloadPlans"
const getPlanByEducatorid= "/api/plans/allEducPlans"

const getAllUsers="/api/educator/findAll"
const updateUser="/api/auth/update"
const deleteUser="/api/auth/delete"

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

  getGroupForEduc(id): Observable<group[]> {
    const url = `${getGroupForEducators}/${id}`;
    return this.http.get<group[]>(url);
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

  downloadChildren(id){
    return this.http.get(`${downloadChildren}/${id}`,{ responseType: 'blob' })
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

  downloadTimesheet(id, month2){
    return this.http.get(`${downloadTimesheets}/${id}/${month2}`,{ responseType: 'blob' })
  }

  deleteTimesheet(id) {
    const url = `${deleteTimesheet}/${id}`;
     return this.http.delete(url, httpOptions)
   }

   getVisits(id, month){
    return this.http.get(`${attending}/${id}/${month}`, httpOptions)
  }
             /*    API for plans     */

  downloadPlan(id, month){
    return this.http.get(`${downloadPlan}/${id}/${month}`,{ responseType: 'blob' })
  }

  getPlans(){
    return this.http.get(getAllPlans)
  }

  getPlanById(id){
    return this.http.get(`${getPlanById}/${id}`)
  }

  createPlan(record:plans,id):Observable<any>{
    return this.http.post(`${createPlan}/${id}`, record)

}  

/*createPlan(record,id):Observable<any>{
  return this.http.post(`${createPlan}/${id}`, record)

} */
  
  updatePlan(Record: plans): Observable<plans>{
  return this.http.put<any>( `${updatePlan}/${Record.id}`,Record, httpOptions); 
  }  

  deletePlan(Record: plans) {
    const url = `${deletePlan}/${Record.id}`;
     return this.http.delete(url, httpOptions)
  }

  getPlanByEducatorId(id): Observable<plans[]>{
    return this.http.get<plans[]>(`${getPlanByEducatorid}/${id}`)
  }

         /* API for Users */

   updateUser(Record: users): Observable<users>{
  return this.http.put<any>( `${updateUser}/${Record.id}`,Record, httpOptions); 
  }  

  deleteUser(Record: users) {
    const url = `${deleteUser}/${Record.id}`;
     return this.http.delete(url, httpOptions)
  }

  getAllUsers(): Observable<users[]>{
    return this.http.get<users[]>(getAllUsers, httpOptions)
  }
}

