import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";

export abstract class DataService {

  public url: string;

  protected constructor(protected http: HttpClient) {}

  public Get(optionHeaders: HttpHeaders){
    return this.http.get(this.url, {headers: optionHeaders});
  }

  public GetWithId(id: number, optionHeaders: HttpHeaders){
    return this.http.get(this.url + "/" + id, {headers: optionHeaders});
  }

  public Post(data: any, optionHeaders: HttpHeaders){
    return this.http.post(this.url, data, {headers: optionHeaders});
  }

  public Put(data: any, optionHeaders: HttpHeaders){
    return this.http.put(this.url, data, {headers: optionHeaders});
  }

  public Delete(id: number, optionHeaders: HttpHeaders){
    return this.http.delete(this.url + "/" + id, {headers: optionHeaders});
  }
}
