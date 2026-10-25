/** Only the first few selected files are attached. */
export const MAX_ATTACHMENTS = 5

/** Sent as images. OpenAI accepts these formats directly. */
export const IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'gif', 'webp']
/** Images converted to JPEG with `sips` first, since OpenAI doesn't accept them. */
export const CONVERTIBLE_IMAGE_EXTENSIONS = ['heic', 'heif', 'tif', 'tiff', 'bmp']
/** Converted to plain text with macOS `textutil`. */
export const DOCUMENT_EXTENSIONS = ['doc', 'docx', 'rtf', 'rtfd', 'odt', 'html', 'htm', 'webarchive']
/** Read as UTF-8 text. Other extensions are also read as text if the file doesn't look binary. */
export const TEXT_EXTENSIONS = ['txt', 'md', 'markdown', 'csv', 'tsv', 'json', 'xml', 'yaml', 'yml', 'log', 'ts', 'tsx', 'js', 'jsx', 'py', 'swift', 'go', 'rs', 'java', 'rb', 'sh', 'css', 'sql']

export const MAX_IMAGE_BYTES = 20 * 1024 * 1024
export const MAX_PDF_BYTES = 32 * 1024 * 1024
export const MAX_TEXT_FILE_BYTES = 2 * 1024 * 1024
/** Extracted text is cut to this length so a long document doesn't blow the model's context. */
export const MAX_TEXT_CHARS = 120_000
/** Bytes checked for a NUL byte to tell text files from binary ones. */
export const BINARY_SNIFF_BYTES = 8000

export const THUMBNAIL_SIZE = { width: 96, height: 96 }
/** How long a `textutil`/`sips` conversion may take. */
export const CONVERT_TIMEOUT_MS = 15_000

export const IMAGE_MIME_TYPES: Record<string, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  webp: 'image/webp'
}
