import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { group } from '../main-page/main-page.component';
import { Observable, of } from 'rxjs';
import {children} from '../children/children'
const  httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const getGroups = "/api/group/createGroup"
const addGroup = "/api/group/createGroup"
const deleteGroup = ""
const updateGroup= ""
const getchildren= ""

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor( 
    private http: HttpClient,
    private router: Router,
    private injector: Injector) { }

    getchildren(postId:number): Observable<children[]> {
      return this.http.get<children[]>(`${getchildren}/?childrenId=${postId}`)
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
  
  deleteGroup(Record: group | number): Observable<group> {
   const id = typeof Record === 'number' ? Record : Record.idgroup;
   const url = `${deleteGroup}/${id}`;
    return this.http.delete<group>(url, httpOptions)
  }

  updateGroup(Record: group ): Observable<any>{
    return this.http.put(updateGroup, Record, httpOptions);
  }  

}
