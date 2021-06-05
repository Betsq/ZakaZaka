import {Restaurant} from "../app/Model/restaurant";
import {Cuisine} from "../app/Model/cuisine";

export class RestaurantManageViewModel{
  constructor(
    public restaurants?: Restaurant[],
    public cuisines?: Cuisine[]
  ) {}
}
