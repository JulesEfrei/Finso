#!/bin/bash

# Check if the first argument is provided and equals "dev"
if [ "$1" = "dev" ]; then
  bun run migrate && bun run src/utils/dataFixture.ts
else
  bun run db/migrate.js && bun run db/dataFixture.js
fi
