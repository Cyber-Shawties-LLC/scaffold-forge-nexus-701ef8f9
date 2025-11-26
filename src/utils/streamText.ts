/**
 * Simulates typing effect by streaming text character by character
 * @param text - The full text to stream
 * @param callback - Function called with progressively longer text slices
 * @param delayMs - Delay between characters (default: 8ms)
 */
export async function streamText(
  text: string,
  callback: (partial: string) => void,
  delayMs: number = 8
): Promise<void> {
  for (let i = 0; i <= text.length; i++) {
    await new Promise(resolve => setTimeout(resolve, delayMs));
    callback(text.slice(0, i));
  }
}
