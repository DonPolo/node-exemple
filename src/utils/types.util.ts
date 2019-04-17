import { Concierge, Site } from '../models/ecl';

/* Result from the service (Dialogflow, Luis, Watson) */
export interface Result {
  response: ResultResponse | null;
  intents: ResultIntent[];
  entities: ResultEntity[];
  query: string;
}
export interface ResultResponse {
  type: string;
  text: string;
}

export interface ResultIntent {
  confidence: Float32Array;
  name: string;
}

export interface ResultEntity {
  name: string;
  value: string;
}

/* Contexts for a request */
export interface Contexts {
  fulfill: FulfillContexts | null;
  service: any;
  site: SiteContexts | null;
}
export interface FulfillContexts {
  ctx: string[];
  lastname: string;
  firstname: string;
  email: string;
  siteGroup: number;
  userId: string;
}

export interface SiteContexts {
  concierges: Concierge[];
  site: Site;
}

/* Response from fulfill engine */
export interface FulfillResponse {
  response: FulfillResponseResponse | null;
  contexts: Contexts;
  confidence: number;
}

export interface FulfillResponseResponse {
  text: string;
  type: string;
  params?: any;
}

/* Relation between intent and function */
export interface Intent {
  name: string | undefined;
  func: (
    parameter: any,
    context: Contexts,
    confidence: number,
    query: string,
    types: string[],
  ) => Promise<FulfillResponse | null>;
}
