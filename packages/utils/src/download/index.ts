class DownloadUtils {
  download(blobData: BlobPart, fileName: string) {
    const url = URL.createObjectURL(new Blob([blobData]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

const downloadUtils = new DownloadUtils();
export default downloadUtils;
