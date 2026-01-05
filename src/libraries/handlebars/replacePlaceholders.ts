import { asyncHandlebars } from './asyncHandlebars.js'

export const replacePlaceholders = (prompt: string, values: object) => {
  // Mustache.render is synchronous and doesn't use eval/new Function
  // It's safe for Cloudflare Workers
  return Promise.resolve(asyncHandlebars.render(prompt, values))
}
