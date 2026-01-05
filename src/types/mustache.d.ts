declare module 'mustache' {
  export interface MustacheStatic {
    render(template: string, view: any, partials?: any, tags?: string[]): string
    parse(template: string, tags?: string[]): any
    clearCache(): void
    escape: (text: string) => string
    tags: string[]
  }

  const Mustache: MustacheStatic
  export default Mustache
}
