import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import {
  ApiTags,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiOperation,
  ApiBody,
} from "@nestjs/swagger";
import { PetsService } from "./pets.service";
import { Pet } from "./entities/pet.entity";
import { CreatePetDto } from "./dto/create-pet.dto";

@ApiTags("pets")
@Controller("pets")
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Get()
  @ApiOperation({ summary: "List all pets" })
  @ApiQuery({
    name: "limit",
    required: false,
    description: "How many items to return at one time (max 100)",
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: "A paged array of pets",
    type: [Pet],
  })
  findAll(@Query("limit") limitStr?: string): Pet[] {
    const limit = limitStr ? parseInt(limitStr, 10) : undefined;
    return this.petsService.findAll(limit);
  }

  @Post()
  @ApiOperation({ summary: "Create a pet" })
  @ApiResponse({
    status: 201,
    description: "Pet created successfully",
    type: Pet,
  })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPetDto: CreatePetDto): Pet {
    return this.petsService.create(createPetDto);
  }

  @Get(":id")
  @ApiOperation({ summary: "Info for a specific pet" })
  @ApiParam({ name: "id", description: "The id of the pet to retrieve" })
  @ApiResponse({
    status: 200,
    description: "Expected response to a valid request",
    type: Pet,
  })
  @ApiResponse({
    status: 404,
    description: "Pet not found",
  })
  findOne(@Param("id", ParseIntPipe) id: number): Pet {
    return this.petsService.findOne(id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update a pet" })
  @ApiParam({ name: "id", description: "The id of the pet to update" })
  @ApiBody({ type: CreatePetDto, description: "Updated pet data" })
  @ApiResponse({
    status: 200,
    description: "Pet updated successfully",
    type: Pet,
  })
  @ApiResponse({
    status: 404,
    description: "Pet not found",
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updatePetDto: Partial<CreatePetDto>
  ): Pet {
    return this.petsService.update(id, updatePetDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a pet" })
  @ApiParam({ name: "id", description: "The id of the pet to delete" })
  @ApiResponse({
    status: 204,
    description: "Pet deleted successfully",
  })
  @ApiResponse({
    status: 404,
    description: "Pet not found",
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param("id", ParseIntPipe) id: number): void {
    this.petsService.remove(id);
  }
}
