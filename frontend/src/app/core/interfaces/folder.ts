import { User } from './user';
import {AppFile} from './file';

export interface Folder {
  id: number;
  title: string;
  author: User | 'admin';
  parent: Folder | null | undefined;
  children: Array<Folder | AppFile>;
  expanded?: boolean;
  type: 'folder';
}
