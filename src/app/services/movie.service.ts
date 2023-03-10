import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getTopRatedMovies(page = 1){
    return this.http.get(environment.baseUrl+"/movie/popular?api_key="+environment.apiKey+"&page="+page);
  }

  getMovieDetails(id:string){
      return this.http.get(environment.baseUrl+'/movie/'+id+'?api_key='+environment.apiKey);
  }

}
