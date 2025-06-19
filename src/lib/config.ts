export const config = {
  auth0: {
    clientId: process.env.AUTH0_CLIENT_ID!,
    clientSecret: process.env.AUTH0_CLIENT_SECRET!,
    issuerBaseUrl: process.env.AUTH0_ISSUER_BASE_URL!,
  },
  app: {
    baseUrl: process.env.AUTH0_BASE_URL!,
    secret: process.env.AUTH0_SECRET!,
  },
} as const;

// Validation
const requiredEnvVars = [
  "AUTH0_CLIENT_ID",
  "AUTH0_CLIENT_SECRET",
  "AUTH0_ISSUER_BASE_URL",
  "AUTH0_SECRET",
] as const;

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}
