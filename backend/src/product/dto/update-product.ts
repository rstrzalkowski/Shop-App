import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class UpdateProductDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  public price: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  public weight: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public category: string;
}
