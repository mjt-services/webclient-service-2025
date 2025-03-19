import { type ConnectionListener } from "@mjt-engine/message";
import type { WebclientConnectionMap } from "@mjt-services/webclient-common-2025";

export const webclientScrapeListener: ConnectionListener<
  WebclientConnectionMap,
  "webclient.scrape"
> = async (props) => {
  console.log("webclient", props.detail.body);
  const { detail, send, signal } = props;
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
