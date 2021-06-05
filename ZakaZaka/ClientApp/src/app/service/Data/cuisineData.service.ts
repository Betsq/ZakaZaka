import {Injectable} from "@angular/core";
import {DataService} from "./Data.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class CuisineDataService extends DataService{
  constructor(protected http: HttpClient) {
    super(http);
  }
}
