#!/bin/bash
set -euo pipefail

echo "Generating code and config hashes for all Lambda functions..."

FUNCTIONS_ROOT="lambda/functions"

find "$FUNCTIONS_ROOT" -mindepth 1 -maxdepth 1 -type d -not -path '*/.*' | sort | while read -r func_dir; do
  echo ""
  echo "Processing: $func_dir"

  CODE_HASH=$(find "$func_dir" -type f ! -name "config.json" ! -name ".code.hash" ! -name ".config.hash" -exec sha256sum {} + | sort | sha256sum | awk '{print $1}')

  CONFIG_FILE="$func_dir/config.json"
  if [[ -f "$CONFIG_FILE" ]]; then
    CONFIG_HASH=$(sha256sum "$CONFIG_FILE" | awk '{print $1}')
  else
    CONFIG_HASH="N/A"
  fi

  echo "Code Hash: $CODE_HASH"
  echo "Config Hash: $CONFIG_HASH"

  echo "$CODE_HASH" >"$func_dir/.code.hash"
  echo "$CONFIG_HASH" >"$func_dir/.config.hash"

done

echo ""
echo "Done hashing all functions."
