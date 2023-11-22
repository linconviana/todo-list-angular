import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoSignalsService } from 'src/app/services/todo-signals.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule
  ],
  templateUrl: './todo-form.component.html',
  styleUrls: []
})
export class TodoFormComponent {

  /*constructor(
    private todosSignalsService: TodoSignalsService
  ){}*/

  /// :: injetando a dependencia do service apartir da versão do Angular 16
  private todosSignalsService = inject(TodoSignalsService);
  private dialogRefService = inject(MatDialogRef<HeaderComponent>);

  public allTodos = this.todosSignalsService.todosState();

  public todosForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  public handleCreateNewTodo(): void {

    if(this.todosForm.value && this.todosForm.valid){
      const title = String(this.todosForm.controls['title'].value);
      const description = String(this.todosForm.controls['description'].value);
      const id = this.allTodos.length > 0 ? this.allTodos.length + 1 : 1;
      const done = false;

      this.todosSignalsService.updateTodos({id, title, description, done});
      this.dialogRefService.close();
    }
  }

  handleCloseModal(): void {
    this.dialogRefService.close();
  }

  onSubmitTodo(): void {

  }
}
