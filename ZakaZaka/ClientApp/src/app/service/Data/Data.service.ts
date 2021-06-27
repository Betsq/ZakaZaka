import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

export abstract class DataService {

  public url: string;

  protected constructor(protected http: HttpClient) {}

  public Get(optionHeaders?: HttpHeaders) : Observable<any>{
    return this.http.get(this.url, {headers: optionHeaders});
  }

  public GetWithId(id: number, optionHeaders?: HttpHeaders) : Observable<any>{
    return this.http.get(this.url + "/" + id, {headers: optionHeaders});
  }

  public Post(data: any, optionHeaders?: HttpHeaders) : Observable<any>{
    return this.http.post(this.url, data, {headers: optionHeaders});
  }

  public Put(data: any, optionHeaders?: HttpHeaders) : Observable<any>{
    return this.http.put(this.url, data, {headers: optionHeaders});
  }

  public Delete(id: number, optionHeaders?: HttpHeaders) : Observable<any>{
    return this.http.delete(this.url + "/" + id, {headers: optionHeaders});
  }
}
