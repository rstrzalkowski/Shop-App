import { OrderState } from '../orderState.model';
import { ProductEntry } from '../order.model';

export class CreateOrderDTO {
  public confirmationDate: Date;
  public username: string;
  public email: string;
  public phoneNumber: string;
  public products: Array<ProductEntry>;
  //public state: OrderState;
}
