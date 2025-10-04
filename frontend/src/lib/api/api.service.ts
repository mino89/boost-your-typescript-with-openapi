import { Injectable } from '@angular/core';
import createClient from 'openapi-fetch';
import type { paths } from './types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private client = createClient<paths>({
    baseUrl: 'http://localhost:3000',
  });

  async getPets(limit?: number) {
    const { data, error } = await this.client.GET('/pets', {
      params: { query: limit ? { limit } : {} },
    });

    if (error) {
      throw new Error(`Failed to fetch pets: ${JSON.stringify(error)}`);
    }

    return data || [];
  }

  async getPet(petId: number) {
    const { data, error } = await this.client.GET('/pets/{id}', {
      params: { path: { id: petId } },
    });

    if (error) {
      throw new Error(`Failed to fetch pet: ${JSON.stringify(error)}`);
    }

    return data;
  }

  async createPet(pet: { name: string; species: string; age: number; description?: string }) {
    const { data, error } = await this.client.POST('/pets', {
      body: pet,
    });

    if (error) {
      throw new Error(`Failed to create pet: ${JSON.stringify(error)}`);
    }

    return data;
  }

  async updatePet(
    petId: number,
    pet: { name: string; species: string; age: number; description?: string }
  ) {
    const { data, error } = await this.client.PUT('/pets/{id}', {
      params: { path: { id: petId } },
      body: pet,
    });

    if (error) {
      throw new Error(`Failed to update pet: ${JSON.stringify(error)}`);
    }

    return data;
  }

  async deletePet(petId: number) {
    const { error } = await this.client.DELETE('/pets/{id}', {
      params: { path: { id: petId } },
    });

    if (error) {
      throw new Error(`Failed to delete pet: ${JSON.stringify(error)}`);
    }
  }
}
