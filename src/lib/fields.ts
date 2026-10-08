import {
  APPLICATION_AREAS,
  AUTONOMY_LEVELS,
  CLIENT_ORIENTATION,
  DEPLOYMENT_STAGES,
  ECOSYSTEM_ROLES,
  INTENDED_USERS,
  ORG_TYPES,
  REGIONS,
  SECTORS,
  type Term,
} from './vocabularies';

/** Single-valued common fields described by a controlled vocabulary. */
export interface CommonField {
  key:
    | 'org_type'
    | 'ecosystem_role'
    | 'sector'
    | 'application_area'
    | 'intended_users'
    | 'client_orientation'
    | 'region'
    | 'deployment_stage'
    | 'autonomy_level';
  label: string;
  definition: string;
  vocab: readonly Term[];
}

export const COMMON_FIELD_NOTE = 'Common field — used to compare use cases.';

export const COMMON_FIELDS: readonly CommonField[] = [
  { key: 'org_type', label: 'Organisation type', definition: 'The kind of organisation describing the use case.', vocab: ORG_TYPES },
  { key: 'ecosystem_role', label: 'Role in the AI ecosystem', definition: 'Whether the organisation develops the system, deploys it, or both.', vocab: ECOSYSTEM_ROLES },
  { key: 'sector', label: 'Sector', definition: 'The sector in which the organisation operates.', vocab: SECTORS },
  { key: 'application_area', label: 'Application area', definition: 'The type of task the agent is used for.', vocab: APPLICATION_AREAS },
  { key: 'intended_users', label: 'Intended users', definition: 'Who uses the agent: people inside the organisation, outside it, or both.', vocab: INTENDED_USERS },
  { key: 'client_orientation', label: 'Client orientation', definition: 'Whom the use case ultimately serves.', vocab: CLIENT_ORIENTATION },
  { key: 'region', label: 'Region', definition: 'Where the use case is deployed.', vocab: REGIONS },
  { key: 'deployment_stage', label: 'Deployment stage', definition: 'How far the use case has progressed, from research to full deployment.', vocab: DEPLOYMENT_STAGES },
  { key: 'autonomy_level', label: 'Autonomy level', definition: 'How much the agent does without prior human approval (provisional categories for this prototype).', vocab: AUTONOMY_LEVELS },
];
