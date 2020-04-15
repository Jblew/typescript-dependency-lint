ts-node src/index.ts \
  --config "{\"tsconfigPath\": \"./tsconfig.json\",\"ignore\": [\"**/*.spec.ts\"]}" \
  analyze "src/**/*.@(ts|vue)"
