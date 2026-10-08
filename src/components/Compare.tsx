import { useEffect, useState } from 'preact/hooks';
import { url } from '../lib/url';

export interface CompareRow {
  label: string;
  /** Value per use case id; arrays render as lists. */
  values: Record<string, string | string[]>;
}

interface Props {
  cases: { id: string; title: string; organisation: string }[];
  rows: CompareRow[];
}

const MAX = 3;

function readIds(valid: Set<string>): string[] {
  const raw = new URLSearchParams(location.search).get('ids') ?? '';
  return [...new Set(raw.split(',').filter((id) => valid.has(id)))].slice(0, MAX);
}

export default function Compare({ cases, rows }: Props) {
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    setSelected(readIds(new Set(cases.map((c) => c.id))));
  }, []);

  function choose(slot: number, id: string) {
    const next = [...selected];
    if (id) next[slot] = id;
    else next.splice(slot, 1);
    const clean = [...new Set(next.filter(Boolean))].slice(0, MAX);
    setSelected(clean);
    const u = new URL(location.href);
    if (clean.length) u.searchParams.set('ids', clean.join(','));
    else u.searchParams.delete('ids');
    history.replaceState(history.state, '', u);
  }

  const slots = Array.from({ length: Math.min(selected.length + 1, MAX) }, (_, i) => i);
  const chosen = selected.map((id) => cases.find((c) => c.id === id)).filter((c) => c !== undefined);

  return (
    <div>
      <div class="pickers">
        {slots.map((slot) => (
          <div class="field" key={slot}>
            <label for={`cmp-${slot}`}>Use case {slot + 1}</label>
            <select id={`cmp-${slot}`} value={selected[slot] ?? ''} onChange={(e) => choose(slot, (e.currentTarget as HTMLSelectElement).value)}>
              <option value="">{slot < selected.length ? 'Remove' : 'Select…'}</option>
              {cases.map((c) => (
                <option value={c.id} key={c.id} disabled={selected.includes(c.id) && selected[slot] !== c.id}>
                  {c.organisation} — {c.title}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      {chosen.length === 0 ? (
        <p>Select up to three use cases to compare their common fields side by side.</p>
      ) : (
        <div class="table-wrap">
          <table class="compare">
            <caption class="visually-hidden">Common fields of the selected use cases</caption>
            <thead>
              <tr>
                <th scope="col">Common field</th>
                {chosen.map((c) => (
                  <th scope="col" key={c.id}>
                    <a href={url(`/cases/${c.id}/`)}>{c.organisation}</a>
                    <span class="badge badge-fictional">Fictional example</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label}>
                  <th scope="row">{r.label}</th>
                  {chosen.map((c) => {
                    const v = r.values[c.id] ?? '';
                    return (
                      <td key={c.id}>
                        {Array.isArray(v) ? (
                          <ul>
                            {v.map((x) => (
                              <li key={x}>{x}</li>
                            ))}
                          </ul>
                        ) : (
                          v
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
