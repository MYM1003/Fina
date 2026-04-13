export type Gender = 'femenino' | 'masculino' | 'prefiero_no_decir';

/**
 * Picks the right gendered word.
 * - 'femenino'  → returns the feminine form ("sola")
 * - 'masculino' → returns the masculine form ("solo")
 * - 'prefiero_no_decir' → combines both as "masc/fem-suffix"
 *   e.g. g(_, 'sola', 'solo') → "solo/a"
 *        g(_, 'acompañada', 'acompañado') → "acompañado/a"
 *        g(_, 'Bancarizada', 'Bancarizado') → "Bancarizado/a"
 *        g(_, 'Inversora', 'Inversor') → "Inversor/a"
 */
export function g(gender: Gender | undefined, fem: string, masc: string): string {
  if (gender === 'femenino') return fem;
  if (gender === 'masculino') return masc;

  // "prefiero_no_decir" — merge the two forms.
  // Find the shared prefix, then append both distinct suffixes separated by "/".
  let i = 0;
  while (i < masc.length && i < fem.length && masc[i] === fem[i]) i++;
  const root = masc.slice(0, i);
  const mascEnd = masc.slice(i);
  const femEnd = fem.slice(i);
  if (root.length > 0 && mascEnd.length <= 3 && femEnd.length <= 3) {
    return `${root}${mascEnd}/${femEnd}`;
  }
  return `${masc}/${fem}`;
}
