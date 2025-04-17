import { Component } from '@angular/core';
import {FileNode} from '../../../core/file-node';
import {CommonModule} from '@angular/common';
import {DocumentService} from '../document.service';
import {Folder} from '../../../core/interfaces/folder';
import {AppFile} from '../../../core/interfaces/file';


@Component({
  selector: 'app-file-explorer',
  imports: [
    CommonModule,
  ],
  templateUrl: './file-explorer.component.html',
  styleUrl: './file-explorer.component.css'
})
export class FileExplorerComponent {

  constructor(private documentService: DocumentService) {}

  treeData: Array<Folder | AppFile> = [];
  selectedFolder: Folder | null = null;

  createNewNote() {
    let file: AppFile = {
      id: 0,
      title: 'Title',
      author: 'admin',
      content: 'texttexttext',
      folder: null,
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      type: 'document',
    }
    this.treeData.push(file);
  }

  createNewFolder() {

  }

  onClickFile(document: AppFile) {
    console.log(document);
    this.documentService.selectDocument(document);
  }

  toggleFolder(node: Folder) {
    node.expanded = !node.expanded;
  }

}
