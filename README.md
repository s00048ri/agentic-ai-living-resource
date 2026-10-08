# Agentic AI in Organisations — A Living Resource (Prototype)

**Concept prototype — for discussion only.** Prepared by the GPAI Tokyo Centre (NICT). This is not an OECD website. All organisations and use cases shown are fictional.

This repository contains a static, clickable prototype illustrating how a continuously updated resource on agentic AI in organisations could be structured: use cases described through common fields and free narrative, the challenges organisations encounter, and the governance responses they adopt.

## Sources and licence notice

The challenges and governance-responses taxonomy is adapted from OECD (2026), "Agentic AI in organisations: Early insights from practitioner interviews", *OECD Artificial Intelligence Papers*, No. 65, licensed under CC BY 4.0.

This is an adaptation of an original work by the OECD. The opinions expressed and arguments employed in this adaptation should not be reported as representing the official views of the OECD or of its Member countries.

## Development

```bash
npm ci
git config core.hooksPath .githooks   # enable the pre-commit content check
npm run dev
npm run check && npm run build && npm run check:links && npm run check:terms
```

Content lives in `src/content/`. The taxonomy files and the fictional use cases are fixed for this prototype.
