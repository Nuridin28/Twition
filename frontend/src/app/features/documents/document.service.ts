import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {AppFile} from '../../core/interfaces/file';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private selectedDocumentSource: BehaviorSubject<AppFile | null> =  new BehaviorSubject<AppFile | null>(null);
  selectedDocument = this.selectedDocumentSource.asObservable();

  selectDocument(file: AppFile) {
    this.selectedDocumentSource.next(file);
  }

}
