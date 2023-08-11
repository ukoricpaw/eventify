export default async function copyToClipboard(text: string) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
  } else {
    const textArea = document.createElement('textarea');
    textArea.style.position = 'absolute';
    textArea.style.opacity = '0';
    textArea.value = text;

    document.body.prepend(textArea);

    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error(err);
    } finally {
      textArea.remove();
    }
  }
}
