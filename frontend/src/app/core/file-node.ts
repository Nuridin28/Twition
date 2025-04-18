export interface FileNode {
  name: string;
  type: "document" | "folder";
  children?: FileNode[];
  expanded?: boolean;
}
