import * as fs from 'fs'

const regexp = /^\s{0,}import\s+.*from\s+['"]([^'"]+)['"]/gmu

export function getImports(path: string) {
  const contents = readFile(path)
  const matches = contents.matchAll(regexp)
  return matchesToImports(matches)
}

function readFile(path: string) {
  return fs.readFileSync(path, 'utf8').toString()
}

function matchesToImports(
  matchesIterator: IterableIterator<RegExpMatchArray>,
): string[] {
  const out: string[] = []
  for (const match of matchesIterator) {
    const path = match[1]
    if (path) out.push(path)
  }
  return out
}
