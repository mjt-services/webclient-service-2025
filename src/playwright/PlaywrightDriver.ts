import type {
  WebClientOp,
  WebClientProgram,
} from "@mjt-services/webclient-common-2025";
import { Browser, chromium, Page } from "playwright";
import { textToMarkdown } from "../listener/textToMarkdown";

export const webclientProgramExec = async ({
  program,
  onResult,
}: {
  program: WebClientProgram;
  onResult: (params: {
    op: WebClientOp;
    result: unknown;
  }) => void | Promise<void>;
}) => {
  const driver = new PlaywrightDriver();
  await driver.launch();
  for (const op of program) {
    const result = await webclientOpExec({ op, driver });
    await onResult({ op, result });
  }
  await driver.close();
};

export const webclientOpExec = async ({
  op,
  driver,
}: {
  op: WebClientOp;
  driver: PlaywrightDriver;
}) => {
  try {
    switch (op.name) {
      case "open":
        return driver.navigate(op.params as string);
      case "close":
        return driver.close();
      case "screenshot":
        return driver.screenshot();
      case "pdf":
        return driver.pdf();
      case "html":
        return driver.html();
      case "markdown": {
        const html = await driver.html();
        return textToMarkdown(html);
      }
    }
  } catch (error) {
    return error;
  }
};

export class PlaywrightDriver {
  private browser?: Browser;
  private page?: Page;

  async launch(): Promise<void> {
    this.browser = await chromium.launch({
      headless: true, // Running inside a Docker container
    });
    this.page = await this.browser.newPage();
  }

  async navigate(url: string) {
    if (!this.page) throw new Error("Browser not initialized");
    return await this.page.goto(url);
  }

  async screenshot() {
    if (!this.page) throw new Error("Page not initialized");
    return await this.page.screenshot();
  }

  async html() {
    if (!this.page) throw new Error("Page not initialized");
    return await this.page.content();
  }

  async pdf() {
    if (!this.page) throw new Error("Page not initialized");
    return await this.page.pdf();
  }

  async close(): Promise<void> {
    await this.browser?.close();
    this.browser = undefined;
  }
}
