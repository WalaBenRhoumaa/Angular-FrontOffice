import { Component, OnInit } from '@angular/core';
import { ReactsService } from 'src/Core/services/reacts.service';

@Component({
  selector: 'app-react-list',
  templateUrl: './react-list.component.html',
  styleUrls: ['./react-list.component.css']
})
export class ReactListComponent implements OnInit {
  reacts: any[] = [];
  errorMessage: string = '';

  constructor(private reactsService: ReactsService) {}

  ngOnInit(): void {
    this.reactsService.getAllReacts().subscribe(
      (data) => {
        this.reacts = data;
      },
      (error) => {
        console.error('Error loading reacts', error);
        this.errorMessage = 'Failed to load reacts. Please check the console for more details.';
      }
    );
  }
}
