export function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date + 'T12:00:00Z'))
}

export function normalizeRoute(path: string) {
  let normalized = path.split(/[?#]/, 1)[0].replace(/index\.html$/, '').replace(/\.html$/, '/')

  if (!normalized.startsWith('/')) {
    normalized = '/' + normalized
  }

  if (!normalized.endsWith('/')) {
    normalized += '/'
  }

  return normalized
}
