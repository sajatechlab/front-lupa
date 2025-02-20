interface Config {
  API_URL: string
}

const config: Config = {
  API_URL: (import.meta.env?.VITE_API_URL as string) ?? 'http://localhost:3000',
}

export default config
