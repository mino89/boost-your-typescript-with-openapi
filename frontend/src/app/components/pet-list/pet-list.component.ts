import { Component, inject, OnInit } from '@angular/core';import { Component, inject, OnInit } from '@angular/core';import { Component, inject, OnInit } from '@angular/core';import { Component, inject, OnInit } from '@angular/core';import { Component, inject, signal, OnInit } from '@angular/core';import { Component, inject, signal, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Pet, PetForm } from './models/pet.types';import { CommonModule } from '@angular/common';

import { PetListService } from './services/pet-list.service';

import { LoadingComponent } from './components/loading/loading.component';import { Pet, PetForm } from './models/pet.types';import { CommonModule } from '@angular/common';

import { ErrorComponent } from './components/error/error.component';

import { PetFormComponent } from './components/pet-form/pet-form.component';import { PetListService } from './services/pet-list.service';

import { PetListItemsComponent } from './components/pet-list-items/pet-list-items.component';

import { Pet, PetForm } from './models/pet.types';import { CommonModule } from '@angular/common';

@Component({

  selector: 'app-pet-list',// Component imports

  standalone: true,

  imports: [import { LoadingComponent } from './components/loading/loading.component';import { PetListService } from './services/pet-list.service';

    CommonModule,

    LoadingComponent,import { ErrorComponent } from './components/error/error.component';

    ErrorComponent,

    PetFormComponent,import { PetFormComponent } from './components/pet-form/pet-form.component';import { Pet, PetForm } from './models/pet.types';import { CommonModule } from '@angular/common';import { CommonModule } from '@angular/common';

    PetListItemsComponent

  ],import { PetListItemsComponent } from './components/pet-list-items/pet-list-items.component';

  template: `

    <div class="container">// Component imports

      <header>

        <h2>Pet Management</h2>@Component({

      </header>

  selector: 'app-pet-list',import { LoadingComponent } from './components/loading/loading.component';import { PetListService } from './services/pet-list.service';

      <app-pet-form

        [editingPet]="petListService.editingPet()"  standalone: true,

        (submit)="onFormSubmit($event)"

        (cancel)="onFormCancel()"  imports: [import { ErrorComponent } from './components/error/error.component';

      />

    CommonModule,

      @if (petListService.loading()) {

        <app-loading />    LoadingComponent,import { PetFormComponent } from './components/pet-form/pet-form.component';import { FormsModule } from '@angular/forms';import { FormsModule } from '@angular/forms';

      }

    ErrorComponent,

      @if (petListService.error()) {

        <app-error [message]="petListService.error()!" />    PetFormComponent,import { PetListItemsComponent } from './components/pet-list-items/pet-list-items.component';

      }

    PetListItemsComponent

      @if (!petListService.loading()) {

        <app-pet-list-items  ],// Component imports

          [pets]="petListService.pets()"

          (editPet)="onEditPet($event)"  template: `

          (deletePet)="onDeletePet($event)"

        />    <div class="pet-management">@Component({

      }

    </div>      <header class="pet-management-header">

  `,

  styles: [`        <h2>Pet Management System</h2>  selector: 'app-pet-list',import { LoadingComponent } from './components/loading/loading.component';import { ApiService } from '../../../lib/api/api.service';import { ApiService } from '../../../lib/api/api.service';

    .container {

      max-width: 800px;        <p class="subtitle">Manage your pets with our modern Angular 20 interface</p>

      margin: 0 auto;

      padding: 20px;      </header>  standalone: true,

    }

    header h2 {

      color: #333;

      margin-bottom: 20px;      <!-- Pet Form -->  imports: [import { ErrorComponent } from './components/error/error.component';

    }

  `]      <app-pet-form

})

export class PetListComponent implements OnInit {        [editingPet]="petListService.editingPet()"    CommonModule,

  readonly petListService = inject(PetListService);

        (submit)="onFormSubmit($event)"

  ngOnInit(): void {

    this.petListService.loadPets();        (cancel)="onFormCancel()"    LoadingComponent,import { PetFormComponent } from './components/pet-form/pet-form.component';import { components } from '../../../lib/api/types';import { components } from '../../../lib/api/types';

  }

      />

  async onFormSubmit(petForm: PetForm): Promise<void> {

    const editingPet = this.petListService.editingPet();    ErrorComponent,

    

    if (editingPet) {      <!-- Loading State -->

      await this.petListService.updatePet(editingPet.id, petForm);

    } else {      @if (petListService.loading()) {    PetFormComponent,import { PetListItemsComponent } from './components/pet-list-items/pet-list-items.component';

      await this.petListService.createPet(petForm);

    }        <app-loading />

  }

      }    PetListItemsComponent

  onFormCancel(): void {

    this.petListService.cancelEditing();

  }

      <!-- Error State -->  ],

  onEditPet(pet: Pet): void {

    this.petListService.startEditing(pet);      @if (petListService.error()) {

  }

        <app-error   template: `

  async onDeletePet(petId: number): Promise<void> {

    await this.petListService.deletePet(petId);          [message]="petListService.error()!"

  }

}        />    <div class="pet-management">@Component({

      }

      <header class="pet-management-header">

      <!-- Pet List -->

      @if (!petListService.loading()) {        <h2>Pet Management System</h2>  selector: 'app-pet-list',type Pet = components['schemas']['Pet'];type Pet = components['schemas']['Pet'];

        <app-pet-list-items

          [pets]="petListService.pets()"        <p class="subtitle">Manage your pets with our modern Angular 20 interface</p>

          (editPet)="onEditPet($event)"

          (deletePet)="onDeletePet($event)"      </header>  standalone: true,

        />

      }

    </div>

  `,      <!-- Pet Form -->  imports: [

  styles: [`

    .pet-management {      <app-pet-form

      max-width: 900px;

      margin: 0 auto;        [editingPet]="petListService.editingPet()"    CommonModule,

      padding: 20px;

      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;        (submit)="onFormSubmit($event)"

    }

        (cancel)="onFormCancel()"    LoadingComponent,@Component({@Component({

    .pet-management-header {

      text-align: center;      />

      margin-bottom: 32px;

      padding-bottom: 24px;    ErrorComponent,

      border-bottom: 1px solid #e9ecef;

    }      <!-- Loading State -->



    .pet-management-header h2 {      @if (petListService.loading()) {    PetFormComponent,  selector: 'app-pet-list',  selector: 'app-pet-list',

      color: #333;

      margin: 0 0 8px 0;        <app-loading />

      font-size: 2em;

      font-weight: 600;      }    PetListItemsComponent

    }



    .subtitle {

      color: #666;      <!-- Error State -->  ],  standalone: true,  standalone: true,

      margin: 0;

      font-size: 1em;      @if (petListService.error()) {

      opacity: 0.8;

    }        <app-error   template: `



    @media (max-width: 768px) {          [message]="petListService.error()!"

      .pet-management {

        padding: 16px;        />    <div class="pet-management">  imports: [CommonModule, FormsModule],  imports: [CommonModule, FormsModule],

      }

      }

      .pet-management-header h2 {

        font-size: 1.6em;      <header class="pet-management-header">

      }

      <!-- Pet List -->

      .subtitle {

        font-size: 0.9em;      @if (!petListService.loading()) {        <h2>Pet Management System</h2>  template: `  template: `

      }

    }        <app-pet-list-items

  `]

})          [pets]="petListService.pets()"        <p class="subtitle">Manage your pets with our modern Angular 20 interface</p>

export class PetListComponent implements OnInit {

  readonly petListService = inject(PetListService);          (editPet)="onEditPet($event)"



  ngOnInit(): void {          (deletePet)="onDeletePet($event)"      </header>    <div class="pet-management">    <div class="pet-management">

    this.petListService.loadPets();

  }        />



  async onFormSubmit(petForm: PetForm): Promise<void> {      }

    const editingPet = this.petListService.editingPet();

        </div>

    if (editingPet) {

      // Update existing pet  `,      <!-- Pet Form -->      <h2>Pet Management</h2>      <h2>Pet Management</h2>

      await this.petListService.updatePet(editingPet.id, petForm);

    } else {  styles: [`

      // Create new pet

      await this.petListService.createPet(petForm);    .pet-management {      <app-pet-form

    }

  }      max-width: 900px;



  onFormCancel(): void {      margin: 0 auto;        [editingPet]="petListService.editingPet()"            

    this.petListService.cancelEditing();

  }      padding: 20px;



  onEditPet(pet: Pet): void {      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,         (submit)="onFormSubmit($event)"

    this.petListService.startEditing(pet);

  }                   'Helvetica Neue', Arial, sans-serif;



  async onDeletePet(petId: number): Promise<void> {    }        (cancel)="onFormCancel()"      <!-- Add Pet Form -->      <!-- Add Pet Form -->

    await this.petListService.deletePet(petId);

  }

}
    .pet-management-header {      />

      text-align: center;

      margin-bottom: 32px;      <div class="add-pet-form">      <div class="add-pet-form">

      padding-bottom: 24px;

      border-bottom: 1px solid #e9ecef;      <!-- Loading State -->

    }

      @if (petListService.loading()) {        <h3>Add New Pet</h3>        <h3>Add New Pet</h3>

    .pet-management-header h2 {

      color: #333;        <app-loading />

      margin: 0 0 8px 0;

      font-size: 2em;      }        <form (ngSubmit)="addPet()" #petForm="ngForm">        <form (ngSubmit)="addPet()" #petForm="ngForm">

      font-weight: 600;

    }



    .subtitle {      <!-- Error State -->          <div class="form-group">          <div class="form-group">

      color: #666;

      margin: 0;      @if (petListService.error()) {

      font-size: 1em;

      opacity: 0.8;        <app-error             <label for="name">Name:</label>            <label for="name">Name:</label>

    }

          [message]="petListService.error()!"

    /* Responsive design */

    @media (max-width: 768px) {        />            <input             <input 

      .pet-management {

        padding: 16px;      }

      }

              id="name"              id="name"

      .pet-management-header h2 {

        font-size: 1.6em;      <!-- Pet List -->

      }

      @if (!petListService.loading()) {              type="text"               type="text" 

      .subtitle {

        font-size: 0.9em;        <app-pet-list-items

      }

    }          [pets]="petListService.pets()"              [(ngModel)]="newPet.name"               [(ngModel)]="newPet.name" 

  `]

})          (editPet)="onEditPet($event)"

export class PetListComponent implements OnInit {

  readonly petListService = inject(PetListService);          (deletePet)="onDeletePet($event)"              name="name"              name="name"



  ngOnInit(): void {        />

    this.petListService.loadPets();

  }      }              required               required 



  async onFormSubmit(petForm: PetForm): Promise<void> {    </div>

    const editingPet = this.petListService.editingPet();

      `,              placeholder="Enter pet name"              placeholder="Enter pet name"

    if (editingPet) {

      // Update existing pet  styles: [`

      await this.petListService.updatePet(editingPet.id, petForm);

    } else {    .pet-management {            />            />

      // Create new pet

      await this.petListService.createPet(petForm);      max-width: 900px;

    }

  }      margin: 0 auto;          </div>          </div>



  onFormCancel(): void {      padding: 20px;

    this.petListService.cancelEditing();

  }      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,                     



  onEditPet(pet: Pet): void {                   'Helvetica Neue', Arial, sans-serif;

    this.petListService.startEditing(pet);

  }    }          <div class="form-group">          <div class="form-group">



  async onDeletePet(petId: number): Promise<void> {

    await this.petListService.deletePet(petId);

  }    .pet-management-header {            <label for="species">Species:</label>            <label for="species">Species:</label>

}
      text-align: center;

      margin-bottom: 32px;            <input             <input 

      padding-bottom: 24px;

      border-bottom: 1px solid #e9ecef;              id="species"              id="species"

    }

              type="text"               type="text" 

    .pet-management-header h2 {

      color: #333;              [(ngModel)]="newPet.species"               [(ngModel)]="newPet.species" 

      margin: 0 0 8px 0;

      font-size: 2em;              name="species"              name="species"

      font-weight: 600;

    }              required               required 



    .subtitle {              placeholder="Enter species (e.g., Dog, Cat)"              placeholder="Enter species (e.g., Dog, Cat)"

      color: #666;

      margin: 0;            />            />

      font-size: 1em;

      opacity: 0.8;          </div>          </div>

    }

                    

    /* Responsive design */

    @media (max-width: 768px) {          <div class="form-group">          <div class="form-group">

      .pet-management {

        padding: 16px;            <label for="age">Age:</label>            <label for="age">Age:</label>

      }

            <input             <input 

      .pet-management-header h2 {

        font-size: 1.6em;              id="age"              id="age"

      }

              type="number"               type="number" 

      .subtitle {

        font-size: 0.9em;              [(ngModel)]="newPet.age"               [(ngModel)]="newPet.age" 

      }

    }              name="age"              name="age"

  `]

})              required               required 

export class PetListComponent implements OnInit {

  readonly petListService = inject(PetListService);              min="0"              min="0"



  ngOnInit(): void {              placeholder="Enter age"              placeholder="Enter age"

    this.petListService.loadPets();

  }            />            />



  async onFormSubmit(petForm: PetForm): Promise<void> {          </div>          </div>

    const editingPet = this.petListService.editingPet();

                        

    if (editingPet) {

      // Update existing pet          <div class="form-group">          <div class="form-group">

      await this.petListService.updatePet(editingPet.id, petForm);

    } else {            <label for="description">Description:</label>            <label for="description">Description:</label>

      // Create new pet

      await this.petListService.createPet(petForm);            <textarea             <textarea 

    }

  }              id="description"              id="description"



  onFormCancel(): void {              [(ngModel)]="newPet.description"               [(ngModel)]="newPet.description" 

    this.petListService.cancelEditing();

  }              name="description"              name="description"



  onEditPet(pet: Pet): void {              placeholder="Optional description"              placeholder="Optional description"

    this.petListService.startEditing(pet);

  }              rows="3"              rows="3"



  async onDeletePet(petId: number): Promise<void> {            ></textarea>            ></textarea>

    await this.petListService.deletePet(petId);

  }          </div>          </div>

}
                    

          <button type="submit" [disabled]="!petForm.form.valid" class="btn btn-primary">          <button type="submit" [disabled]="!petForm.form.valid" class="btn btn-primary">

            Add Pet            Add Pet

          </button>          </button>

        </form>        </form>

      </div>      </div>



      <!-- Loading State -->      <!-- Loading State -->

      @if (loading()) {      @if (loading()) {

        <div class="loading">Loading pets...</div>        <div class="loading">Loading pets...</div>

      }      }



      <!-- Error State -->      <!-- Error State -->

      @if (error()) {      @if (error()) {

        <div class="error">{{ error() }}</div>        <div class="error">{{ error() }}</div>

      }      }



      <!-- Pet List -->      <!-- Pet List -->

      @if (!loading() && pets().length > 0) {      @if (!loading() && pets().length > 0) {

        <div class="pet-list">        <div class="pet-list">

          <h3>Pet List</h3>          <h3>Pet List</h3>

          @for (pet of pets(); track pet.id) {          @for (pet of pets(); track pet.id) {

            <div class="pet-card">            <div class="pet-card">

              @if (editingPet() === pet.id) {              @if (editingPet() === pet.id) {

                <!-- Edit Form -->                <!-- Edit Form -->

                <form (ngSubmit)="updatePet(pet.id)" class="edit-form">                <form (ngSubmit)="updatePet(pet.id)" class="edit-form">

                  <div class="form-group">                  <div class="form-group">

                    <label>Name:</label>                    <label>Name:</label>

                    <input                     <input 

                      type="text"                       type="text" 

                      [(ngModel)]="editForm.name"                       [(ngModel)]="editForm.name" 

                      name="editName"                      name="editName"

                      required                       required 

                    />                    />

                  </div>                  </div>

                                    

                  <div class="form-group">                  <div class="form-group">

                    <label>Species:</label>                    <label>Species:</label>

                    <input                     <input 

                      type="text"                       type="text" 

                      [(ngModel)]="editForm.species"                       [(ngModel)]="editForm.species" 

                      name="editSpecies"                      name="editSpecies"

                      required                       required 

                    />                    />

                  </div>                  </div>

                                    

                  <div class="form-group">                  <div class="form-group">

                    <label>Age:</label>                    <label>Age:</label>

                    <input                     <input 

                      type="number"                       type="number" 

                      [(ngModel)]="editForm.age"                       [(ngModel)]="editForm.age" 

                      name="editAge"                      name="editAge"

                      required                       required 

                      min="0"                      min="0"

                    />                    />

                  </div>                  </div>

                                    

                  <div class="form-group">                  <div class="form-group">

                    <label>Description:</label>                    <label>Description:</label>

                    <textarea                     <textarea 

                      [(ngModel)]="editForm.description"                       [(ngModel)]="editForm.description" 

                      name="editDescription"                      name="editDescription"

                      rows="2"                      rows="2"

                    ></textarea>                    ></textarea>

                  </div>                  </div>

                                    

                  <div class="form-actions">                  <div class="form-actions">

                    <button type="submit" class="btn btn-success">Save</button>                    <button type="submit" class="btn btn-success">Save</button>

                    <button type="button" (click)="cancelEdit()" class="btn btn-secondary">Cancel</button>                    <button type="button" (click)="cancelEdit()" class="btn btn-secondary">Cancel</button>

                  </div>                  </div>

                </form>                </form>

              } @else {              } @else {

                <!-- Display Mode -->                <!-- Display Mode -->

                <div class="pet-info">                <div class="pet-info">

                  <h4>{{ pet.name }}</h4>                  <h4>{{ pet.name }}</h4>

                  <p><strong>Species:</strong> {{ pet.species }}</p>                  <p><strong>Species:</strong> {{ pet.species }}</p>

                  <p><strong>Age:</strong> {{ pet.age }} year{{ pet.age !== 1 ? 's' : '' }} old</p>                  <p><strong>Age:</strong> {{ pet.age }} year{{ pet.age !== 1 ? 's' : '' }} old</p>

                  @if (pet.description) {                  @if (pet.description) {

                    <p><strong>Description:</strong> {{ pet.description }}</p>                    <p><strong>Description:</strong> {{ pet.description }}</p>

                  }                  }

                </div>                </div>

                                

                <div class="pet-actions">                <div class="pet-actions">

                  <button (click)="startEdit(pet)" class="btn btn-edit">Edit</button>                  <button (click)="startEdit(pet)" class="btn btn-edit">Edit</button>

                  <button (click)="deletePet(pet.id)" class="btn btn-danger">Delete</button>                  <button (click)="deletePet(pet.id)" class="btn btn-danger">Delete</button>

                </div>                </div>

              }              }

            </div>            </div>

          }          }

        </div>        </div>

      }      }



      <!-- Empty State -->      <!-- Empty State -->

      @if (!loading() && pets().length === 0 && !error()) {      @if (!loading() && pets().length === 0 && !error()) {

        <div class="empty-state">        <div class="empty-state">

          <p>No pets found. Add your first pet above!</p>          <p>No pets found. Add your first pet above!</p>

        </div>        </div>

      }      }

    </div>    </div>

  `,  `,

  styles: [`  styles: [`

    .pet-management {    .pet-management {

      max-width: 800px;      max-width: 800px;

      margin: 0 auto;      margin: 0 auto;

      padding: 20px;      padding: 20px;

      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

    }    }



    h2, h3 {    h2, h3 {

      color: #333;      color: #333;

      margin-bottom: 20px;      margin-bottom: 20px;

    }    }



    .add-pet-form {    .add-pet-form {

      background: #f8f9fa;      background: #f8f9fa;

      padding: 20px;      padding: 20px;

      border-radius: 8px;      border-radius: 8px;

      margin-bottom: 30px;      margin-bottom: 30px;

      border: 1px solid #e9ecef;      border: 1px solid #e9ecef;

    }    }



    .form-group {    .form-group {

      margin-bottom: 15px;      margin-bottom: 15px;

    }    }



    label {    label {

      display: block;      display: block;

      margin-bottom: 5px;      margin-bottom: 5px;

      font-weight: 500;      font-weight: 500;

      color: #555;      color: #555;

    }    }



    input, textarea {    input, textarea {

      width: 100%;      width: 100%;

      padding: 8px 12px;      padding: 8px 12px;

      border: 1px solid #ddd;      border: 1px solid #ddd;

      border-radius: 4px;      border-radius: 4px;

      font-size: 14px;      font-size: 14px;

      box-sizing: border-box;      box-sizing: border-box;

    }    }



    input:focus, textarea:focus {    input:focus, textarea:focus {

      outline: none;      outline: none;

      border-color: #0066cc;      border-color: #0066cc;

      box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.2);      box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.2);

    }    }



    .btn {    .btn {

      padding: 8px 16px;      padding: 8px 16px;

      border: none;      border: none;

      border-radius: 4px;      border-radius: 4px;

      cursor: pointer;      cursor: pointer;

      font-size: 14px;      font-size: 14px;

      font-weight: 500;      font-weight: 500;

      transition: background-color 0.2s;      transition: background-color 0.2s;

      margin-right: 8px;      margin-right: 8px;

    }    }



    .btn:disabled {    .btn:disabled {

      opacity: 0.6;      opacity: 0.6;

      cursor: not-allowed;      cursor: not-allowed;

    }    }



    .btn-primary {    .btn-primary {

      background-color: #0066cc;      background-color: #0066cc;

      color: white;      color: white;

    }    }



    .btn-primary:hover:not(:disabled) {    .btn-primary:hover:not(:disabled) {

      background-color: #0052a3;      background-color: #0052a3;

    }    }



    .btn-success {    .btn-success {

      background-color: #28a745;      background-color: #28a745;

      color: white;      color: white;

    }    }



    .btn-success:hover {    .btn-success:hover {

      background-color: #218838;      background-color: #218838;

    }    }



    .btn-secondary {    .btn-secondary {

      background-color: #6c757d;      background-color: #6c757d;

      color: white;      color: white;

    }    }



    .btn-secondary:hover {    .btn-secondary:hover {

      background-color: #5a6268;      background-color: #5a6268;

    }    }



    .btn-edit {    .btn-edit {

      background-color: #17a2b8;      background-color: #17a2b8;

      color: white;      color: white;

    }    }



    .btn-edit:hover {    .btn-edit:hover {

      background-color: #138496;      background-color: #138496;

    }    }



    .btn-danger {    .btn-danger {

      background-color: #dc3545;      background-color: #dc3545;

      color: white;      color: white;

    }    }



    .btn-danger:hover {    .btn-danger:hover {

      background-color: #c82333;      background-color: #c82333;

    }    }



    .loading, .error {    .loading, .error {

      text-align: center;      text-align: center;

      padding: 20px;      padding: 20px;

      margin: 20px 0;      margin: 20px 0;

    }    }



    .error {    .error {

      color: #dc3545;      color: #dc3545;

      background-color: #f8d7da;      background-color: #f8d7da;

      border: 1px solid #f5c6cb;      border: 1px solid #f5c6cb;

      border-radius: 4px;      border-radius: 4px;

    }    }



    .pet-list h3 {    .pet-list h3 {

      border-bottom: 2px solid #0066cc;      border-bottom: 2px solid #0066cc;

      padding-bottom: 8px;      padding-bottom: 8px;

    }    }



    .pet-card {    .pet-card {

      background: white;      background: white;

      border: 1px solid #e9ecef;      border: 1px solid #e9ecef;

      border-radius: 8px;      border-radius: 8px;

      padding: 20px;      padding: 20px;

      margin-bottom: 15px;      margin-bottom: 15px;

      box-shadow: 0 2px 4px rgba(0,0,0,0.1);      box-shadow: 0 2px 4px rgba(0,0,0,0.1);

      display: flex;      display: flex;

      justify-content: space-between;      justify-content: space-between;

      align-items: flex-start;      align-items: flex-start;

    }    }



    .pet-info h4 {    .pet-info h4 {

      margin: 0 0 10px 0;      margin: 0 0 10px 0;

      color: #0066cc;      color: #0066cc;

      font-size: 1.2em;      font-size: 1.2em;

    }    }



    .pet-info p {    .pet-info p {

      margin: 5px 0;      margin: 5px 0;

      color: #666;      color: #666;

    }    }



    .pet-actions {    .pet-actions {

      display: flex;      display: flex;

      gap: 8px;      gap: 8px;

      flex-shrink: 0;      flex-shrink: 0;

    }    }



    .edit-form {    .edit-form {

      width: 100%;      width: 100%;

    }    }



    .edit-form .form-group {    .edit-form .form-group {

      margin-bottom: 10px;      margin-bottom: 10px;

    }    }



    .edit-form input, .edit-form textarea {    .edit-form input, .edit-form textarea {

      font-size: 13px;      font-size: 13px;

      padding: 6px 10px;      padding: 6px 10px;

    }    }



    .form-actions {    .form-actions {

      margin-top: 15px;      margin-top: 15px;

    }    }



    .empty-state {    .empty-state {

      text-align: center;      text-align: center;

      padding: 40px 20px;      padding: 40px 20px;

      color: #666;      color: #666;

      font-style: italic;      font-style: italic;

    }    }



    @media (max-width: 600px) {    @media (max-width: 600px) {

      .pet-card {      .pet-card {

        flex-direction: column;        flex-direction: column;

        gap: 15px;        gap: 15px;

      }      }



      .pet-actions {      .pet-actions {

        align-self: flex-start;        align-self: flex-start;

      }      }

    }    }

  `]  `]

})})

export class PetListComponent implements OnInit {export class PetListComponent implements OnInit {

  private apiService = inject(ApiService);  private apiService = inject(ApiService);



  pets = signal<Pet[]>([]);  pets = signal<Pet[]>([]);

  loading = signal(false);  loading = signal(false);

  error = signal<string | null>(null);  error = signal<string | null>(null);

  editingPet = signal<number | null>(null);  editingPet = signal<number | null>(null);



  newPet = {  newPet = {

    name: '',    name: '',

    species: '',    species: '',

    age: 0,    age: 0,

    description: ''    description: ''

  };  };



  editForm = {  editForm = {

    name: '',    name: '',

    species: '',    species: '',

    age: 0,    age: 0,

    description: ''    description: ''

  };  };



  ngOnInit() {  ngOnInit() {

    this.loadPets();    this.loadPets();

  }  }



  async loadPets() {  async loadPets() {

    this.loading.set(true);    this.loading.set(true);

    this.error.set(null);    this.error.set(null);

        

    try {    try {

      const pets = await this.apiService.getPets();      const pets = await this.apiService.getPets();

      this.pets.set(pets || []);      this.pets.set(pets || []);

    } catch (err) {    } catch (err) {

      this.error.set(err instanceof Error ? err.message : 'Failed to load pets');      this.error.set(err instanceof Error ? err.message : 'Failed to load pets');

    } finally {    } finally {

      this.loading.set(false);      this.loading.set(false);

    }    }

  }  }



  async addPet() {  async addPet() {

    if (!this.newPet.name || !this.newPet.species || this.newPet.age < 0) {    if (!this.newPet.name || !this.newPet.species || this.newPet.age < 0) {

      return;      return;

    }    }



    try {    try {

      const pet = await this.apiService.createPet({      const pet = await this.apiService.createPet({

        name: this.newPet.name,        name: this.newPet.name,

        species: this.newPet.species,        species: this.newPet.species,

        age: this.newPet.age,        age: this.newPet.age,

        description: this.newPet.description || undefined        description: this.newPet.description || undefined

      });      });

            

      // Add to local state      // Add to local state

      this.pets.update(pets => [...pets, pet]);      this.pets.update(pets => [...pets, pet]);

            

      // Reset form      // Reset form

      this.newPet = {      this.newPet = {

        name: '',        name: '',

        species: '',        species: '',

        age: 0,        age: 0,

        description: ''        description: ''

      };      };

    } catch (err) {    } catch (err) {

      this.error.set(err instanceof Error ? err.message : 'Failed to add pet');      this.error.set(err instanceof Error ? err.message : 'Failed to add pet');

    }    }

  }  }



  startEdit(pet: Pet) {  startEdit(pet: Pet) {

    this.editingPet.set(pet.id);    this.editingPet.set(pet.id);

    this.editForm = {    this.editForm = {

      name: pet.name,      name: pet.name,

      species: pet.species,      species: pet.species,

      age: pet.age,      age: pet.age,

      description: pet.description || ''      description: pet.description || ''

    };    };

  }  }



  cancelEdit() {  cancelEdit() {

    this.editingPet.set(null);    this.editingPet.set(null);

  }  }



  async updatePet(petId: number) {  async updatePet(petId: number) {

    try {    try {

      const updatedPet = await this.apiService.updatePet(petId, {      const updatedPet = await this.apiService.updatePet(petId, {

        name: this.editForm.name,        name: this.editForm.name,

        species: this.editForm.species,        species: this.editForm.species,

        age: this.editForm.age,        age: this.editForm.age,

        description: this.editForm.description || undefined        description: this.editForm.description || undefined

      });      });

            

      // Update local state      // Update local state

      this.pets.update(pets =>       this.pets.update(pets => 

        pets.map(pet => pet.id === petId ? updatedPet : pet)        pets.map(pet => pet.id === petId ? updatedPet : pet)

      );      );

            

      this.editingPet.set(null);      this.editingPet.set(null);

    } catch (err) {    } catch (err) {

      this.error.set(err instanceof Error ? err.message : 'Failed to update pet');      this.error.set(err instanceof Error ? err.message : 'Failed to update pet');

    }    }

  }  }



  async deletePet(petId: number) {  async deletePet(petId: number) {

    if (!confirm('Are you sure you want to delete this pet?')) {    if (!confirm('Are you sure you want to delete this pet?')) {

      return;      return;

    }    }



    try {    try {

      await this.apiService.deletePet(petId);      await this.apiService.deletePet(petId);

            

      // Remove from local state      // Remove from local state

      this.pets.update(pets => pets.filter(pet => pet.id !== petId));      this.pets.update(pets => pets.filter(pet => pet.id !== petId));

    } catch (err) {    } catch (err) {

      this.error.set(err instanceof Error ? err.message : 'Failed to delete pet');      this.error.set(err instanceof Error ? err.message : 'Failed to delete pet');

    }    }

  }  }

}}