export type ResponseObject<Data> = {
  data: Data | null
  error: Error | null
}

export default function response<Data>(data: Data | null, error: Error | null = null): ResponseObject<Data> {
  return { data, error }
}
