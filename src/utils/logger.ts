import { configuration } from "../../config";

interface LogOptions {
  level?: "info" | "warn" | "error";
  verboseOnly?: boolean;
  data?: unknown;
}

const defaultLogOptions: LogOptions = {
  level: "info",
  verboseOnly: false,
};

export function log(message: string, options: LogOptions = defaultLogOptions) {
  const { level } = options;
  const verbose = configuration?.verbose;

  const time = new Date().toLocaleString();
  const formattedMessage = `${time}: ${message}`;

  if (options.verboseOnly && !verbose) return;

  switch (level) {
    case "warn":
      console.warn(formattedMessage);
      break;
    case "error":
      console.error(formattedMessage);
      break;
    default:
      console.log(formattedMessage);
  }

  if (options?.data) console.log(options.data);
}
