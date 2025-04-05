import { Component } from '@angular/core';
import {FileExplorerComponent} from '../../features/documents/file-explorer/file-explorer.component';

@Component({
  selector: 'app-sidebar',
  imports: [
    FileExplorerComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
