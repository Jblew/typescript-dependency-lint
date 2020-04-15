# typescript-dependency-lint
Dependency linter for typescript

## Cli
```bash
$ typescript-dependency-lint
 
  Usage: typescript-dependency-lint [json-config] [glob pattern]
```

```typescript
interface JsonConfig {
  ignore: string [] // glob pattern array
}
``

## Plan
Now:
1. Use commander for cli
2. Use node-glob for file matching
3. (initially) parse imports using refexp: `/^\s{0,}import\s+.*from\s+['"]([^'"]+)['"]/gmi`
4. Resolve all paths in a pwd manner
5. Resolve typescript paths using https://www.npmjs.com/package/tsconfig-paths
6. Print list of dependencies (relative paths) and where are they used

Later:
1. Linting features will be implemented afterwards
