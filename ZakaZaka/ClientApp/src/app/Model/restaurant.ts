export class Restaurant{
  constructor(
    public id?: number,
    public name?: string,
    public minimumOrder?: number,
    public costDelivery?: number,
    public timeToDelivery?: Date,
    public payToCard?: boolean
  ) {}
}
