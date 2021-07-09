import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-stackoverflow",
  templateUrl: "./stackoverflow.component.html",
  styleUrls: ["./stackoverflow.component.scss"],
})
export class StackoverflowComponent implements OnInit {
  constructor() { }

  /**
   * Propertys zur Kommunikation mit der übergeordneten DashboardComponent:
   */
  // Begriff, nach dem gesucht wird
  @Input() keyWordStackoverflowOrWeatherData: string;

  // Anzahl der Zeilen, die pro Request angezeigt werden sollen
  @Input() numberLines: number;

  // Daten, die als Ergebnis des Requests geliefert werden
  @Input() itemsStackoverflowOrWeatherData;

  ngOnInit() { }

  ngOnDestroy() { }
}
