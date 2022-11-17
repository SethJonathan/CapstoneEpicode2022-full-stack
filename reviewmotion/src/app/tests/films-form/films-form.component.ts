import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FilmsListService } from '../films-list/films-list.service';
import { Film } from '../models/Film';


@Component({
  selector: 'app-films-form',
  templateUrl: './films-form.component.html',
  styleUrls: ['./films-form.component.scss']
})
export class FilmsFormComponent implements OnInit {
  validateForm!: FormGroup;
  
  submitForm(value: { title: string, filmtype: string, description: string, summary: string, imgUrl: string}): void {
    for(const key in this.validateForm.controls){
      if(this.validateForm.controls.hasOwnProperty(key)){
        this.validateForm.controls[key].markAsDirty();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
    this.filmsListService.create(value)
    .subscribe(() => {
      alert('Film creato')
      //this.film$ = this.filmsListService.findAll();
      //this.refresh();
      this.filmsListService.findAll()
    });
    this.validateForm.reset();
  }

  constructor(private fb: FormBuilder,private filmsListService: FilmsListService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      filmtype: [null, [Validators.required]],
      description: [null, [Validators.required]],
      summary: [null, [Validators.required]],
      imgUrl: [null, [Validators.required]]
    })
  }

}
