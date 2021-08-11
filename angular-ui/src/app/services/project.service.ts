import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Global } from "./global";
import { Project } from "../models/project";
import { Observable } from "rxjs";

@Injectable()
export class ProjectService{
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }


    testService(){
        return 'Probando el servicio de angular';
    }


    save_project(proj: Project): Observable<any>{
        let params = JSON.stringify(proj);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'save-project', params, {headers: headers});
    }


    getProjects(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'projects', {headers: headers});
    }


    getProject(id: string): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'project/'+id, {headers: headers});
    }


    deleteProject(id: string): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(this.url+'project/'+id, {headers: headers})
    }


    updateProject(proj: Project): Observable<any>{
        let params = JSON.stringify(proj);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url+'project/'+proj._id, params, {headers: headers})
    }

}