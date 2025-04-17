import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AppFile} from '../../../core/interfaces/file';
import {DocumentService} from '../document.service';

@Component({
  selector: 'app-document-editor',
  imports: [CommonModule, FormsModule],
  templateUrl: './document-editor.component.html',
  styleUrl: './document-editor.component.css'
})
export class DocumentEditorComponent implements OnInit {
  // title: string ='asd';
  document!: AppFile;
  rendering = true;
  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    this.documentService.selectedDocument.subscribe(document => {
      if (document) {
        this.document = document;
        this.rendering = true;
      }
      else {
        this.rendering = false;
      }
    })
  }

  renameDocument(title: string) {
    if (this.document) {
      this.document.title = title;
      this.documentService.selectDocument(this.document);
    }

  }
}
