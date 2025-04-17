import { Component } from '@angular/core';
import {SidebarComponent} from '../../layouts/sidebar/sidebar.component';
import {DocumentEditorComponent} from '../../features/documents/document-editor/document-editor.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    SidebarComponent,
    DocumentEditorComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
}
