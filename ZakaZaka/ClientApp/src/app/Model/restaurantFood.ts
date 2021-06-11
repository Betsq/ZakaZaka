export class RestaurantFood{
  constructor(
    public id?: number,
    public name?: string,
    public price?: number,
    public ingredient?: string,
    public pathToImage?: string,
    public restaurantId?: number,
  ) {}
}
