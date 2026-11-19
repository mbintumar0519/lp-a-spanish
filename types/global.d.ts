type FacebookPixel = (
  command: "track" | "trackCustom" | "init",
  eventName: string,
  parameters?: Record<string, unknown>,
  options?: { eventID?: string },
) => void;

interface Window {
  fbq?: FacebookPixel;
  ajax?: { get: (url: string) => void };
}
