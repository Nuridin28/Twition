import { Component } from '@angular/core';
import { SidebarComponent } from '../../layouts/sidebar/sidebar.component';
import { AppFile } from '../../core/interfaces/file';
import { NotesService } from '../../core/services/notes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feed',
  imports: [SidebarComponent, CommonModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent {
  notes: any[] = [];
  loading = true;

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    this.loading = true;
    this.notesService.getNotes().subscribe({
      next: (notes) => {
        this.notes = notes;
        this.loading = false;
        console.log('first');
        console.log(this.notes);
      },
      error: (error) => {
        console.error('Error loading notes:', error);
        this.loading = false;
      },
    });
  }

  formatDate(date: Date | string): string {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      console.warn('Invalid date provided:', date);
      return '';
    }
    return parsedDate.toLocaleDateString('en-EN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
}
