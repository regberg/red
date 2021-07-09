import { browser, element, by } from "protractor";

export class UnicornMedicalPage {
  navigateTo() {
    return browser.get("/");
  }

  getParagraphText() {
    return element(by.css("app-dashboard h2")).getText();
  }
}
