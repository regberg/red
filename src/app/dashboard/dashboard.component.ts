import { AfterContentChecked, Component, OnInit } from "@angular/core";
import { SearchService } from "app/core/services/search.service";
import { Subscription } from "rxjs";
import * as weatherdata from "app/core/services/weatherdata.json";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit, AfterContentChecked {
  constructor(protected readonly searchService: SearchService) {}

  /**
   * Datenstrukturen, die die darzustellenden Daten je nach Suchbegriff beinhalten
   */
  public itemsTypeScript;
  public itemsAngular2;
  public itemsWeather;

  /**
   * Subscription-Objekte zum Füllen der Datenstrukturen "itemsTypeScript", "itemsAngular2", "itemsWeather"
   */
  private subscriptionTypeScript: Subscription;
  private subscriptionAngular2: Subscription;
  private subscriptionWeather: Subscription;

  /**
   * Datenstrukturen, die zum Erzeugen und Füllen eines Arrays mit lokalen und Remote-Wetterdaten dienen
   */
  public localWeatherData;
  public localWeatherDataArray = [];
  public remoteWeatherDataArray = [];
  public resultWeatherDataArray = [];

  /**
   * Propertys, die beim Aufruf der StackoverflowComponent an diese übergeben werden
   */
  public keyWordTypeScript = "TypeScript";
  public keyWordAngular2 = "Angular 2";
  public keyWordWeather = "Weather";
  public numberLines = 10;

  /**
   * Füllt und sortiert die entsprechenden Datenstrukturen mit den Suchergebnissen
   * durch Anmeldung an "this.searchService.search()".
   */
  ngOnInit() {
    // Füllen und Sortieren von "this.itemsTypeScript"
    this.subscriptionTypeScript = this.searchService
      .search(SearchService.apiUrl, this.keyWordTypeScript)
      .subscribe((data) => {
        this.itemsTypeScript = data;
        this.sortArrayItemsByPropertyName(
          this.itemsTypeScript.items,
          "creation_date"
        );
      });

    // Füllen und Sortieren von "this.itemsAngular2"
    this.subscriptionAngular2 = this.searchService
      .search(SearchService.apiUrl, this.keyWordAngular2)
      .subscribe((data) => {
        this.itemsAngular2 = data;
        this.sortArrayItemsByPropertyName(
          this.itemsAngular2.items,
          "creation_date"
        );
      });

    // Füllen und Sortieren von "this.itemsWeather"
    this.subscriptionWeather = this.searchService
      .search(SearchService.apiUrl, this.keyWordWeather)
      .subscribe((data) => {
        this.itemsWeather = data;
        this.sortArrayItemsByPropertyName(
          this.itemsWeather.items,
          "creation_date"
        );
      });

    // Speichern von "weatherdata" in "this.localWeatherData",
    // da sonst die lokalen Wetterdaten nicht genutzt werden können
    this.localWeatherData = weatherdata;
  }

  /**
   * Sortiert ein Array absteigend nach "propertyName".
   *
   * @param arr zu sortierendes Array
   *
   * @returns Liefert -1, 0 oder 1 je nach Überprüfung der Array-Elemente.
   */
  sortArrayItemsByPropertyName(arr: Array<any>, propertyName: string) {
    if (arr != undefined && arr != null && arr.length > 0) {
      arr.sort((i1, i2) => {
        if (i1[propertyName] && i2[propertyName]) {
          if (i1[propertyName] > i2[propertyName]) {
            return -1;
          }

          if (i1[propertyName] < i2[propertyName]) {
            return 1;
          }
        }

        return 0;
      });
    }

    return 0;
  }

  /**
   * Dient zum Erzeugen eines Arrays mit lokalen und Remote-Wetterdaten.
   */
  ngAfterContentChecked(): void {
    this.initializeArraysAndCreateResultArray();
  }

  /**
   * Erzeugt jeweils ein Array mit lokalen und Remote-Wetterdaten und erzeugt daraus ein Ergebnisarray
   * durch Verschmelzen dieser beiden Arrays.
   */
  public initializeArraysAndCreateResultArray() {
    // Füllen von "this.localWeatherDataArray" mit den lokalen Wetterdaten
    this.fillShortenedArray(this.localWeatherData, this.localWeatherDataArray);

    // Füllen von "this.remoteWeatherDataArray" mit den Remote-Wetterdaten
    if (this.itemsWeather != undefined) {
      this.fillShortenedArray(
        this.itemsWeather.items,
        this.remoteWeatherDataArray
      );
    }

    // Verschmelzen von "this.localWeatherDataArray" und "this.remoteWeatherDataArray"
    // zu einem "alternierenden" Array
    this.resultWeatherDataArray = this.createResultArray(
      this.localWeatherDataArray,
      this.remoteWeatherDataArray
    );
  }

  /**
   * Füllt "arrTarget" mit den Einträgen von "arrOrig" bis zu einer Größe von "this.numberLines".
   *
   * @param arrOrig ursprüngliches Array
   *
   * @param arrTarget verkürztes Ergebnisarray
   */
  fillShortenedArray(arrOrig: Array<any>, arrTarget: Array<any>) {
    let counter: number = 1;

    if (
      arrOrig != undefined &&
      arrOrig != null &&
      arrOrig.length > 0 &&
      arrTarget != undefined &&
      arrTarget != null
    ) {
      arrTarget.length = 0;

      for (let item of arrOrig) {
        if (counter <= this.numberLines) {
          arrTarget.push(item);
        }

        counter++;
      }
    }
  }

  /**
   * Verschmilzt zwei Arrays zu einem Array, das die Einträge der ursprünglichen Arrays im Wechsel beinhaltet.
   *
   * @param arr1 erstes Ursprungsarray
   *
   * @param arr2 zweites Ursprungsarray
   *
   * @returns verschmolzenes Ergebnisarray
   */
  createResultArray(arr1: Array<any>, arr2: Array<any>) {
    let resultArray = [];

    if (
      arr1 != undefined &&
      arr1 != null &&
      arr1.length > 0 &&
      arr2 != undefined &&
      arr2 != null &&
      arr2.length > 0
    ) {
      if (arr1.length === arr2.length) {
        let mergedArray = arr1.map((element, index) => [element, arr2[index]]);

        for (let item of mergedArray) {
          resultArray.push(item[0]);
          resultArray.push(item[1]);
        }
      }
    }

    return resultArray;
  }

  /**
   * Gibt die gebundenen Ressourcen durch Abmelden wieder frei.
   */
  ngOnDestroy() {
    this.subscriptionTypeScript.unsubscribe();
    this.subscriptionAngular2.unsubscribe();
    this.subscriptionWeather.unsubscribe();
  }
}
