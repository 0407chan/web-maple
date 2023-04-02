export function getWzVersion(): string {
  return localStorage.getItem('wzVersion') || getWzVersion()
}
