import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from 'src/Core/services/feedbacks.service';


@Component({
  selector: 'app-addfeedback',
  templateUrl: './addfeedback.component.html',
  styleUrls: ['./addfeedback.component.css']
})
export class AddfeedbackComponent implements OnInit {
  feedbackForm: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder, private feedbackService: FeedbackService) {}
  ngOnInit(): void {
    this.feedbackForm = this.fb.group({
      message: ['', [Validators.required, Validators.maxLength(500)]],
      itemId: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.feedbackForm.valid) {
      const feedbackData = this.feedbackForm.value;
      this.feedbackService.addFeedback(feedbackData).subscribe(
        (response: any) => {
          console.log('Feedback submitted successfully!', response);
        },
        (error: any) => {
          console.error('Error submitting feedback', error);
        }
      );
    }
  }
}
