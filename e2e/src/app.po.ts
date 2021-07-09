import { browser, element, by } from "protractor";

export class UnicornMedicalPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  /**
   * Ermittelt den Text im <h2>-Tag der DashboardComponent.
   */
  async getTitleText(): Promise<string> {
    return element(by.css("app-dashboard h2")).getText();
  }

  getParagraphText() {
    return element(by.css("app-root h1")).getText();
  }
}
