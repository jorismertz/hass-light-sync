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
  const verbose = configuration?.verbose;
  if (options.verboseOnly && !verbose) return;

  const time = new Date().toLocaleString();
  const formattedMessage = `${time}: ${message}`;

  switch (options.level) {
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
