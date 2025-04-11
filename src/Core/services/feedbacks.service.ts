import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../Models/feedback';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = 'http://localhost:8089/borrowit/feedbacks';

  constructor(private http: HttpClient) {}

  getAllFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/retrieve-all-feedbacks`);
  }

  addFeedback(feedbackData: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(`${this.apiUrl}/add-feedback`, feedbackData);
  }
}
