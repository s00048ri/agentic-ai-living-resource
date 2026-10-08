import { defineCollection, reference, z } from 'astro:content';
import { file, glob } from 'astro/loaders';
import {
  APPLICATION_AREAS,
  AUTONOMY_LEVELS,
  BENEFITS,
  CLIENT_ORIENTATION,
  DEPLOYMENT_STAGES,
  ECOSYSTEM_ROLES,
  INTENDED_USERS,
  MODEL_DISCLOSURE,
  ORG_TYPES,
  REGIONS,
  SECTORS,
  SOURCE_TYPES,
  ids,
} from './lib/vocabularies';

const challenges = defineCollection({
  loader: file('src/content/challenges.yaml'),
  schema: z.object({
    name: z.string(),
    source_ref: z.string(),
    summary: z.string(),
    incident_feed_planned: z.boolean(),
  }),
});

const responses = defineCollection({
  loader: file('src/content/responses.yaml'),
  schema: z.object({
    name: z.string(),
    parent: reference('responses').nullable(),
    source_ref: z.string(),
    summary: z.string(),
    cross_cutting: z.boolean(),
    addresses: z.array(
      z.object({
        challenge: reference('challenges'),
        basis: z.enum(['explicit', 'editorial']),
      }),
    ),
    tm: z.object({ tool_type: z.enum(['technical', 'procedural']) }).nullable(),
  }),
});

const cases = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/cases' }),
  schema: z
    .object({
      title: z.string(),
      organisation: z.string(),
      fictional: z.literal(true),
      detail_level: z.enum(['full', 'card']),
      summary: z.string(),
      org_type: z.enum(ids(ORG_TYPES)),
      ecosystem_role: z.enum(ids(ECOSYSTEM_ROLES)),
      sector: z.enum(ids(SECTORS)),
      application_area: z.enum(ids(APPLICATION_AREAS)),
      intended_users: z.enum(ids(INTENDED_USERS)),
      client_orientation: z.enum(ids(CLIENT_ORIENTATION)),
      region: z.enum(ids(REGIONS)),
      deployment_stage: z.enum(ids(DEPLOYMENT_STAGES)),
      autonomy_level: z.enum(ids(AUTONOMY_LEVELS)),
      delegation: z
        .object({
          decisions_delegated: z.string(),
          approvals_required: z.string(),
          accountability_owner: z.string(),
        })
        .optional(),
      human_oversight: z.array(z.string()),
      benefits: z.array(z.enum(ids(BENEFITS))),
      challenges: z.array(reference('challenges')),
      responses: z.array(reference('responses')),
      model_disclosure: z.enum(ids(MODEL_DISCLOSURE)),
      source_type: z.enum(ids(SOURCE_TYPES)),
      haip_linked: z.boolean(),
      in_oecd_ai_subset: z.boolean(),
      lessons: z.array(z.string()).optional(),
      last_verified: z.coerce.date(),
      history: z.array(z.object({ date: z.coerce.date(), note: z.string() })),
    })
    .superRefine((c, ctx) => {
      if (c.detail_level !== 'full') return;
      if (!c.delegation) ctx.addIssue({ code: 'custom', path: ['delegation'], message: 'Required when detail_level is full' });
      if (!c.lessons) ctx.addIssue({ code: 'custom', path: ['lessons'], message: 'Required when detail_level is full' });
    }),
});

const references = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/references' }),
  schema: z.object({
    title: z.string(),
    authors: z.string().optional(),
    year: z.number().int().optional(),
    url: z.string().url().optional(),
    type: z.enum(['oecd-publication', 'academic', 'other']),
    status: z.enum(['real', 'to-be-curated']),
  }),
});

export const collections = { challenges, responses, cases, references };
