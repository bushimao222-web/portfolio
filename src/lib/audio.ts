export function playHapticBeep() {
  if (typeof window === "undefined") return;

  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as typeof window & {
        webkitAudioContext?: typeof AudioContext;
      }).webkitAudioContext;

    if (!AudioContextClass) return;

    const audioContext = new AudioContextClass();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(180, audioContext.currentTime);

    gainNode.gain.setValueAtTime(0.025, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + 0.04
    );

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.04);

    oscillator.addEventListener("ended", () => {
      audioContext.close().catch(() => {});
    });
  } catch {
    // Audio feedback is optional, so silently ignore unsupported browsers.
  }
}