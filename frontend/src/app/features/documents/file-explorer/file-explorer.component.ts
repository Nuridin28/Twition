import {Component, OnInit} from '@angular/core';
import {FileNode} from '../../../core/file-node';
import {CommonModule} from '@angular/common';
import {DocumentService} from '../document.service';
import {Folder} from '../../../core/interfaces/folder';
import {AppFile} from '../../../core/interfaces/file';
import {FormsModule} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {User} from '../../../core/interfaces/user';
<<<<<<< HEAD
=======

>>>>>>> 8223bd182c44bbbb7af15dd45e473f961e63957b


@Component({
  selector: 'app-file-explorer',
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule
  ],
  templateUrl: './file-explorer.component.html',
  styleUrl: './file-explorer.component.css'
})
export class FileExplorerComponent implements OnInit {

  author!: User;
  treeData!: Array<Folder | AppFile>;

  constructor(private documentService: DocumentService) {}

  selectedFolderHistory: Array<Folder | null> = [null];
  selectedFolder: Folder | null | undefined = null;
  editingFolderId: number | null = null;

  createNewNote() {
    console.log('Creating new note');

    let postDocument = {
      title: 'New note',
      content: '',
      author: this.author.id,
      tags: [],
      folder: this.selectedFolder?.id,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.documentService.postDocument(postDocument).subscribe(
      result => {
        console.log('Note created: ', result);
        this.documentService.getTree().subscribe(
          (content) => {
            this.treeData = content
          }
        )
      }
    )

    console.log('Tree data updated: ', this.treeData);
  }

  createNewFolder() {
    console.log('Creating new folder');

    let postFolder = {
      title: 'New Folder',
      author: this.author.id,
      parent: this.selectedFolder?.id,
    }

    this.documentService.postFolder(postFolder).subscribe(
      result => {
        console.log('Folder created: ', result)
        let folder: Folder = {
          id: result.id,
          title: result.title,
          authorId: this.author.id,
          parent: result.parent,
          children: [],
          expanded: false,
          type: 'folder'
        }
        if (folder.parent == null) {
          this.treeData.push(folder);
        }
        else {
          folder.parent.children.push(folder);
        }
        console.log('Tree data updated: ', this.treeData);
      }
    );

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
    console.log(this.editingFolderId);
  }

  finishRenaming() {
    this.editingFolderId = null;
    console.log('Folder renamed!');
  }

  ngOnInit(): void {
    this.author = JSON!.parse(localStorage.getItem('user_data')!);
    if (!this.author) this.author = JSON!.parse(sessionStorage.getItem('user_data')!);
    this.documentService.getTree().subscribe(
      (content) => {
        this.treeData = content
        console.log('Notes retrieved successfully!')
        console.log(content)
      }
    )
  }

}
