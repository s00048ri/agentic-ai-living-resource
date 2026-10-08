import { useEffect, useMemo, useState } from 'preact/hooks';
import { url } from '../lib/url';
import {
  APPLICATION_AREAS,
  AUTONOMY_LEVELS,
  DEPLOYMENT_STAGES,
  ECOSYSTEM_ROLES,
  ORG_TYPES,
  REGIONS,
  SECTORS,
  SOURCE_TYPES,
  label,
  type Term,
} from '../lib/vocabularies';

export interface CaseSummary {
  id: string;
  title: string;
  organisation: string;
  summary: string;
  sector: string;
  application_area: string;
  org_type: string;
  ecosystem_role: string;
  region: string;
  autonomy_level: string;
  deployment_stage: string;
  source_type: string;
  challenges: string[];
  responses: string[];
  last_verified: string;
  last_verified_label: string;
}

interface Props {
  cases: CaseSummary[];
  challenges: Term[];
  responses: Term[];
  /** Heading level of the card titles, to fit the page outline. */
  headingLevel?: 2 | 3;
}

type FilterKey =
  | 'sector'
  | 'application_area'
  | 'org_type'
  | 'ecosystem_role'
  | 'region'
  | 'autonomy_level'
  | 'deployment_stage'
  | 'challenge'
  | 'response'
  | 'source_type';

type Sort = 'verified' | 'title';

const SORTS: { id: Sort; label: string }[] = [
  { id: 'verified', label: 'Last verified (newest first)' },
  { id: 'title', label: 'Title (A–Z)' },
];

export default function CaseExplorer({ cases, challenges, responses, headingLevel = 2 }: Props) {
  const CardHeading = headingLevel === 3 ? 'h3' : 'h2';
  const filters: { key: FilterKey; label: string; vocab: readonly Term[] }[] = [
    { key: 'sector', label: 'Sector', vocab: SECTORS },
    { key: 'application_area', label: 'Application area', vocab: APPLICATION_AREAS },
    { key: 'org_type', label: 'Organisation type', vocab: ORG_TYPES },
    { key: 'ecosystem_role', label: 'Role in the AI ecosystem', vocab: ECOSYSTEM_ROLES },
    { key: 'region', label: 'Region', vocab: REGIONS },
    { key: 'autonomy_level', label: 'Autonomy level', vocab: AUTONOMY_LEVELS },
    { key: 'deployment_stage', label: 'Deployment stage', vocab: DEPLOYMENT_STAGES },
    { key: 'challenge', label: 'Challenge', vocab: challenges },
    { key: 'response', label: 'Governance response', vocab: responses },
    { key: 'source_type', label: 'Source type', vocab: SOURCE_TYPES },
  ];

  const [values, setValues] = useState<Partial<Record<FilterKey, string>>>({});
  const [sort, setSort] = useState<Sort>('verified');

  // Read the initial state from the URL once hydrated.
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const initial: Partial<Record<FilterKey, string>> = {};
    for (const f of filters) {
      const v = params.get(f.key);
      if (v && f.vocab.some((t) => t.id === v)) initial[f.key] = v;
    }
    setValues(initial);
    if (params.get('sort') === 'title') setSort('title');
  }, []);

  function sync(next: Partial<Record<FilterKey, string>>, nextSort: Sort) {
    const u = new URL(location.href);
    for (const f of filters) {
      const v = next[f.key];
      if (v) u.searchParams.set(f.key, v);
      else u.searchParams.delete(f.key);
    }
    if (nextSort === 'title') u.searchParams.set('sort', 'title');
    else u.searchParams.delete('sort');
    history.replaceState(history.state, '', u);
  }

  function update(key: FilterKey, value: string) {
    const next = { ...values, [key]: value || undefined };
    setValues(next);
    sync(next, sort);
  }

  function updateSort(value: Sort) {
    setSort(value);
    sync(values, value);
  }

  function reset() {
    setValues({});
    sync({}, sort);
  }

  const matches = useMemo(() => {
    const list = cases.filter((c) =>
      filters.every((f) => {
        const v = values[f.key];
        if (!v) return true;
        if (f.key === 'challenge') return c.challenges.includes(v);
        if (f.key === 'response') return c.responses.includes(v);
        return c[f.key] === v;
      }),
    );
    return [...list].sort((a, b) =>
      sort === 'title' ? a.title.localeCompare(b.title) : b.last_verified.localeCompare(a.last_verified),
    );
  }, [cases, values, sort]);

  const visible = matches;
  const total = cases.length;
  const active = Object.values(values).some(Boolean);
  const challengeName = (id: string) => challenges.find((t) => t.id === id)?.label ?? id;

  return (
    <div class="explorer">
      <form class="filters" aria-label="Filter use cases" onSubmit={(e) => e.preventDefault()}>
        {filters.map((f) => (
          <div class="field" key={f.key}>
            <label for={`f-${f.key}`}>{f.label}</label>
            <select
              id={`f-${f.key}`}
              value={values[f.key] ?? ''}
              onChange={(e) => update(f.key, (e.currentTarget as HTMLSelectElement).value)}
            >
              <option value="">All</option>
              {f.vocab.map((t) => (
                <option value={t.id} key={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        ))}
        <div class="field">
          <label for="f-sort">Sort by</label>
          <select id="f-sort" value={sort} onChange={(e) => updateSort((e.currentTarget as HTMLSelectElement).value as Sort)}>
            {SORTS.map((s) => (
              <option value={s.id} key={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div class="field">
          <label for="f-tm">
            Tools &amp; metrics used{' '}
            <span class="badge badge-later" title="Feature status: could be added later.">
              Later
            </span>
          </label>
          <select id="f-tm" aria-describedby="f-tm-note">
            <option value="">All</option>
            <option value="" disabled>
              [To be curated]
            </option>
          </select>
          <span id="f-tm-note" class="filter-note">
            Options would come from the OECD Catalogue of Tools &amp; Metrics.
          </span>
        </div>
        <div class="field field-reset">
          <button type="button" class="btn btn-secondary" onClick={reset} disabled={!active}>
            Clear filters
          </button>
        </div>
      </form>

      <p class="count" role="status">
        Showing {visible.length} of {total} use cases
      </p>

      <div class="grid">
        {visible.map((c) => (
          <article class="card" key={c.id}>
            <CardHeading class="card-title">
              <a href={url(`/cases/${c.id}/`)}>{c.title}</a>
            </CardHeading>
            <p class="meta">
              {c.organisation}{' '}
              <span class="badge badge-fictional" title="This organisation and use case are fictional.">
                Fictional example
              </span>
            </p>
            <p>{c.summary}</p>
            <p class="meta">
              {label(SECTORS, c.sector)} · {label(AUTONOMY_LEVELS, c.autonomy_level)}
            </p>
            <ul class="tags" aria-label="Challenges">
              {c.challenges.slice(0, 3).map((id) => (
                <li class="tag" key={id}>
                  {challengeName(id)}
                </li>
              ))}
            </ul>
            <p class="meta more">
              Last verified (illustrative): <time dateTime={c.last_verified}>{c.last_verified_label}</time>
            </p>
          </article>
        ))}
      </div>
      {visible.length === 0 && <p>No use cases match these filters.</p>}
    </div>
  );
}
