import Mustache from 'mustache'

// Mustache doesn't need async helpers since it doesn't use eval/new Function
// It's a simple logic-less template engine that's Cloudflare Workers compatible
export const asyncHandlebars = Mustache
