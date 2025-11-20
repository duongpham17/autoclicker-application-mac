export const randomid = (): string => {
  const id = Math.random().toString(36).substring(7);
  return id;
};

export const generateid = (times: number = 2): string => {
  const id = Array.from({length: times}, () => randomid()).join("");
  return id
};

export const capitalise = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const secondsToMinutes = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}m ${remainingSeconds.toString().padStart(2, '0')}s`;
};

export const copyToClipboard = (data: any) => {
  if(typeof data !== "string") return navigator.clipboard.writeText(JSON.stringify(data));
  return navigator.clipboard.writeText(data);
};

export const readFromClipboard = async (): Promise<any | null> => {
  try {
    const data = await navigator.clipboard.readText();
    if (!data) return null;

    try {
      return JSON.parse(data); // Try parsing JSON
    } catch {
      return data; // Fallback: return raw string
    }
  } catch (error) {
    console.error("Clipboard access error:", error);
    return null;
  }
};


