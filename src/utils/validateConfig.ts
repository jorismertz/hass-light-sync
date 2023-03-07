import { Config } from "../types";

function validate(config: Config) {
  const totalEntities = config.homeAssistant.entities.length;
  const requiredEntities = config.zones.reduce((a, b) => a + b, 0);

  if (totalEntities !== requiredEntities)
    return {
      valid: false,
      message: `You have ${totalEntities} entities configured, but specified ${requiredEntities} zones.`,
    };

  return { valid: true, message: "ok" };
}

export function validateConfig(config: Config) {
  const { valid, message } = validate(config);
  if (!valid) throw new Error(message);
}
