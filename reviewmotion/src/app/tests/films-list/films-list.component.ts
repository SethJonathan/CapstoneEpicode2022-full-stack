import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
//import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
import { Film } from '../models/Film';
import { FilmsListService } from './films-list.service';


@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.scss']
})
export class FilmsListComponent implements OnInit {
  @Input() refresh!: () => void;

  //aggiungere [refresh]="this.loadAll() all'html in app-films-form tag
  filmList: Film[] = [];
  result: string = '';
  films$!: Observable<Film[]>;

  constructor(
    private filmsListService: FilmsListService,
    //private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  loadAll = () => {
    this.filmsListService.findAll();
  }

  changeStatus(film: Film) {
    this.filmsListService.update(film)
    .subscribe(() => {
      this.filmsListService.findAll();
    });
    alert('Changed Status')
  }

  deleteFilm(film: Film){
    this.filmsListService.delete(film.id)
    .subscribe(() =>{
      this.filmsListService.findAll();
    });
    alert('Film cancelled')
  }

  cancel(): void{
    alert('Click cancelled')
  }

  confirmDialog(film: Film): void {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      console.log(dialogResult);
      if (dialogResult == true){
        this.deleteFilm(film)  
      }})
  }
  
  


  ngOnInit(): void {
    //this.films$ = this.filmsListService.findAll();
    this.filmsListService.Filmobs.subscribe( f => {
      this.filmList = f;
    })
    //this.films$ = this.filmsListService.Filmobs
    this.filmsListService.findAll()
  }

}
