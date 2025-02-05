import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "dateConverter",
})
export class DateConverterPipe implements PipeTransform {
  transform(date: any, format: String = "d/m/Y"): any {
    if (date == null || date == undefined || date == "") return "";
    const givenDate: Date = new Date(date);
    const formatArray: any[] = format.split("");
    let ignoreItems: any[] = ["-", "/", " ", ":"];

    const convertedDate: any[] = formatArray.map((item: string) => {
      if (ignoreItems.find((i) => i == item)) {
        return item;
      } else {
        return this.convertDateParts(givenDate, item);
      }
    });

    return convertedDate.join("");
  }

  convertDateParts(date: Date, letter: String) {
    let convertDate: Date = new Date(date);
    switch (letter) {
      case "d":
        return convertDate.getDate().toString().padStart(2, "0");
      case "m":
        return (convertDate.getMonth() + 1).toString().padStart(2, "0");
      case "Y":
        return convertDate.getFullYear();
      case "y":
        return convertDate.toLocaleDateString(undefined, { year: "2-digit" });
      case "H":
        return convertDate.getHours().toString().padStart(2, "0");
      case "h":
        let hours = convertDate.getHours() % 12;
        return hours === 0 ? "12" : hours.toString().padStart(2, "0");
      case "M":
        return convertDate.getMinutes().toString().padStart(2, "0");
      case "a":
        return convertDate.getHours() < 12 ? "AM" : "PM";
      default:
        return "";
    }
  }
}
