import { Component, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

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
    MatButtonModule,
  ],
  template: `
    <mat-toolbar color="primary"> Angular Forms with Signals </mat-toolbar>

    <div class="container">
      <mat-form-field>
        <input
          [formControl]="firstNameControl"
          matInput
          placeholder="First Name"
        />
        <mat-error *ngIf="firstNameControl.hasError('required')">
          This field is required
        </mat-error>
      </mat-form-field>
      <mat-form-field>
        <input
          [formControl]="lastNameControl"
          matInput
          placeholder="Last Name"
        />
        <mat-error *ngIf="lastNameControl.hasError('required')">
          This field is required
        </mat-error>
      </mat-form-field>

      <h3>Full Name: {{ fullName() }}</h3>

      <button mat-raised-button (click)="firstName.set('Zoaib')">
        Set First Name to 'Zoaib'
      </button>
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
  firstNameControl = new FormControl('', Validators.required);
  lastNameControl = new FormControl('', Validators.required);

  firstName = signal('');
  lastName = signal('');

  fullName = computed(() => `${this.firstName()} ${this.lastName()}`);

  constructor() {
    effect(() => {
      this.firstNameControl.patchValue(this.firstName(), { emitEvent: false });
      this.lastNameControl.patchValue(this.lastName(), { emitEvent: false });
    });

    this.firstNameControl.valueChanges.subscribe((val) =>
      this.firstName.set(val ?? '')
    );
    this.lastNameControl.valueChanges.subscribe((val) =>
      this.lastName.set(val ?? '')
    );
  }
}
