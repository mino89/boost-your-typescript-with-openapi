import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsNumber, Min } from "class-validator";

export class CreatePetDto {
  @ApiProperty({
    description: "The name of the pet",
    example: "Fluffy",
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: "The species of the pet",
    example: "Dog",
  })
  @IsString()
  species: string;

  @ApiProperty({
    description: "The age of the pet in years",
    example: 3,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  age: number;

  @ApiProperty({
    description: "Optional description of the pet",
    example: "A friendly golden retriever",
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
