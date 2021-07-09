import { HttpModule } from "@angular/http";
import { StackoverflowComponent } from "./../stackoverflow/stackoverflow.component";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DashboardComponent } from "./dashboard.component";
import { SearchService } from "app/core/services/search.service";
import { By } from "@angular/platform-browser";

describe("DashboardComponent", () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent, StackoverflowComponent],
      imports: [HttpModule],
      providers: [SearchService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Überprüft, ob DashboardComponent erzeugt werden konnte.
   */
  it("should create", () => {
    expect(component).toBeTruthy();
  });

  /**
   * Überprüft in der View den dargestellten Titel von DashboardComponent.
   */
  it("should set title", () => {
    const textOutput = fixture.debugElement.query(By.css("h2"));

    expect(textOutput.nativeElement.textContent).toContain(
      "Die 10 aktuellsten Fragen"
    );
  });
});
