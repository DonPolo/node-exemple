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
  confidence: number;
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
  siteGroup: number | null;
  userId: string;
}

export interface SiteContexts {
  concierges: Concierge[];
  site: Site;
}

/* Response from fulfill engine */
export interface FulfillResponse {
  response: any | null;
  contexts: Contexts;
  confidence: number;
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
