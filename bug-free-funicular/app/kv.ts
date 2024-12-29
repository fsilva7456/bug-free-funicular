import { kv } from '@vercel/kv'

if (!kv) {
  throw new Error('VERCEL_KV_URL and VERCEL_KV_REST_API_TOKEN environment variables must be set')
}

export { kv }

