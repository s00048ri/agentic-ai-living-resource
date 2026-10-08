/** Build-time props for the CaseExplorer island (use case list and home page). */
import type { CaseSummary } from '../components/CaseExplorer';
import type { Term } from './vocabularies';
import { formatDate, isoDate, type Taxonomy } from './taxonomy';

export function explorerProps(tax: Taxonomy): { cases: CaseSummary[]; challenges: Term[]; responses: Term[] } {
  return {
    cases: tax.cases.map((c) => ({
      id: c.id,
      title: c.data.title,
      organisation: c.data.organisation,
      summary: c.data.summary,
      sector: c.data.sector,
      application_area: c.data.application_area,
      org_type: c.data.org_type,
      ecosystem_role: c.data.ecosystem_role,
      region: c.data.region,
      autonomy_level: c.data.autonomy_level,
      deployment_stage: c.data.deployment_stage,
      source_type: c.data.source_type,
      challenges: c.data.challenges.map((r) => r.id),
      responses: c.data.responses.map((r) => r.id),
      last_verified: isoDate(c.data.last_verified),
      last_verified_label: formatDate(c.data.last_verified),
    })),
    challenges: tax.challenges.map((c) => ({ id: c.id, label: c.data.name })),
    responses: tax.responses.map((r) => ({ id: r.id, label: r.data.name })),
  };
}
