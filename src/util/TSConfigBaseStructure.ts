export interface TSConfigBaseStructure {
  absoluteBaseUrl: string

  compilerOptions: {
    baseUrl: string
    paths: Record<string, string[]>
  }
}
