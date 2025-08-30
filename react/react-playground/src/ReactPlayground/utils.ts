export const filenameLanguage = (name: string) => { // App.tsx
  const suffix = name.split('.').pop() || ''
  if (suffix === 'tsx' || suffix === 'ts') return 'typescript'
  if (suffix === 'jsx' || suffix === 'js') return 'javascript'
  if (suffix === 'json') return 'json'
  if (suffix === 'css') return 'css'
  return 'javascript'
}
