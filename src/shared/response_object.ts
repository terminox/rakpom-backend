export type ResponseObject<Data> = {
  data: Data | null
  error: string | null
}

export default function response<Data>(data: Data | null, error: Error | null = null): ResponseObject<Data> {
  return { data, error: error?.message ?? null }
}
