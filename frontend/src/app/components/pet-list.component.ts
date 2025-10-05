import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../lib/api/api.service';
import { components } from '../../lib/api/types';

type Pet = components['schemas']['Pet'];

@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss'],
})
export class PetListComponent implements OnInit {
  private apiService = inject(ApiService);

  pets = signal<Pet[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  editingPet = signal<Pet | null>(null);
  newPet = signal({
    name: '',
    species: '',
    age: 0,
    description: '',
  });

  ngOnInit(): void {
    this.loadPets();
  }

  async loadPets(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const result = await this.apiService.getPets();
      this.pets.set(result);
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'Failed to load pets');
    } finally {
      this.loading.set(false);
    }
  }

  async onSubmit(): Promise<void> {
    const petData = this.newPet();
    const editing = this.editingPet();

    try {
      if (editing) {
        await this.apiService.updatePet(editing.id, petData);
      } else {
        await this.apiService.createPet(petData);
      }

      this.resetForm();
      await this.loadPets();
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'Failed to save pet');
    }
  }

  startEdit(pet: Pet): void {
    this.editingPet.set(pet);
    this.newPet.set({
      name: pet.name,
      species: pet.species,
      age: pet.age,
      description: pet.description || '',
    });
  }

  cancelEdit(): void {
    this.resetForm();
  }

  async deletePet(petId: number): Promise<void> {
    if (!confirm('Are you sure you want to delete this pet?')) {
      return;
    }

    try {
      await this.apiService.deletePet(petId);
      await this.loadPets();
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'Failed to delete pet');
    }
  }

  private resetForm(): void {
    this.editingPet.set(null);
    this.newPet.set({
      name: '',
      species: '',
      age: 0,
      description: '',
    });
  }
}
