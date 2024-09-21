import { Component } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { Subject, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { Posts } from '../shared/models/posts';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule,MatProgressBarModule],
templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent {

  postList! : Posts[];
  isLoading: boolean = false;
  protected _onDestroy = new Subject<void>();
  constructor(private apiService: ApiService){}

  ngOnInit(): void {
    this.getUsersData();
}

getUsersData(){
  
  this.isLoading = true;
  this.apiService.getPost()
  .pipe(takeUntil(this._onDestroy))
  .subscribe(
    {
      next: (res: any) =>{
        console.log(res);
        this.postList = res;
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) =>{
        this.isLoading = false;
      }
    }
  )
};

onImageError(event: any){
  event.target.src = 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png';
};


ngOnDestroy(): void{
  this._onDestroy.next();
  this._onDestroy.complete();
};





}
