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
  formatedCreationDate?: string | null = null;
  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    this.documentService.selectedDocument.subscribe(document => {
      if (document) {
        this.document = document;
        this.formatedCreationDate = `
        ${document.createdAt.getDate()}/${document.createdAt.getMonth() + 1}/${document.createdAt.getFullYear()}` +
        ` ${document.createdAt.getHours()}:${document.createdAt.getMinutes()}`;
        this.contentControl.setValue(document.content, { emitEvent: false });
        this.rendering = true;
      }
      else {
        this.rendering = false;
      }
    })

    this.contentControl.valueChanges.pipe(debounceTime(1000)).subscribe((newContent) => {
      if (this.document) {
        this.autoSave(newContent);
      }
    })
  }

  autoSave(newContent: string | null) {
    this.isSaving = true;

    newContent ? this.document.content = newContent : null;

    this.isSaving = false;
    this.document.updatedAt = new Date();
    console.log(`${this.document.title} is saved!`);
  }

  renameDocument(title: string) {
    if (this.document) {
      this.document.title = title;
      this.documentService.selectDocument(this.document);
    }

  }
}
