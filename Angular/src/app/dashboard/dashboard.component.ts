import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Posts } from '../shared/models/posts';
import { ApiService } from '../shared/services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  protected _onDestroy = new Subject<void>();
  userFeed!: Posts[];
  modal: boolean = false;
  modal2: boolean = false;
  id!: number;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getUserFeed();
  }

  openModal2(id:number) {
    this.id=id;
    this.modal2 = true;
  }

  openModal() {
    this.modal = true;
  }

  getUserFeed() {
    this.apiService.getFeed().pipe(takeUntil(this._onDestroy)).subscribe({
      next: (res: any) => {
        this.userFeed = res;
        console.log(this.userFeed)
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    })
  }

  

  deletePosts(postId: number) {
    console.log("delete clicked")
    this.apiService.deletePost(postId).subscribe();
    this.getUserFeed();
    window.location.reload();
  };

  onSubmit(event: Event): void {
    event.preventDefault();
    this.modal = false;
    const form = event.target as HTMLFormElement;
    const title = (form.elements.namedItem('title') as HTMLInputElement).value;
    const description = (form.elements.namedItem('description') as HTMLInputElement).value;

    this.apiService.addPost(title, description).subscribe(
      {
        next: () => {
            this.getUserFeed(); // Refresh the feed after update
        },
        error: (err) => {
            console.error('Update failed', err); // Log any errors
        }
    }
    );
    window.location.reload();
  }

  onUpdate(event: Event): void {
    event.preventDefault();
    this.modal2 = false;
    const form = event.target as HTMLFormElement;
    const title = (form.elements.namedItem('title') as HTMLInputElement).value;
    const description = (form.elements.namedItem('description') as HTMLInputElement).value;
    

    this.apiService.updatePost(title, description, this.id).subscribe({
        next: () => {
            this.getUserFeed(); 
        },
        error: (err) => {
            console.error('Update failed', err); 
        }
    });
}


  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

}
