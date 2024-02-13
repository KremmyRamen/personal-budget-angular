import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSource: any;

  constructor(private http: HttpClient) {}

  fetchData(): Observable<any> {
    if (!this.dataSource) {
      return this.http.get('http://localhost:3000/budget').pipe(
        tap((data) => {
          this.dataSource = data; // Update data source if fetched successfully
        })
      );
    } else {
      return of(this.dataSource); // Return observable of existing data
    }
  }

  setData(data: any): void {
    this.dataSource = data;
  }

  getData(): any {
    return this.dataSource;
  }
}
