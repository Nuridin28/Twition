import { Component } from '@angular/core';
import {FileNode} from '../../../core/file-node';
import {CommonModule} from '@angular/common';
import {DocumentService} from '../document.service';
import {Folder} from '../../../core/interfaces/folder';
import {AppFile} from '../../../core/interfaces/file';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-file-explorer',
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './file-explorer.component.html',
  styleUrl: './file-explorer.component.css'
})
export class FileExplorerComponent {

  constructor(private documentService: DocumentService) {}

  treeData: Array<Folder | AppFile> = [];
  selectedFolderHistory: Array<Folder | null> = [null];
  selectedFolder: Folder | null | undefined = null;
  editingFolderId: number | null = null;

  createNewNote() {
    let file: AppFile = {
      id: 0,
      title: 'New note',
      author: 'admin',
      content: 'text text text',
      folder: this.selectedFolder,
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      type: 'document',
    }
    if (file.folder == null) {
      this.treeData.push(file);
    }
    else {
      file.folder.children.push(file);
    }
    console.log(this.treeData);
  }

  createNewFolder() {
    let folder: Folder = {
      author: 'admin',
      children: [],
      expanded: false,
      id: 0,
      parent: this.selectedFolder,
      title: 'New Folder',
      type: 'folder'
    }
    if (folder.parent == null) {
      this.treeData.push(folder);
    }
    else {
      folder.parent.children.push(folder);
    }
    console.log(this.treeData);
  }

  onClickFile(document: AppFile) {
    console.log(document);
    this.documentService.selectDocument(document);
  }

  toggleFolder(node: Folder) {
    node.expanded = !node.expanded;
    if (node.expanded) {
      this.selectedFolder = node;
      this.selectedFolderHistory.push(node);
    }
    else {
      this.selectedFolderHistory.pop();
      this.selectedFolder = this.selectedFolderHistory.at(-1);
    }
  }

  startRenaming(node: Folder) {
    this.editingFolderId = node.id;
  }

  finishRenaming() {
    this.editingFolderId = null;
    console.log('Folder renamed!');
  }

}
