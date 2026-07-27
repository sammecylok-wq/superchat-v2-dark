/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLIENT_LOGIN_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
