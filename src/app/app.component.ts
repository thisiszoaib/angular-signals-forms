import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
  ],
  template: `
    <mat-toolbar color="primary"> Angular Forms with Signals </mat-toolbar>

    <div class="container">
      <mat-form-field>
        <input
          #firstNameControl="ngModel"
          [ngModel]="firstName()"
          (ngModelChange)="firstName.set($event)"
          matInput
          placeholder="First Name"
          required
        />
        <mat-error *ngIf="firstNameControl.hasError('required')">
          This field is required
        </mat-error>
      </mat-form-field>
      <mat-form-field>
        <input
          #lastNameControl="ngModel"
          [ngModel]="lastName()"
          (ngModelChange)="lastName.set($event)"
          matInput
          placeholder="Last Name"
          required
        />
        <mat-error *ngIf="lastNameControl.hasError('required')">
          This field is required
        </mat-error>
      </mat-form-field>

      <h3>Full Name: {{ fullName() }}</h3>
    </div>
  `,
  styles: [
    `
      .container {
        padding: 24px;
        display: flex;
        flex-direction: column;
      }
    `,
  ],
})
export class AppComponent {
  firstName = signal('Zoaib');
  lastName = signal('');

  fullName = computed(() => `${this.firstName()} ${this.lastName()}`);

  constructor() {}
}
