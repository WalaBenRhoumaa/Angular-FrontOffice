import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/Core/Models/feedback';
import { Reaction, Reacts } from 'src/Core/Models/reacts';
import { FeedbackService } from 'src/Core/services/feedbacks.service';
import { ReactsService } from 'src/Core/services/reacts.service';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit {
  feedbacks: Feedback[] = [];
  errorMessage: string = '';
  reactions: Reaction[] = ['LIKE', 'DISLIKE', 'LOVE', 'LAUGH', 'SAD', 'ANGRY'];

  // Mapping reaction type to emojis
  reactionEmojis: { [key in Reaction]: string } = {
    LIKE: '👍',
    DISLIKE: '👎',
    LOVE: '❤️',
    LAUGH: '😂',
    SAD: '😢',
    ANGRY: '😡'
  };

  constructor(
    private feedbackService: FeedbackService,
    private reactsService: ReactsService
  ) {}

  ngOnInit(): void {
    this.feedbackService.getAllFeedbacks().subscribe(
      (data) => {
        this.feedbacks = data;
      },
      (error) => {
        console.error('Error loading feedbacks', error);
        this.errorMessage = 'Failed to load feedbacks';
      }
    );
  }

  // Add reaction to a feedback
  addReaction(feedback: Feedback, reactionType: Reaction): void {
    const react = {
      reaction: reactionType,
      date: new Date().toISOString(),
      user: { id: 1 }, // Only send the ID
      feedback: { id: feedback.id } // Only send the ID
    };
  
    this.reactsService.addReaction(react).subscribe(
      (response: any) => {
        console.log('Reaction added successfully', response);
        this.ngOnInit();
      },
      (error: any) => {
        console.error('Error adding reaction', error);
        this.errorMessage = 'Failed to add reaction';
      }
    );
  }
  

  // Get emoji for a given reaction
  getReactionEmoji(reaction: Reaction): string {
    return this.reactionEmojis[reaction] || '❓';  // Return a default emoji if reaction is not found
  }
  reactionButtonEmojis: { [key in Reaction]: { emoji: string, label: string } } = {
    LIKE: { emoji: '👍', label: 'Like' },
    DISLIKE: { emoji: '👎', label: 'Dislike' },
    LOVE: { emoji: '❤️', label: 'Love' },
    LAUGH: { emoji: '😂', label: 'Laugh' },
    SAD: { emoji: '😢', label: 'Sad' },
    ANGRY: { emoji: '😡', label: 'Angry' },
  };

  // Get emoji and label for a given reaction type
  getButtonEmoji(reaction: Reaction): string {
    return this.reactionButtonEmojis[reaction]?.emoji || '❓';
  }

  getButtonLabel(reaction: Reaction): string {
    return this.reactionButtonEmojis[reaction]?.label || 'Unknown';
  }


  // Mouse over event handler
  onMouseOver(event: MouseEvent): void {
    const emojiElement = event.target as HTMLElement;
    emojiElement.style.transform = 'scale(1.5)';  // Enlarge the emoji
  }

  // Mouse out event handler
  onMouseOut(event: MouseEvent): void {
    const emojiElement = event.target as HTMLElement;
    emojiElement.style.transform = 'scale(1)';  // Reset the emoji to original size
  }
  scaleUp(event: MouseEvent): void {
    const button = event.target as HTMLElement;
    button.style.transition = 'transform 0.2s ease'; // Smooth transition
    button.style.transform = 'scale(1.2)'; // Scale up by 1.2 times
  }
  
  scaleDown(event: MouseEvent): void {
    const button = event.target as HTMLElement;
    button.style.transition = 'transform 0.2s ease'; // Smooth transition
    button.style.transform = 'scale(1)'; // Reset to original size
  }
  

}

