import {Injectable} from "@angular/core";
import {RestaurantDataService} from "../Data/restuarantData.service";
import {GenerateFormService} from "../generateForm/generateForm.service";
import {Restaurant} from "../../Model/restaurant";

@Injectable()
export class RestaurantManageService{
  constructor(private data: RestaurantDataService, private form: GenerateFormService) {
    data.url = "/api/Restaurant";
  }

  get(){
    return this.data.Get();
  }

  getWithId(id: number){
    return this.data.GetWithId(id);
  }

  add(data: {name: string, param: any}[], file?: FileList){
    let formData = this.form.generate(data, file);

    return  this.data.Post(formData);
  }

  update(data: {name: string, param: any}[], file?: FileList){
    let formData = this.form.generate(data, file);

    return  this.data.Put(formData);
  }

  delete(id: number){
    return this.data.Delete(id);
  }
}
