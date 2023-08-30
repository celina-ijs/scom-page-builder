export interface ICommand {
  execute(): any;
  undo(): void;
  redo(): void;
}

export interface IDataColumn {
  column: number;
  columnSpan: number;
}

export type IMergeType = "front" | "back" | "top" | "bottom" | "none";

export interface IWidgetSettings {
  pt?: number;
  pb?: number;
  pr?: number;
  pl?: number;
  maxWidth?: number;
  align?: 'left' | 'center' | 'right';
  link?: string;
}
