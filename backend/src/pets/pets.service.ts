import { Injectable, NotFoundException } from "@nestjs/common";
import { Pet } from "./entities/pet.entity";
import { CreatePetDto } from "./dto/create-pet.dto";

@Injectable()
export class PetsService {
  private pets: Pet[] = [
    {
      id: 1,
      name: "Fluffy",
      species: "Cat",
      age: 2,
      description: "A fluffy orange cat",
    },
    {
      id: 2,
      name: "Buddy",
      species: "Dog",
      age: 5,
      description: "A loyal golden retriever",
    },
    {
      id: 3,
      name: "Charlie",
      species: "Bird",
      age: 1,
      description: "A colorful parrot",
    },
    { id: 4, name: "Whiskers", species: "Cat", age: 3 },
    {
      id: 5,
      name: "Max",
      species: "Dog",
      age: 7,
      description: "An energetic border collie",
    },
  ];

  private nextId = 6;

  findAll(limit?: number): Pet[] {
    return limit ? this.pets.slice(0, limit) : this.pets;
  }

  findOne(id: number): Pet {
    const pet = this.pets.find((pet) => pet.id === id);
    if (!pet) {
      throw new NotFoundException(`Pet with ID ${id} not found`);
    }
    return pet;
  }

  create(createPetDto: CreatePetDto): Pet {
    const newPet: Pet = {
      id: this.nextId++,
      ...createPetDto,
    };
    this.pets.push(newPet);
    return newPet;
  }

  update(id: number, updatePetDto: Partial<CreatePetDto>): Pet {
    const petIndex = this.pets.findIndex((pet) => pet.id === id);
    if (petIndex === -1) {
      throw new NotFoundException(`Pet with ID ${id} not found`);
    }

    this.pets[petIndex] = { ...this.pets[petIndex], ...updatePetDto };
    return this.pets[petIndex];
  }

  remove(id: number): void {
    const petIndex = this.pets.findIndex((pet) => pet.id === id);
    if (petIndex === -1) {
      throw new NotFoundException(`Pet with ID ${id} not found`);
    }
    this.pets.splice(petIndex, 1);
  }
}
