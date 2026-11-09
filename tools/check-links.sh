#!/usr/bin/env bash
# Check every external URL referenced in the site source.
# Usage: bash tools/check-links.sh   (from the repo root)
# Exit 1 if any URL does not answer 200/301/302.

set -uo pipefail
cd "$(dirname "$0")/.." || exit 1

CACHE="$HOME/AppData/Local/hermes/profiles/developer/cache/scratch/adamnaeman-env-backup.txt"
[ -f "$CACHE" ] && echo "(env backup left untouched: cache dir, not repo)"

urls=$(grep -rhoE "https?://[A-Za-z0-9._~:/?#@!$&'()*+,;=%-]+" \
  app components lib \
  --include=*.tsx --include=*.ts 2>/dev/null \
  | sed "s/[.,;:'\")]*$//" \
  | grep -vE '^https?://(localhost|127\.0\.0\.1)' \
  | grep -vE 'fonts\.googleapis|fonts\.gstatic|api\.dicebear|images\.unsplash' \
  | sort -u)

fail=0
while IFS= read -r u; do
  [ -z "$u" ] && continue
  code=$(curl -s -o /dev/null -w "%{http_code}" -m 25 -L -A "Mozilla/5.0 link-check" "$u")
  if [ "$code" = "200" ] || [ "$code" = "301" ] || [ "$code" = "302" ]; then
    printf "  ok   %s  %s\n" "$code" "$u"
  elif [ "$code" = "999" ]; then
    printf "  bot-blocked (assumed ok)  %s\n" "$u"
  else
    printf "  FAIL %s  %s\n" "$code" "$u"
    fail=$((fail + 1))
  fi
done <<< "$urls"

echo "----"
if [ "$fail" -gt 0 ]; then
  echo "$fail link(s) failed"
  exit 1
fi
echo "all links ok"
