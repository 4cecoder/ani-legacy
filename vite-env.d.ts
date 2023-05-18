// vite-env.d.ts
interface ImportMeta {
  env: {
    [key: string]: string | undefined;
    VITE_BASE_URL: string;
  };
}
