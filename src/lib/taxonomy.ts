/**
 * Build-time derivations over the content collections. Relations are stored one way only
 * (response → challenge, case → challenge/response); every reverse lookup is derived here.
 */
import { getCollection, type CollectionEntry } from 'astro:content';

export type Challenge = CollectionEntry<'challenges'>;
export type Response = CollectionEntry<'responses'>;
export type Case = CollectionEntry<'cases'>;
export type Basis = 'explicit' | 'editorial';

export interface Taxonomy {
  challenges: Challenge[];
  responses: Response[];
  /** Top-level responses, in source order. */
  topResponses: Response[];
  cases: Case[];
  challenge(id: string): Challenge;
  response(id: string): Response;
  childrenOf(responseId: string): Response[];
  responsesForChallenge(challengeId: string): { response: Response; basis: Basis }[];
  casesForChallenge(challengeId: string): Case[];
  casesForResponse(responseId: string): Case[];
}

let cached: Promise<Taxonomy> | undefined;

export function getTaxonomy(): Promise<Taxonomy> {
  cached ??= build();
  return cached;
}

/** Cases sorted by last verified date, most recent first. */
export function byLastVerified(a: Case, b: Case): number {
  return b.data.last_verified.getTime() - a.data.last_verified.getTime();
}

async function build(): Promise<Taxonomy> {
  const [challenges, responses, cases] = await Promise.all([
    getCollection('challenges'),
    getCollection('responses'),
    getCollection('cases'),
  ]);
  cases.sort(byLastVerified);

  const challengeById = new Map(challenges.map((c) => [c.id, c]));
  const responseById = new Map(responses.map((r) => [r.id, r]));

  const get = <T>(map: Map<string, T>, id: string, kind: string): T => {
    const found = map.get(id);
    if (!found) throw new Error(`Unknown ${kind}: ${id}`);
    return found;
  };

  return {
    challenges,
    responses,
    topResponses: responses.filter((r) => r.data.parent === null),
    cases,
    challenge: (id) => get(challengeById, id, 'challenge'),
    response: (id) => get(responseById, id, 'response'),
    childrenOf: (id) => responses.filter((r) => r.data.parent?.id === id),
    responsesForChallenge: (id) =>
      responses.flatMap((response) =>
        response.data.addresses
          .filter((a) => a.challenge.id === id)
          .map((a) => ({ response, basis: a.basis })),
      ),
    casesForChallenge: (id) => cases.filter((c) => c.data.challenges.some((ref) => ref.id === id)),
    casesForResponse: (id) => cases.filter((c) => c.data.responses.some((ref) => ref.id === id)),
  };
}

export interface HistoryItem {
  date: Date;
  note: string;
  case: Case;
}

/** "What's new": every case's history, newest first. */
export async function whatsNew(limit?: number): Promise<HistoryItem[]> {
  const { cases } = await getTaxonomy();
  const items = cases
    .flatMap((c) => c.data.history.map((h) => ({ date: h.date, note: h.note, case: c })))
    .sort((a, b) => b.date.getTime() - a.date.getTime());
  return limit === undefined ? items : items.slice(0, limit);
}

export function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}
