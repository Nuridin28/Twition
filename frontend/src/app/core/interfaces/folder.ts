
import {AppFile} from './file';

export interface Folder {
  id: number;
  title: string;
  authorId: string;
  parent: Folder | null | undefined;
  children: Array<Folder | AppFile>;
  expanded?: boolean;
  type: 'folder';
}
