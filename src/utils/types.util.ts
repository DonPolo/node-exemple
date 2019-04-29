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
  concierges: Concierge[] | null;
}
export interface UserContexts {
  lastname: string;
  firstname: string;
  email: string;
  siteGroup: number | null;
  userId: string;
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
  text: {
    'fr-tu': string[];
    'fr-vous': string[];
  };
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
    'fr-tu': Array<{
      text: string;
      value: string;
    }>;
    'fr-vous': Array<{
      text: string;
      value: string;
    }>;
  };
}
export interface UnparsedResponseDropdown {
  dropdown: {
    nextaction: string;
    'fr-tu': Array<{
      text: string;
      value: string;
    }>;
    'fr-vous': Array<{
      text: string;
      value: string;
    }>;
  };
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
    btns: Array<{
      text: string;
      value: string;
    }>;
  };
}
export interface ParsedResponseDropdown {
  dropdown: {
    nextaction: string;
    opts: Array<{
      text: string;
      value: string;
    }>;
  };
}
