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
  template: `
    <div class="container">
      <header>
        <h2>Pet Management System</h2>
        <p>Angular 20 + OpenAPI TypeScript Demo</p>
      </header>

      <!-- Add Pet Form -->
      <div class="form-section">
        <h3>{{ editingPet() ? 'Edit Pet' : 'Add New Pet' }}</h3>
        <form (ngSubmit)="onSubmit()" #petForm="ngForm">
          <div class="form-group">
            <label for="name">Name:</label>
            <input id="name" type="text" [(ngModel)]="newPet().name" name="name" required />
          </div>

          <div class="form-group">
            <label for="species">Species:</label>
            <input
              id="species"
              type="text"
              [(ngModel)]="newPet().species"
              name="species"
              required
            />
          </div>

          <div class="form-group">
            <label for="age">Age:</label>
            <input id="age" type="number" [(ngModel)]="newPet().age" name="age" required />
          </div>

          <div class="form-group">
            <label for="description">Description:</label>
            <textarea
              id="description"
              [(ngModel)]="newPet().description"
              name="description"
            ></textarea>
          </div>

          <div class="form-actions">
            <button type="submit" [disabled]="!petForm.valid || loading()">
              {{ editingPet() ? 'Update Pet' : 'Add Pet' }}
            </button>
            @if (editingPet()) {
            <button type="button" (click)="cancelEdit()">Cancel</button>
            }
          </div>
        </form>
      </div>

      <!-- Loading State -->
      @if (loading()) {
      <div class="loading">Loading pets...</div>
      }

      <!-- Error State -->
      @if (error()) {
      <div class="error">Error: {{ error() }}</div>
      }

      <!-- Pet List -->
      @if (!loading() && pets().length > 0) {
      <div class="pets-section">
        <h3>Your Pets</h3>
        <div class="pets-grid">
          @for (pet of pets(); track pet.id) {
          <div class="pet-card">
            <h4>{{ pet.name }}</h4>
            <p><strong>Species:</strong> {{ pet.species }}</p>
            <p><strong>Age:</strong> {{ pet.age }} years</p>
            @if (pet.description) {
            <p><strong>Description:</strong> {{ pet.description }}</p>
            }
            <div class="card-actions">
              <button (click)="startEdit(pet)">Edit</button>
              <button (click)="deletePet(pet.id)" class="delete">Delete</button>
            </div>
          </div>
          }
        </div>
      </div>
      } @if (!loading() && pets().length === 0) {
      <div class="empty-state">
        <p>No pets found. Add your first pet above!</p>
      </div>
      }
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 900px;
        margin: 0 auto;
        padding: 20px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      header {
        text-align: center;
        margin-bottom: 30px;
        padding-bottom: 20px;
        border-bottom: 1px solid #e9ecef;
      }

      header h2 {
        color: #333;
        margin: 0 0 8px 0;
      }

      header p {
        color: #666;
        margin: 0;
      }

      .form-section {
        background: #f8f9fa;
        padding: 20px;
        border-radius: 8px;
        margin-bottom: 30px;
      }

      .form-section h3 {
        margin-top: 0;
        color: #495057;
      }

      .form-group {
        margin-bottom: 15px;
      }

      .form-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: 500;
        color: #495057;
      }

      .form-group input,
      .form-group textarea {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid #ced4da;
        border-radius: 4px;
        font-size: 14px;
      }

      .form-group textarea {
        height: 80px;
        resize: vertical;
      }

      .form-actions {
        display: flex;
        gap: 10px;
        margin-top: 20px;
      }

      button {
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
      }

      button[type='submit'] {
        background: #007bff;
        color: white;
      }

      button[type='submit']:hover:not(:disabled) {
        background: #0056b3;
      }

      button[type='submit']:disabled {
        background: #6c757d;
        cursor: not-allowed;
      }

      button[type='button'] {
        background: #6c757d;
        color: white;
      }

      button[type='button']:hover {
        background: #5a6268;
      }

      .loading {
        text-align: center;
        padding: 20px;
        color: #007bff;
      }

      .error {
        background: #f8d7da;
        color: #721c24;
        padding: 15px;
        border-radius: 4px;
        margin: 20px 0;
      }

      .pets-section h3 {
        color: #495057;
        margin-bottom: 20px;
      }

      .pets-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
      }

      .pet-card {
        background: white;
        border: 1px solid #dee2e6;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .pet-card h4 {
        margin: 0 0 10px 0;
        color: #495057;
      }

      .pet-card p {
        margin: 5px 0;
        color: #6c757d;
      }

      .card-actions {
        display: flex;
        gap: 8px;
        margin-top: 15px;
      }

      .card-actions button {
        padding: 6px 12px;
        font-size: 12px;
      }

      .delete {
        background: #dc3545 !important;
        color: white;
      }

      .delete:hover {
        background: #c82333 !important;
      }

      .empty-state {
        text-align: center;
        padding: 40px;
        color: #6c757d;
      }

      @media (max-width: 768px) {
        .container {
          padding: 15px;
        }

        .form-actions {
          flex-direction: column;
        }

        .pets-grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
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
