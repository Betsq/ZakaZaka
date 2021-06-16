export class RestaurantReview{
  constructor(
    public id?: number,
    public review?: string,
    public assessment?: number,
    public time?: Date,
    public restaurantId?: number
  ) {}
}
