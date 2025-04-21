import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {AppFile} from '../../core/interfaces/file';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Folder} from '../../core/interfaces/folder';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private baseUrl: string = 'http://localhost:8000/api/document_editor/';
  private selectedDocumentSource: BehaviorSubject<AppFile | null> =  new BehaviorSubject<AppFile | null>(null);
  selectedDocument = this.selectedDocumentSource.asObservable();

  constructor(private http: HttpClient) {}

  private getToken() {
    let localToken = localStorage.getItem('auth_token');
    let sessionToken = sessionStorage.getItem('auth_token');
    // console.log("local: ", localToken, "\nsession: ", sessionToken);
    if (localToken) { return localToken; }
    else {return sessionToken; }
  }

  selectDocument(file: AppFile) {
    this.selectedDocumentSource.next(file);
  }

  getTree() {
    console.log('Access_token: ', this.getToken());
    return this.http.get<Array<AppFile | Folder>>(this.baseUrl + 'tree/', {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`
      })
    });
  }
  postFolder(folder: any) {
    return this.http.post<Folder>(this.baseUrl + 'folder/', folder, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`
      })
    });
  }
  postDocument(document: any) {
    return this.http.post<AppFile>(this.baseUrl + 'document/', document, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`
      })
    })
  }
  saveNote(note: any) {
    return this.http.put<AppFile>(this.baseUrl + 'document/', note, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`
      })
    })
  }
  getFolder(id: string) {
    return this.http.get<Folder>(this.baseUrl + 'folder/' + id, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`
      })
    });
  }
}
