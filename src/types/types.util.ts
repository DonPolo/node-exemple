import { Site } from '../back/models/ecl';

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
  site: Site;
  user: UserContexts;
  other: any;
}
export interface UserContexts {
  lastname: string;
  firstname: string;
  email: string;
  siteGroup: number | null;
  userId: string;
  registered: boolean;
  type: string;
  request: {
    type: string;
    numLocker: number | undefined;
    text: string;
    ref: string;
  } | null;
  gender: number;
}

export function getEmptyUserContexts(): UserContexts {
  return {
    lastname: '',
    firstname: '',
    email: '',
    siteGroup: null,
    userId: '',
    registered: false,
    type: '',
    request: null,
    gender: 0,
  };
}

export function getEmptySiteContexts(): Site {
  return {
    id: '',
    code: '',
    libelle: '',
    email: '',
    telephone: '',
    botNumber: '',
    horaires: '',
    horairesplus: null,
    infos: '',
    guideServices: '',
    relaisColis: '',
    concierges: {
      concierges: [],
      prenomsconcierges: '',
      nb: 0,
      gender: 0,
    },
    groups: [],
    locale: 'fr-tu',
    hasCasier: 0,
  };
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
  type?: string;
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
  response: string;
  contexts: Contexts;
  confidence: number;
}

export interface Response {
  intent: string;
  type: string;
  beautyname: string;

  big_intent: string;
  desc: string;
  // tslint:disable-next-line: prefer-array-literal
  responses: Array<
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
  intent: string;
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
export interface UnparsedResponseText {
  text: UnparsedText;
}
export interface UnparsedResponseMedia {
  media: {
    value: string;
    alt?: UnparsedResponseText;
  };
}
export interface UnparsedResponseLink {
  link: {
    value: string;
    alt?: UnparsedResponseText;
  };
}
export interface UnparsedResponseBtn {
  btn: {
    group?: UnparsedBtnOrOpt[];
    list?: UnparsedBtnOrOpt[];
    alt?: UnparsedText;
  };
}
export interface UnparsedResponseDropdown {
  dropdown: {
    options?: UnparsedBtnOrOpt[];
    list?: UnparsedBtnOrOpt[];
    alt?: UnparsedText;
  };
}
export interface UnparsedText {
  cond?: string;
  genplur?: {
    plural?: string;
    gender?: string;
  };
  fr?: string[];
  'fr-tu'?: string[];
  'fr-vous'?: string[];
  list?: {
    fr?: string[];
    'fr-tu'?: string[];
    'fr-vous'?: string[];
  };
}
export interface UnparsedBtnOrOpt {
  text: UnparsedText;
  value: string;
  followupintent: string;
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
    // tslint:disable-next-line: prefer-array-literal
    btns: Array<{
      text: string;
      value: string;
      followupintent: string;
    }>;
  };
}
export interface ParsedResponseDropdown {
  dropdown: {
    // tslint:disable-next-line: prefer-array-literal
    opts: Array<{
      text: string;
      value: string;
      followupintent: string;
    }>;
  };
}

/* Analytics */
export interface AnalyticsData {
  _id?: string;
  date: number;
  archived: boolean;
  parsedResponse: ParsedResponse;
  result: IntentResult;
  results: IntentResult[];
  request: FulfillRequest;
}

export const getEmptyAnalyticsData = () => {
  const contexts: Contexts = {
    fulfill: [],
    service: '',
    site: getEmptySiteContexts(),
    user: getEmptyUserContexts(),
    other: null,
  };
  const data: AnalyticsData = {
    date: 0,
    archived: false,
    parsedResponse: {
      intent: '',
      responses: [],
    },
    result: {
      contexts,
      response: 'toto',
      confidence: 0,
    },
    results: [],
    request: {
      result: {
        contexts,
        response: '',
        intents: [],
        entities: [],
        query: '',
      },
      acceptedtypes: [],
      lang: '',
    },
  };
  return data;
};
