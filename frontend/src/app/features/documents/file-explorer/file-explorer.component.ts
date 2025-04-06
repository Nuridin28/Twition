import { Component } from '@angular/core';
import {FileNode} from '../../../core/file-node';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-file-explorer',
  imports: [
    CommonModule,
  ],
  templateUrl: './file-explorer.component.html',
  styleUrl: './file-explorer.component.css'
})
export class FileExplorerComponent {

  toggleFolder(node: FileNode) {
    node.expanded = !node.expanded;
  }

  treeData: FileNode[] = [
    {
      name: 'Projects',
      type: 'folder',
      expanded: false,
      children: [
        { name: 'Project1.docx', type: 'document' },
        {
          name: 'Archive',
          type: 'folder',
          expanded: false,
          children: [
            { name: 'OldProject.docx', type: 'document' },
            {
              name: 'folder3',
              type: 'folder',
              expanded: false,
              children: [
                { name: 'OldProject.docx', type: 'document' },
              ]}
          ]
        },
        {
          name: 'folder3',
          type: 'folder',
          expanded: false,
          children: [
            { name: 'OldProject.docx', type: 'document' },
          ]}
      ]
    },
    { name: 'Readme.md', type: 'document' }
  ];

}
