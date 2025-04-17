import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {AppFile} from '../../core/interfaces/file';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private selectedDocumentSource: BehaviorSubject<any> = new BehaviorSubject(null);
  selectedDocument = this.selectedDocumentSource.asObservable();

  selectDocument(document: AppFile) {
    this.selectedDocumentSource.next(document);
  }

}
