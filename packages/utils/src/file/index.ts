export function formatFileSize(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';
  if (bytes < 0) return 'Invalid size';

  const KB = 1024;
  const MB = KB * 1024;
  const GB = MB * 1024;

  if (bytes < KB) {
    return `${bytes} B`;
  } else if (bytes < MB) {
    return `${(bytes / KB).toFixed(decimals)} KB`;
  } else if (bytes < GB) {
    return `${(bytes / MB).toFixed(decimals)} MB`;
  } else {
    return `${(bytes / GB).toFixed(decimals)} GB`;
  }
}
