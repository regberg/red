import { UnicornMedicalPage } from "./app.po";

describe("unicorn-medical App", () => {
  let page: UnicornMedicalPage;

  beforeEach(() => {
    page = new UnicornMedicalPage();
  });

  it("should display title", () => {
    page.navigateTo();
    expect(page.getParagraphText()).toContain("Die 10 aktuellsten Fragen");
  });
});
