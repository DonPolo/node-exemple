import {
  ParsedResponseBtn,
  ParsedResponseDropdown,
  ParsedResponseLink,
  ParsedResponseMedia,
  ParsedResponseText,
} from './types.util';

export interface User {
  pseudo: string;
  pass: string;
}

export interface FileInfos {
  filename: string;
  cat: 'training' | 'response';
  type: string;
}

export interface ChatResponse {
  res:
    | ParsedResponseBtn
    | ParsedResponseDropdown
    | ParsedResponseLink
    | ParsedResponseMedia
    | ParsedResponseText;
  pos: string;
  id: number;
}
