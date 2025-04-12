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

  // Mapping des types de réactions aux émojis
  reactionEmojis: { [key in Reaction]: string } = {
    LIKE: '👍',
    DISLIKE: '👎',
    LOVE: '❤️',
    LAUGH: '😂',
    SAD: '😢',
    ANGRY: '😡'
  };

  reactionButtonEmojis: { [key in Reaction]: { emoji: string, label: string } } = {
    LIKE: { emoji: '👍', label: 'Like' },
    DISLIKE: { emoji: '👎', label: 'Dislike' },
    LOVE: { emoji: '❤️', label: 'Love' },
    LAUGH: { emoji: '😂', label: 'Laugh' },
    SAD: { emoji: '😢', label: 'Sad' },
    ANGRY: { emoji: '😡', label: 'Angry' },
  };

  defaultProfileImage = 'https://via.placeholder.com/40';
  activeFeedback: Feedback | null = null;
  selectedTab: Reaction | 'ALL' = 'ALL';

  constructor(
    private feedbackService: FeedbackService,
    private reactsService: ReactsService
  ) {}

  ngOnInit(): void {
    this.feedbackService.getAllFeedbacks().subscribe(
      (data: Feedback[]) => {
        this.feedbacks = data.map(fb => ({
          ...fb,
          showReacts: false
        }));
      },
      (error) => {
        console.error('Error loading feedbacks', error);
        this.errorMessage = 'Failed to load feedbacks';
      }
    );
  }

  addReaction(feedback: Feedback, reactionType: Reaction): void {
    const react = {
      reaction: reactionType,
      date: new Date().toISOString(),
      user: { id: 1 },
      feedback: { id: feedback.id }
    };

    this.reactsService.addReaction(react).subscribe(
      () => this.ngOnInit(),
      (error: any) => {
        console.error('Error adding reaction', error);
        this.errorMessage = 'Failed to add reaction';
      }
    );
  }

  getReactionEmoji(reaction: Reaction): string {
    return this.reactionEmojis[reaction] || '❓';
  }

  getButtonEmoji(reaction: Reaction): string {
    return this.reactionButtonEmojis[reaction]?.emoji || '❓';
  }

  getButtonLabel(reaction: Reaction): string {
    return this.reactionButtonEmojis[reaction]?.label || 'Unknown';
  }

  onMouseOver(event: MouseEvent): void {
    const emojiElement = event.target as HTMLElement;
    emojiElement.style.transform = 'scale(1.5)';
  }

  onMouseOut(event: MouseEvent): void {
    const emojiElement = event.target as HTMLElement;
    emojiElement.style.transform = 'scale(1)';
  }

  scaleUp(event: MouseEvent): void {
    const button = event.target as HTMLElement;
    button.style.transition = 'transform 0.2s ease';
    button.style.transform = 'scale(1.2)';
  }

  scaleDown(event: MouseEvent): void {
    const button = event.target as HTMLElement;
    button.style.transition = 'transform 0.2s ease';
    button.style.transform = 'scale(1)';
  }

  toggleReactsVisibility(feedback: Feedback): void {
    feedback.showReacts = !feedback.showReacts;
  }

  // Modal logic
  openReactionModal(feedback: Feedback): void {
    this.activeFeedback = feedback;
    this.selectedTab = 'ALL';
  }

  closeModal(): void {
    this.activeFeedback = null;
  }

  selectTab(type: Reaction | 'ALL'): void {
    this.selectedTab = type;
  }

  getReactionCount(reacts: Reacts[], type: Reaction): number {
    return reacts.filter(r => r.reaction === type).length;
  }

  get filteredReacts(): Reacts[] {
    if (!this.activeFeedback?.reacts) return [];
    if (this.selectedTab === 'ALL') return this.activeFeedback.reacts;
    return this.activeFeedback.reacts.filter(r => r.reaction === this.selectedTab);
  }
  
  trackByFeedbackId(index: number, item: Feedback): number {
    return item.id ?? index; // fallback to index if id is undefined
  }
  getInitials(name: string): string {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    const initials = parts.map(p => p.charAt(0).toUpperCase());
    return initials.slice(0, 2).join('');
  }
  
  
}