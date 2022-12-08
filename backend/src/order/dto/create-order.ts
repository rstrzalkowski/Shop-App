export class CreateOrderDTO {
  public confirmationDate: Date;
  public username: string;
  public email: string;
  public phoneNumber: string;
  public products: Array<ProductEntryDTO>;
}

export class ProductEntryDTO {
  public id: string;
  public quantity: number;
}
