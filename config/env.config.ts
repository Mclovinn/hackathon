interface ServerConfig {
  protocol: string
  port: number
  hostname: string
}

const apiServerConfig: ServerConfig = {
  protocol: process.env.SP_API_PROTOCOL || 'http',
  port: parseInt(process.env.SP_API_PORT as string) || 3001,
  hostname: process.env.SP_API_HOSTNAME || 'localhost',
}

export const config: { apiServer: ServerConfig } = {
  apiServer: apiServerConfig,
}
