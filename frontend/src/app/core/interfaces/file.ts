import {User} from './user';
import {Tag} from './tag';
import {Folder} from './folder';


export interface AppFile {
  id: number;
  title: string;
  content: string;
  author: string | 'admin';
  tags: Tag[];
  folderId: string;
  createdAt: Date;
  updatedAt: Date;
  type: 'document';
}
