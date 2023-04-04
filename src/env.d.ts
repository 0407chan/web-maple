/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ID: string
  readonly VITE_REGION: string
  readonly VITE_VERSION: string

  readonly VITE_PRIVATE_KEY: string
  readonly VITE_GOOGLE_SHEETS_ID: string
  readonly VITE_CLIENT_EMAIL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
