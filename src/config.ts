export const SITE_NAME = 'Agentic AI in Organisations — A Living Resource (Prototype)';
export const SITE_SHORT_NAME = 'Agentic AI in Organisations';

export const BANNER = {
  lead: 'Concept prototype — for discussion only.',
  text: 'Prepared by the GPAI Tokyo Centre (NICT). Not an OECD website. All organisations and use cases shown are fictional.',
};

/** External links. Keep in sync with src/content/references/*.yaml. */
export const LINKS = {
  phase1Paper: 'https://doi.org/10.1787/396cf758-en',
  // TODO: confirm DOI once the Phase 2 paper is published.
  phase2Paper: 'https://doi.org/10.1787/1257a26f-en',
  haip: 'https://oecd.ai/en/transparency/overview',
  // TODO: confirm catalogue landing page.
  toolsMetrics: 'https://oecd.ai/en/catalogue/tools',
  incidentsMonitor: 'https://oecd.ai/en/incidents',
} as const;

/** Feedback link; the link is hidden while this is empty. */
export const FEEDBACK_URL = '';

export const LICENCE = {
  citation:
    'OECD (2026), "Agentic AI in organisations: Early insights from practitioner interviews", OECD Artificial Intelligence Papers, No. 65.',
  adaptation:
    'This is an adaptation of an original work by the OECD. The opinions expressed and arguments employed in this adaptation should not be reported as representing the official views of the OECD or of its Member countries.',
};
