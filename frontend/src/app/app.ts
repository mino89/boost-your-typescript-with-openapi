import { Component } from '@angular/core';
import { PetListComponent } from './components/pet-list.component';

@Component({
  selector: 'app-root',
  imports: [PetListComponent],
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1>Pet Store Application</h1>
        <p>OpenAPI + TypeScript Monorepo Demo with Angular 20</p>
      </header>
      <main class="app-main">
        <app-pet-list></app-pet-list>
      </main>
    </div>
  `,
  styles: [
    `
      .app-container {
        min-height: 100vh;
        background: #f8f9fa;
      }

      .app-header {
        background: #343a40;
        color: white;
        padding: 20px;
        text-align: center;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .app-header h1 {
        margin: 0 0 10px 0;
        font-size: 2em;
      }

      .app-header p {
        margin: 0;
        opacity: 0.8;
      }

      .app-main {
        padding: 20px;
      }
    `,
  ],
})
export class App {
  title = 'Pet Store';
}
