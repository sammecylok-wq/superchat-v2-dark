import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  const configuredPort = Number(env.DEV_SERVER_PORT);
  const devServerPort = Number.isInteger(configuredPort) && configuredPort > 0
    ? configuredPort
    : 5176;
  const clientLoginUrl = env.VITE_CLIENT_LOGIN_URL?.trim();

  if (mode === "production" && clientLoginUrl) {
    const isPublicHttpsUrl = /^https:\/\/(?!localhost(?::|\/|$))(?!127\.0\.0\.1(?::|\/|$))(?!\[?::1\]?(?::|\/|$))\S+$/i
      .test(clientLoginUrl);

    if (!isPublicHttpsUrl) {
      throw new Error(
        "VITE_CLIENT_LOGIN_URL must be a public HTTPS URL for production builds.",
      );
    }
  }

  return {
    plugins: [react()],
    server: {
      host: env.DEV_SERVER_HOST || "0.0.0.0",
      port: devServerPort,
      strictPort: true,
    },
    build: { outDir: "dist", sourcemap: false },
  };
});
