import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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
  public price: number;

  @IsOptional()
  @IsNumber()
  public weight: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public category: string;
}
