import { TestBed, inject } from "@angular/core/testing";
import { SearchService } from "./search.service";
import {
  HttpModule,
  ResponseOptions,
  Response,
  XHRBackend,
  RequestMethod,
} from "@angular/http";
import { MockBackend } from "@angular/http/testing";

/**
 * Mockdaten zum Testen von SearchService
 */
const mockResponse = {
  data: [
    {
      answer_count: 0,
      closed_date: 1625724823,
      closed_reason: "Not suitable for this site",
      creation_date: 1625724198,
      is_answered: false,
      last_activity_date: 1625724894,
      link: "https://stackoverflow.com/questions/68296363/what-does-the-fetch-inside-the-weather-object-do-in-this-code",
      score: -3,
      tags: ["javascript", "api", "openweathermap"],
      title: "What does the fetch() inside the weather object do in this code?",
      view_count: 18,
    },
    {
      answer_count: 3,
      closed_date: 1625724823,
      closed_reason: "Not suitable for this site",
      creation_date: 1532880973,
      is_answered: false,
      last_activity_date: 1625222337,
      link: "https://stackoverflow.com/questions/51582233/weather-js-extracting-specific-data-from-what-is-printed",
      score: 0,
      tags: ["javascript", "json", "node.js"],
      title: "weather-js extracting specific data from what is printed",
      view_count: 246,
    },
  ],
};

describe("SearchService", () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        SearchService,
        { provide: XHRBackend, useClass: MockBackend },
      ],
    }).compileComponents();
  });

  /**
   * Überprüft, ob SearchService instanziiert werden konnte.
   */
  it("should be created", inject([SearchService], (service: SearchService) => {
    expect(service).toBeTruthy();
  }));

  /**
   * Überprüft die Request-Methode, die Request-URL und die von SearchService gelieferten Daten.
   */
  it("should return an Observable<JSON>", inject(
    [SearchService, XHRBackend],
    (service: SearchService, mockBackend) => {
      // Überprüfen der Request-Methode auf GET,
      // Überprüfen der Request-URL auf SearchService.apiUrl + "Weather"
      let options = new ResponseOptions({
        body: JSON.stringify(mockResponse),
      });

      mockBackend.connections.subscribe((connection) => {
        expect(connection.request.method).toBe(RequestMethod.Get);
        expect(connection.request.url).toBe(SearchService.apiUrl + "Weather");
        connection.mockRespond(new Response(options));
      });

      // Überprüfen der von SearchService gelieferten Daten mit den Mockdaten
      let itemsWeather;
      service
        .search(SearchService.apiUrl, "Weather")
        .subscribe((responseData) => {
          itemsWeather = responseData;
          expect(itemsWeather.data.length).toBe(2);
          expect(itemsWeather.data[0].title).toEqual(
            "What does the fetch() inside the weather object do in this code?"
          );
          expect(itemsWeather.data[1].title).toEqual(
            "weather-js extracting specific data from what is printed"
          );
        });
    }
  ));
});
