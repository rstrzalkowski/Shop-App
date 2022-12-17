import {
  ArrayNotEmpty,
  IsArray,
  IsDefined,
  IsEmail,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
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
  @IsEmail()
  public email: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
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
