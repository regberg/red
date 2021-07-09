import { UnicornMedicalPage } from "./app.po";
import { browser, logging } from "protractor";

describe("unicorn-medical App", () => {
  let page: UnicornMedicalPage;

  beforeEach(() => {
    page = new UnicornMedicalPage();
  });

  /**
   * Überprüft die Überschrift der Applikation.
   */
  it("should display title", async () => {
    await page.navigateTo();
    expect(await page.getTitleText()).toContain("Die 10 aktuellsten Fragen");
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });
});
