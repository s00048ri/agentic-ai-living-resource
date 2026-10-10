/**
 * Controlled vocabularies. Single source of truth for the content schema (Zod enums),
 * the filter UI, the comparison view and the submission form.
 */

export interface Term {
  readonly id: string;
  readonly label: string;
  readonly description?: string;
}

export const ORG_TYPES = [
  { id: 'private-sector', label: 'Private sector' },
  { id: 'public-sector', label: 'Public sector' },
  { id: 'academic-institution', label: 'Academic institution' },
  { id: 'industry-association', label: 'Industry association' },
  { id: 'non-profit', label: 'Non-profit' },
] as const satisfies readonly Term[];

export const ECOSYSTEM_ROLES = [
  { id: 'developer', label: 'Developer', description: 'Builds the agentic AI system or its components, for its own use or for others.' },
  { id: 'deployer', label: 'Deployer', description: 'Uses an agentic AI system, built in-house or by others, in its operations or services.' },
  { id: 'developer-deployer', label: 'Developer + deployer', description: 'Both builds and uses the agentic AI system.' },
  { id: 'regulator', label: 'Regulator', description: 'A public authority with a regulatory or supervisory role.' },
] as const satisfies readonly Term[];

export const SECTORS = [
  { id: 'telecommunications', label: 'Telecommunications' },
  { id: 'commerce-retail', label: 'E-commerce, retail & consumer goods' },
  { id: 'manufacturing', label: 'Manufacturing' },
  { id: 'energy-utilities', label: 'Energy & utilities' },
  { id: 'financial-services', label: 'Financial services & insurance' },
  { id: 'legal', label: 'Legal' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'public-administration', label: 'Public administration' },
  { id: 'scientific-research', label: 'Scientific research' },
  { id: 'technology', label: 'Technology' },
  { id: 'transportation', label: 'Transportation' },
  { id: 'professional-business-services', label: 'Professional & business services' },
  { id: 'media', label: 'Media' },
  { id: 'other', label: 'Other' },
] as const satisfies readonly Term[];

export const APPLICATION_AREAS = [
  { id: 'knowledge-management', label: 'Knowledge management' },
  { id: 'internal-workflow-optimisation', label: 'Internal workflow optimisation' },
  { id: 'customer-support', label: 'Customer support' },
  { id: 'analytical-support', label: 'Analytical support & decision assistance' },
  { id: 'compliance', label: 'Compliance' },
  { id: 'system-database-modifications', label: 'System and database modifications' },
  { id: 'legal-research', label: 'Legal research & drafting' },
  { id: 'supply-chain-industrial', label: 'Supply chain & industrial optimisation' },
  { id: 'customer-facing-transactional', label: 'Customer-facing transactional assistants' },
  { id: 'software-development', label: 'Software development' },
  { id: 'cybersecurity', label: 'Cybersecurity' },
  { id: 'facility-mobility', label: 'Facility & mobility management' },
  { id: 'network-infrastructure', label: 'Network capacity & infrastructure planning' },
  { id: 'research-discovery', label: 'Research & scientific discovery' },
  { id: 'public-services', label: 'Public sector & government services' },
  { id: 'other', label: 'Other' },
] as const satisfies readonly Term[];

export const INTENDED_USERS = [
  { id: 'internal', label: 'Internal' },
  { id: 'external', label: 'External' },
  { id: 'both', label: 'Both' },
] as const satisfies readonly Term[];

export const CLIENT_ORIENTATION = [
  { id: 'b2c', label: 'B2C' },
  { id: 'b2b', label: 'B2B' },
  { id: 'b2g', label: 'B2G' },
  { id: 'g2c', label: 'Government-to-citizen' },
  { id: 'internal-only', label: 'Internal only' },
] as const satisfies readonly Term[];

export const REGIONS = [
  { id: 'asia-pacific', label: 'Asia-Pacific' },
  { id: 'europe', label: 'Europe' },
  { id: 'north-america', label: 'North America' },
  { id: 'latin-america', label: 'Latin America' },
  { id: 'africa', label: 'Africa' },
  { id: 'middle-east', label: 'Middle East' },
  { id: 'global', label: 'Global' },
] as const satisfies readonly Term[];

export const DEPLOYMENT_STAGES = [
  { id: 'research', label: 'Research' },
  { id: 'in-development', label: 'In development' },
  { id: 'pilot', label: 'Pilot' },
  { id: 'full-deployment', label: 'Full deployment' },
] as const satisfies readonly Term[];

/** Provisional definitions for this prototype; shown as tooltips. */
export const AUTONOMY_LEVELS = [
  {
    id: 'assisted',
    label: 'Assisted',
    description: 'The agent suggests or drafts; a person carries out every action.',
  },
  {
    id: 'human-in-the-loop',
    label: 'Human-in-the-loop',
    description: 'The agent can act, but each consequential action needs explicit human approval first.',
  },
  {
    id: 'human-on-the-loop',
    label: 'Human-on-the-loop',
    description:
      'The agent acts within a defined scope while people monitor, sample and can intervene; defined cases are escalated.',
  },
  {
    id: 'bounded-autonomy',
    label: 'Bounded autonomy',
    description:
      'The agent completes multi-step tasks end to end within hard technical limits (permissions, sandboxing, budgets); outcomes are reviewed periodically.',
  },
] as const satisfies readonly Term[];

export const BENEFITS = [
  { id: 'operational-efficiency', label: 'Operational efficiency & task completion' },
  { id: 'workforce-augmentation', label: 'Workforce augmentation & service continuity' },
  { id: 'value-creation', label: 'Value creation beyond efficiency' },
  { id: 'lowering-barriers', label: 'Lowering barriers to entry & communication' },
  { id: 'transformative', label: 'Frontier & transformative opportunities' },
] as const satisfies readonly Term[];

export const SOURCE_TYPES = [
  { id: 'self-reported', label: 'Self-reported' },
  { id: 'interview', label: 'Interview' },
  { id: 'via-haip', label: 'Via HAIP report' },
] as const satisfies readonly Term[];

export const MODEL_DISCLOSURE = [
  { id: 'not-disclosed-by-design', label: 'Not disclosed (by design)' },
  { id: 'disclosed', label: 'Disclosed' },
] as const satisfies readonly Term[];

type Ids<T extends readonly Term[]> = T[number]['id'];

/** Tuple of ids for z.enum(). */
export function ids<T extends readonly Term[]>(vocab: T): [Ids<T>, ...Ids<T>[]] {
  return vocab.map((t) => t.id) as [Ids<T>, ...Ids<T>[]];
}

export function term(vocab: readonly Term[], id: string): Term {
  const found = vocab.find((t) => t.id === id);
  if (!found) throw new Error(`Unknown vocabulary id: ${id}`);
  return found;
}

export function label(vocab: readonly Term[], id: string): string {
  return term(vocab, id).label;
}
