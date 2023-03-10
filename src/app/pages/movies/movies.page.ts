import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  movies = [];
  currentPage = 1;
  imageBaseUrl = environment.images;

  constructor(private movieService : MovieService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.loadMovies();
  }

  async loadMovies(event?){
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'bubbles'
    });
    
    this.movieService.getTopRatedMovies().subscribe((res : any) =>{
      loading.dismiss();
      this.movies.push(...res.results);

      event?.target.complete();
      if(event){
        event.target.disabled  = res.total_pages === this.currentPage;
      }

    })
    
  }

  loadMore(event){
    this.currentPage++;
    this.loadMovies(event)
  }

}
