import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateProductDTO {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsDefined()
  @IsNumber()
  @IsPositive()
  public price: number;

  @IsDefined()
  @IsNumber()
  @IsPositive()
  public weight: number;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  public category: string;
}
