/** Only the first few selected files are attached. */
export const MAX_ATTACHMENTS = 5

/** Sent as images. OpenAI accepts these formats directly. */
export const IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'gif', 'webp']
/** Images converted to JPEG with `sips` first, since OpenAI doesn't accept them. */
export const CONVERTIBLE_IMAGE_EXTENSIONS = ['heic', 'heif', 'tif', 'tiff', 'bmp']
/** Converted to plain text with macOS `textutil`. */
export const DOCUMENT_EXTENSIONS = ['doc', 'docx', 'rtf', 'rtfd', 'odt', 'html', 'htm', 'webarchive']
/** Audio and video formats macOS can read. Whether a file is sent as audio or video depends on the tracks it has. */
export const MEDIA_EXTENSIONS = ['mp3', 'm4a', 'm4b', 'wav', 'aac', 'aif', 'aiff', 'aifc', 'caf', 'flac', 'mp4', 'mov', 'm4v', '3gp']
/** Read as UTF-8 text. Other extensions are also read as text if the file doesn't look binary. */
export const TEXT_EXTENSIONS = ['txt', 'md', 'markdown', 'csv', 'tsv', 'json', 'xml', 'yaml', 'yml', 'log', 'ts', 'tsx', 'js', 'jsx', 'py', 'swift', 'go', 'rs', 'java', 'rb', 'sh', 'css', 'sql']

export const MAX_IMAGE_BYTES = 20 * 1024 * 1024
export const MAX_PDF_BYTES = 32 * 1024 * 1024
export const MAX_TEXT_FILE_BYTES = 2 * 1024 * 1024
/** Extracted text is cut to this length so a long document doesn't blow the model's context. */
export const MAX_TEXT_CHARS = 120_000
/** Longer recordings take a long time to transcribe and add up in cost. */
export const MAX_MEDIA_SECONDS = 2 * 60 * 60
/** Sound is transcribed in clips of this length, under the transcription model's 25 minute limit. */
export const AUDIO_CHUNK_SECONDS = 20 * 60
/** One frame for every few seconds of video, up to a cap, so short clips aren't over-sampled and long ones stay cheap. */
export const SECONDS_PER_VIDEO_FRAME = 5
export const MAX_VIDEO_FRAMES = 12
/** Bytes checked for a NUL byte to tell text files from binary ones. */
export const BINARY_SNIFF_BYTES = 8000

export const THUMBNAIL_SIZE = { width: 96, height: 96 }
/** How long a `textutil`/`sips` conversion may take. */
export const CONVERT_TIMEOUT_MS = 15_000
/** How long reading an audio or video file's length and tracks may take. */
export const MEDIA_INFO_TIMEOUT_MS = 10_000
/** How long cutting a recording into clips and frames may take; a two hour file takes a minute or two. */
export const MEDIA_PREPARE_TIMEOUT_MS = 5 * 60 * 1000

export const IMAGE_MIME_TYPES: Record<string, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  webp: 'image/webp'
}
