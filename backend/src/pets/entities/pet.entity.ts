import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsOptional, Min } from "class-validator";

export class Pet {
  @ApiProperty({
    description: "The unique identifier of the pet",
    example: 1,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  id: number;

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
