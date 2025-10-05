import { Component, signal, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { PetsService } from '../../lib/modules/openapi/api/pets.service';
import { Pet } from '../../lib/modules/openapi/model/pet';
import { CreatePetDto } from '../../lib/modules/openapi/model/create-pet-dto';

@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss'],
})
export class PetListComponent implements OnInit, OnDestroy {
  private petsService = inject(PetsService);
  private destroy$ = new Subject<void>();

  pets = signal<Pet[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  editingPet = signal<Pet | null>(null);
  newPet = signal<CreatePetDto>({
    name: '',
    species: '',
    age: 0,
    description: '',
  });

  ngOnInit(): void {
    this.loadPets();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadPets(): void {
    this.loading.set(true);
    this.error.set(null);

    this.petsService.petsControllerFindAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (pets) => {
          this.pets.set(pets);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set(err?.message || 'Failed to load pets');
          this.loading.set(false);
        }
      });
  }

  onSubmit(): void {
    const petData = this.newPet();
    const editing = this.editingPet();
    this.loading.set(true);
    this.error.set(null);

    const operation = editing 
      ? this.petsService.petsControllerUpdate(editing.id, petData)
      : this.petsService.petsControllerCreate(petData);

    operation
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.resetForm();
          this.loadPets();
        },
        error: (err) => {
          this.error.set(err?.message || 'Failed to save pet');
          this.loading.set(false);
        }
      });
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

  deletePet(petId: number): void {
    if (!confirm('Are you sure you want to delete this pet?')) {
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.petsService.petsControllerRemove(petId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.loadPets();
        },
        error: (err) => {
          this.error.set(err?.message || 'Failed to delete pet');
          this.loading.set(false);
        }
      });
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
