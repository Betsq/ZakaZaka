import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

export abstract class DataService {

  public url: string;

  protected constructor(protected http: HttpClient) {}

  public Get(){
    return this.http.get(this.url);
  }

  public GetWithId(id: number){
    return this.http.get(this.url + "/" + id);
  }

  public Post(data: any){
    return this.http.post(this.url, data);
  }

  public Put(data: any){
    return this.http.put(this.url, data);
  }

  public Delete(id: number){
    return this.http.delete(this.url + "/" + id);
  }
}
