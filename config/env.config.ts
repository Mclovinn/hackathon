interface GoogleCloudConfig {
  apiKey: string
}

const googleCloudConfig: GoogleCloudConfig = {
  apiKey: process.env.LOGISTICS_GOOGLE_API_KEY || '',
}

export const config: { googleCloudConfig: GoogleCloudConfig } = {
  googleCloudConfig: googleCloudConfig,
}
