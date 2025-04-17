import {Folder} from './interfaces/folder';
import {AppFile} from './interfaces/file';

export interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  expanded?: boolean;
}
