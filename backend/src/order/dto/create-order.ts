import {
  ArrayNotEmpty,
  IsArray,
  IsDefined,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDTO {
  @IsOptional()
  @IsISO8601()
  public confirmationDate: Date;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  public email: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  public phoneNumber: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ProductEntryDTO)
  public products: Array<ProductEntryDTO>;
}

export class ProductEntryDTO {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  public id: string;

  @IsDefined()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  public quantity: number;
}
