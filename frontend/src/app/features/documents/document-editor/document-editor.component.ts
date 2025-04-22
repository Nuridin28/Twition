import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppFile} from '../../../core/interfaces/file';
import {DocumentService} from '../document.service';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-document-editor',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './document-editor.component.html',
  styleUrl: './document-editor.component.css'
})
export class DocumentEditorComponent implements OnInit {
  document!: AppFile;
  rendering = true;
  isSaving = false;
  contentControl = new FormControl('');
  titleControl = new FormControl('');
  folderTitle!: string;

  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    this.documentService.selectedDocument.subscribe(document => {
      if (document) {
        this.document = document;
        this.contentControl.setValue(document.content, { emitEvent: false });
        this.titleControl.setValue(document.title, { emitEvent: false });
        if (this.document.folderId) {
          this.documentService.getFolder(String(this.document.folderId)).subscribe(folder => {
            this.folderTitle = folder.title;
            console.log(folder);
          })
        } else {
          this.folderTitle = 'Root Folder';
        }
        this.rendering = true;
      }
      else {
        this.rendering = false;
      }
    })

    this.contentControl.valueChanges.pipe(debounceTime(1000)).subscribe((newContent) => {
      if (this.document && newContent) {
        this.autoSave(newContent, 'content');
      }
    })
    this.titleControl.valueChanges.pipe(debounceTime(1000)).subscribe((newTitle) => {
      if (this.document && newTitle) {
        this.autoSave(newTitle, 'title');
      }
    })
  }

  autoSave(updated_data: string, type: string) {
    this.isSaving = true;

    type === 'content' ? this.document.content = updated_data : this.document.title = updated_data;

    this.document.updatedAt = new Date();

    this.documentService.saveNote(this.document).subscribe(
      result => {
        this.isSaving = false;
        console.log(`${this.document.title} is saved!`);
      }
    )
  }

  renameDocument(title: string) {
    if (this.document) {
      this.document.title = title;
      this.documentService.selectDocument(this.document);
    }

  }
}
