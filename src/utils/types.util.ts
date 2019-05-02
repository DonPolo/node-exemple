import { Concierge, Site } from '../models/ecl';

/* Request sent by a media */
export interface Request {
  msg: string;
  from: string;
  to: string;
  platform: string;
  acceptedtypes: string[];
  service?: string;
  result?: ServiceResult;
}

/* Contexts for a request */
export interface Contexts {
  fulfill: string[];
  service: any;
  site: Site | null;
  user: UserContexts | null;
  concierges: ConciergeContexts | null;
}
export interface UserContexts {
  lastname: string;
  firstname: string;
  email: string;
  siteGroup: number | null;
  userId: string;
}

export interface ConciergeContexts {
  concierges: Concierge[] | null;
  conciergeGivenName: string;
  nb: number;
}

/* Result from the service (Dialogflow, Luis, Watson) */
export interface ServiceRequest {
  msg: string;
  contexts: Contexts;
}
export interface ServiceResult {
  response: string | null;
  intents: ResultIntent[];
  entities: ResultEntity[];
  query: string;
  contexts: Contexts;
}

export interface ResultIntent {
  confidence: number;
  name: string;
}

export interface ResultEntity {
  name: string;
  value: string;
}

/* Response from fulfill engine */
export interface FulfillRequest {
  result: ServiceResult;
  acceptedtypes: string[];
  lang: string;
}
export interface FulfillResult {
  contexts: Contexts;
  response: ParsedResponse;
}

export interface IntentRequest {
  entities: ResultEntity[];
  contexts: Contexts;
  confidence: number;
  query: string;
}
export interface IntentResult {
  response: Response;
  contexts: Contexts;
  confidence: number;
}

export interface Response {
  intent: string;
  type: string;
  // tslint:disable-next-line: prefer-array-literal
  responses: Array<
    | UnparsedResponseDesc
    | UnparsedResponseText
    | UnparsedResponseBtn
    | UnparsedResponseDropdown
    | UnparsedResponseLink
    | UnparsedResponseMedia
  >;
}

export interface ParsedResponse {
  // tslint:disable-next-line: prefer-array-literal
  responses: Array<
    | ParsedResponseBtn
    | ParsedResponseDropdown
    | ParsedResponseLink
    | ParsedResponseMedia
    | ParsedResponseText
  >;
}

/* Parse Response */
export interface ParseResponseRequest {
  intentResult: IntentResult;
  acceptedtypes: string[];
  lang: string;
}

/* Relation between intent and function */
export interface Intent {
  name: string | undefined;
  func: (request: IntentRequest) => Promise<IntentResult | null>;
}

/* Unparsed Response Attributes */
export interface UnparsedResponseDesc {
  desc: string;
}
export interface UnparsedResponseText {
  text: UnparsedText;
}
export interface UnparsedResponseMedia {
  media: string;
}
export interface UnparsedResponseLink {
  link: string;
}
export interface UnparsedResponseBtn {
  btn: {
    nextaction: string;
    // tslint:disable-next-line: prefer-array-literal
    'fr-tu': Array<{
      text: string;
      value: string;
    }>;
    // tslint:disable-next-line: prefer-array-literal
    'fr-vous': Array<{
      text: string;
      value: string;
    }>;
    // tslint:disable-next-line: prefer-array-literal
    fr?: Array<{
      text: string;
      value: string;
    }>;
  };
}
export interface UnparsedResponseDropdown {
  dropdown: {
    nextaction: string;
    // tslint:disable-next-line: prefer-array-literal
    'fr-tu'?: Array<{
      text: string;
      value: string;
    }>;
    // tslint:disable-next-line: prefer-array-literal
    'fr-vous'?: Array<{
      text: string;
      value: string;
    }>;
    // tslint:disable-next-line: prefer-array-literal
    fr?: Array<{
      text: string;
      value: string;
    }>;
  };
}

export interface UnparsedText {
  fr?: string[];
  'fr-tu'?: string[];
  'fr-vous'?: string[];
  'fr-cond'?: UnparsedLang;
  'fr-tu-cond'?: UnparsedLang;
  'fr-vous-cond'?: UnparsedLang;
}

export interface UnparsedLang {
  cond: string;
  'sing-cond'?: {
    cond: string;
    masc: string[];
    fem: string[];
  };
  'plur-cond'?: {
    cond: string;
    masc: string[];
    fem: string[];
  };
  'masc-cond'?: {
    cond: string;
    sing: string[];
    plur: string[];
  };
  'fem-cond'?: {
    cond: string;
    sing: string[];
    plur: string[];
  };
  sing: string[];
  plur: string[];
  masc: string[];
  fem: string[];
}

/* Parsed Response Attributes */
export interface ParsedResponseText {
  text: string;
}
export interface ParsedResponseMedia {
  media: string;
}
export interface ParsedResponseLink {
  link: string;
}
export interface ParsedResponseBtn {
  btn: {
    nextaction: string;
    // tslint:disable-next-line: prefer-array-literal
    btns: Array<{
      text: string;
      value: string;
    }>;
  };
}
export interface ParsedResponseDropdown {
  dropdown: {
    nextaction: string;
    // tslint:disable-next-line: prefer-array-literal
    opts: Array<{
      text: string;
      value: string;
    }>;
  };
}
