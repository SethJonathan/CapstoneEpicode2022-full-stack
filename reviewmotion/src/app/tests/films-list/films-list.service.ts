import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Film } from '../models/Film';

@Injectable()
export class FilmsListService {
  private resourceUrl = 'http://localhost:8082/films';

  filmsubject = new BehaviorSubject<Film[]>([])
  Filmobs = this.filmsubject.asObservable()

  constructor(private http: HttpClient) { }

  updateListaFilm(f: Film[]){
    this.filmsubject.next(f)
  }

  create(film: Film): Observable<Film>{
    const copy = this.convert(film);
    return this.http.post<Film>(this.resourceUrl, copy);
  }

  update(film: Film): Observable<Film>{
    const copy = this.convert(film);
    return this.http.put<Film>(`${this.resourceUrl}/${copy.id}`, copy);
  }

  find(id: number): Observable<Film>{
    return this.http.get<Film>(`${this.resourceUrl}/${id}`);
  }

  findAll(): void{
    //return this.http.get<Film[]>(this.resourceUrl);
    this.http.get<Film[]>(this.resourceUrl).subscribe(f => this.filmsubject.next(f))
  }

  delete(id: number | undefined): Observable<HttpResponse<any>>{
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }

  private convert(film: Film): Film{
    const copy: Film = Object.assign({}, film);
    return copy;
  }
}
