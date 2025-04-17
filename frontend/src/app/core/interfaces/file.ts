import {User} from './user';
import {Tag} from './tag';
import {Folder} from './folder';


export interface AppFile {
  id: number;
  title: string;
  content: string;
  author: User | 'admin';
  tags: Tag[];
  folder: Folder | null;
  createdAt: Date;
  updatedAt: Date;
  type: 'document';
}
