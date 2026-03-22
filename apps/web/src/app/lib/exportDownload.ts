import { http } from './axios';

function parseFilename(contentDisposition: string | undefined, fallback: string): string {
  if (!contentDisposition) return fallback;
  const utf8 = /filename\*=UTF-8''([^;\n]+)/i.exec(contentDisposition);
  if (utf8?.[1]) {
    try {
      return decodeURIComponent(utf8[1].trim());
    } catch {
      /* fall through */
    }
  }
  const m = /filename="([^"]+)"/i.exec(contentDisposition) ?? /filename=([^;\s]+)/i.exec(contentDisposition);
  return m?.[1]?.replace(/"/g, '') ?? fallback;
}

/**
 * GET a CSV export (blob) and trigger browser download. Uses JWT from axios interceptors.
 */
export async function downloadCsvExport(
  path: string,
  params: Record<string, string | boolean | undefined>,
  fallbackFilename: string,
): Promise<void> {
  const response = await http.get(path, {
    params,
    responseType: 'blob',
  });
  const filename = parseFilename(response.headers['content-disposition'], fallbackFilename);
  const url = URL.createObjectURL(response.data);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
