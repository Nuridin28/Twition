import { Component, signal, computed } from '@angular/core';
import { FileExplorerComponent } from '../../features/documents/file-explorer/file-explorer.component';
import { CommonModule } from '@angular/common';
import {FileNode} from '../../core/file-node';

@Component({
  selector: 'app-sidebar',
  imports: [
    FileExplorerComponent,
    CommonModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
