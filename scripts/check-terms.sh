#!/usr/bin/env bash
# Prohibited-terms check.
#   --staged  lines added in the staged diff (pre-commit hook)
#   --tree    the working tree (tracked and untracked, not ignored)
#   --dist    the built site in dist/
# Term lists: scripts/public-terms.txt, plus internal terms from .terms.local or the
# INTERNAL_TERMS environment variable (newline-separated). Matching is whole-word,
# case-insensitive, fixed-string. Lines containing a string from scripts/allow-terms.txt are ignored.
set -euo pipefail

cd "$(dirname "$0")/.."
MODE="${1:-}"
case "$MODE" in --staged | --tree | --dist) ;; *) echo "usage: $0 --staged|--tree|--dist" >&2; exit 2 ;; esac

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

# Strip comments and blank lines (a blank pattern would match every line).
clean() { grep -v -e '^[[:space:]]*#' -e '^[[:space:]]*$' "$@" 2>/dev/null || true; }

clean scripts/public-terms.txt > "$TMP/terms"
if [[ -n "${INTERNAL_TERMS:-}" ]]; then
  printf '%s\n' "$INTERNAL_TERMS" | clean >> "$TMP/terms"
elif [[ -f .terms.local ]]; then
  clean .terms.local >> "$TMP/terms"
else
  echo "check-terms: warning: no internal terms list (.terms.local or INTERNAL_TERMS); checking public terms only." >&2
fi
clean scripts/allow-terms.txt > "$TMP/allow"

EXCLUDE_RE='^(node_modules/|\.git/|dist/|\.astro/)|^(scripts/public-terms\.txt|scripts/allow-terms\.txt|\.terms\.local|SPEC\.md)$'
# Same, for "path<TAB>..." records.
EXCLUDE_REC="${EXCLUDE_RE%\$}"$'\t'

# Produce "path<TAB>line<TAB>text" records on stdout.
records() {
  case "$MODE" in
    --staged)
      git diff --cached --relative -U0 --no-color --diff-filter=ACMR | awk '
        /^\+\+\+ / { f = substr($0, 7); next }
        /^@@ / { split($3, a, ","); n = substr(a[1], 2) + 0; next }
        /^\+/ { print f "\t" n "\t" substr($0, 2); n++ }' | grep -Ev "$EXCLUDE_REC" || true
      ;;
    --tree)
      if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
        git ls-files -co --exclude-standard
      else
        find . -type f | sed 's|^\./||'
      fi | grep -Ev "$EXCLUDE_RE" | while IFS= read -r f; do
        [[ -f "$f" ]] && grep -IHn '' -- "$f" | sed -E 's/^([^:]*):([0-9]+):/\1\t\2\t/' || true
      done
      ;;
    --dist)
      [[ -d dist ]] || { echo "check-terms: dist/ not found. Run npm run build first." >&2; exit 1; }
      find dist -type f | while IFS= read -r f; do grep -IHn '' -- "$f" | sed -E 's/^([^:]*):([0-9]+):/\1\t\2\t/' || true; done
      ;;
  esac
}

records > "$TMP/records"

hits=0
# Pre-filter quickly, then re-check the text column only.
grep -iwF -f "$TMP/terms" "$TMP/records" > "$TMP/candidates" || true
while IFS=$'\t' read -r path line text; do
  words="$(printf '%s\n' "$text" | grep -oiwF -f "$TMP/terms" | sort -fu | paste -sd, - || true)"
  [[ -z "$words" ]] && continue
  if [[ -s "$TMP/allow" ]] && printf '%s\n' "$text" | grep -qF -f "$TMP/allow"; then continue; fi
  echo "$path:$line: prohibited term: $words"
  hits=$((hits + 1))
done < "$TMP/candidates"

if (( hits > 0 )); then
  echo "check-terms ($MODE): $hits line(s) contain prohibited terms." >&2
  exit 1
fi
echo "check-terms ($MODE): OK"
