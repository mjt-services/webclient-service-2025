import { type ConnectionListener } from "@mjt-engine/message";
import type { WebclientConnectionMap } from "@mjt-services/webclient-common-2025";
import { webclientProgramExec } from "../playwright/PlaywrightDriver";

export const webclientExecListener: ConnectionListener<
  WebclientConnectionMap,
  "webclient.exec"
> = async (props) => {
  console.log("webclient", props.detail.body);
  const { detail, send, signal } = props;

  const { body } = detail;
  await webclientProgramExec({
    program: body,
    onResult: async ({ op, result }) => {
      send({ op, result });
    },
  });
  // const { url, maxPages, pdf, rateLimitMillis } = body;

  // const driver = new PlaywrightDriver();
  // await driver.launch();
  // await driver.navigate("https://example.com");
  // const screenshot = await driver.screenshot();
  // const html = await driver.html();
  // await driver.close();
  // const markdown = textToMarkdown(html);
  // console.log("Screenshot saved as screenshot.png");
  // return {
  //   html,
  //   screenshot,
  //   markdown,
  // };
  // const { IMAGEGEN_BACKEND_URL } = getEnv();
  // let trackIntervalId: NodeJS.Timeout | undefined = undefined;
  // const abortListener = async () => {
  //   console.log("Aborted!!!");
  //   send({
  //     aborted: true,
  //     images: [],
  //     info: "Aborted",
  //     parameters: {},
  //   });
  //   await interruptImagegen();
  // };
  // try {
  //   if (signal.aborted) {
  //     return;
  //   }
  //   signal.addEventListener("abort", abortListener);
  //   trackIntervalId = setInterval(() => {
  //     trackProgress({ send, signal });
  //   }, 3000);
  //   const fullUrl = `${Asserts.assertValue(
  //     IMAGEGEN_BACKEND_URL
  //   )}/sdapi/v1/txt2img`;
  //   const resp = await fetch(fullUrl, {
  //     signal,
  //     method: "POST",
  //     body: JSON.stringify(detail.body),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   if (signal.aborted) {
  //     return;
  //   }

  //   if (!resp.ok) {
  //     throw Errors.errorToErrorDetail({
  //       error: new Error(`Failed to fetch from: ${fullUrl}`),
  //       extra: [detail.body],
  //     });
  //   }
  //   const respBody = (await resp.json()) as ImageResponse;
  //   const { images, ...rest } = respBody;
  //   const binaryImages = images.map((base64) =>
  //     Bytes.base64ToArrayBuffer(base64)
  //   );

  //   send({
  //     images: binaryImages,
  //     finalized: true,
  //     ...rest,
  //   });
  // } finally {
  //   signal.removeEventListener("abort", abortListener);
  //   if (isDefined(trackIntervalId)) {
  //     clearInterval(trackIntervalId);
  //   }
  // }
};
