import {Injectable} from "@angular/core";
import {GenerateFormService} from "../generateForm/generateForm.service";
import {RestaurantFood} from "../../Model/restaurantFood";
import {HttpClient} from "@angular/common/http";
import {RestaurantFoodDataService} from "../Data/restaurantFoodData.service";
import {Observable} from "rxjs";

@Injectable()
export class RestaurantFoodService{
  private data: RestaurantFoodDataService;

  constructor(private form: GenerateFormService, private http: HttpClient) {
    this.data = new RestaurantFoodDataService(http);
    this.data.url = "/api/RestaurantFood";
  }

  public get(restaurantId: number) : Observable<RestaurantFood[]>{
    return this.data.GetWithId(restaurantId);
  }

  public add(restaurantFood: RestaurantFood, restaurantId: number,  file: FileList) : Observable<any>{
    restaurantFood.restaurantId = restaurantId;

    let data = [{name: "model", param: restaurantFood}];

    const formData = this.form.generate(data, file);

    return this.data.Post(formData);
  }

  public update(restaurantFood: RestaurantFood, file: FileList) : Observable<any>{
    let data = [{name: "model", param: restaurantFood}];

    const formData = this.form.generate(data, file);

    return this.data.Put(formData);
  }

  public remove(restaurantFood: RestaurantFood) : Observable<any>{
    return this.data.Delete(restaurantFood.id);
  }
}
