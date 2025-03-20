import { Messages } from "@mjt-engine/message";
import type { Env } from "./Env";

import { assertValue } from "@mjt-engine/assert";
import type { WebclientConnectionMap } from "@mjt-services/webclient-common-2025";
import { getEnv } from "./getEnv";
import { webclientExecListener } from "./listener/webclientExecListener";

export const initConnection = async () => {
  const env = getEnv();
  const url = assertValue(env.NATS_URL);
  console.log("NATS_URL", url);

  const con = await Messages.createConnection<WebclientConnectionMap, Env>({
    subscribers: {
      "webclient.exec": webclientExecListener,
    },
    options: { log: console.log },
    server: [url],
    token: env.NATS_AUTH_TOKEN,
    env,
  });
  console.log("initConnection: init complete");
  return con;
};
