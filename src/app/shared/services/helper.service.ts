import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { FilterService } from "primeng/api";

@Injectable({
  providedIn: "root",
})
export class HelperService {
  constructor(
    private datePipe: DatePipe,
    private filterService: FilterService
  ) { }

  checkValidUrl(url: string) {
    if (
      url.match(
        "^(?:http(s)?://)?[w.-]+(?:.[w.-]+)+:([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|[1-6][0-5][0-5][0-3][0-5])$"
      )
    ) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * PrimeNg Filter Service
   * @param searchList - Array you need to search
   * @param searchProperties - Properties of array should search
   * @param searchValue - value of search
   * @param mode - Methord of search
   * @returns Filterd array
   */
  filter(
    searchList: Array<any>,
    searchProperties: Array<string>,
    searchValue: any,
    mode:
      | "contains"
      | "notContains"
      | "endsWith"
      | "equals"
      | "notEquals"
      | "in"
      | "between"
      | "lt"
      | "lte"
      | "gt"
      | "gte"
      | "is"
      | "isNot"
      | "before"
      | "after"
      | "dateIs"
      | "dateIsNot"
      | "dateBefore"
      | "dateAfter"
  ) {
    return this.filterService.filter(
      searchList,
      searchProperties,
      searchValue,
      mode
    );
  }

  /**
   * PrimeNg Find Item
   * @param searchList - Array you need to search
   * @param searchProperties - Properties of array should search
   * @param searchValue - value of search
   * @param mode - Methord of search
   * @returns Filterd array
   */
  find(
    searchList: Array<any>,
    searchProperties: Array<string>,
    searchValue: any,
    mode:
      | "contains"
      | "notContains"
      | "endsWith"
      | "equals"
      | "notEquals"
      | "in"
      | "between"
      | "lt"
      | "lte"
      | "gt"
      | "gte"
      | "is"
      | "isNot"
      | "before"
      | "after"
      | "dateIs"
      | "dateIsNot"
      | "dateBefore"
      | "dateAfter"
  ) {
    let list = this.filterService.filter(
      searchList,
      searchProperties,
      searchValue,
      mode
    );

    if (!this.IsNullOrUndefined(list) && list.length > 0) {
      return list[0];
    } else {
      return false;
    }
  }

  filterName(
    searchList: Array<any>,
    searchPropertyName: string,
    searchName: string,
    withLimit = false,
    startIndex = 0,
    count = 10
  ) {
    let returnList = [];
    try {
      returnList = searchList.filter((item: any) => {
        return (
          searchName == "" ||
          item[searchPropertyName]
            .toLowerCase()
            .indexOf(searchName.toLowerCase()) > -1
        );
      });

      if (withLimit) {
        return returnList.filter((item: any, i) => {
          return startIndex <= i && i < count + startIndex;
        });
      } else {
        return returnList;
      }
    } catch (ex) {
      return [];
    }
  }

  filterId(
    searchList: Array<any>,
    searchPropertyName: string,
    searchId: number,
    withLimit = false,
    startIndex = 0,
    count = 10
  ) {
    let returnList = [];
    try {
      returnList = searchList.filter((item: any) => {
        if (item[searchPropertyName] === searchId) return item;
      });

      if (withLimit) {
        return returnList.filter((item: any, i) => {
          return startIndex <= i && i < count + startIndex;
        });
      } else {
        return returnList;
      }
    } catch (ex) {
      return [];
    }
  }

  removeArrayItem<T>(array: Array<T>, item: T) {
    let index = array.indexOf(item);
    if (index > -1) {
      array.splice(index, 1);
    }
    return array;
  }

  toPascalCase(value: string) {
    return value.replace(/(\w)(\w*)/g, function (g0, g1, g2) {
      return g1.toUpperCase() + g2.toLowerCase();
    });
  }

  mapObject<T, U>(target: any, source: U): T {
    try {
      Object.assign(target, source);
    } catch (error) { }
    return target;
  }

  getMaxDate() {
    let maxDateString = "";
    try {
      let nowDate = new Date();
      let maxDate = new Date(nowDate.getFullYear() + 20, 1, 1);
      maxDateString = maxDate.toISOString().substring(0, 10);
    } catch (error) {
      maxDateString = this.getDateNow();
    }

    return maxDateString;
  }

  GetTimeString(Time: string | Date) {
    let time = "00:00";
    if (!(Time == null || Time == undefined)) {
      let DateTime = new Date(Time);
      let min = DateTime.getMinutes().toString();
      let hours = DateTime.getHours().toString();

      if (+min < 10) {
        min = "0" + min;
      }

      if (+hours < 10) {
        hours = "0" + hours;
      }

      return hours + ":" + min;
    } else {
      return time;
    }
  }

  GetDateOnly(date: Date) {
    let newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      0,
      0,
      0,
      0
    );
    return newDate;
  }

  getDateTimeString(date: Date, format?: string) {
    return this.TransformDateTime(date, format);
  }

  getDateTimeNow(format: string = "yyyy-MM-dd hh:mm a") {
    return this.TransformDateTime(new Date(), format);
  }

  getDateNow(format: string = "yyyy-MM-dd") {
    return this.TransformDateTime(new Date(), format) ?? "";
  }

  getTimeNow(format: string = "hh:mm a") {
    return this.TransformDateTime(new Date(), format) ?? "";
  }

  IsNullOrEmpty(value: string) {
    if (value == null || value == undefined || value == "") {
      return true;
    } else {
      return false;
    }
  }

  private TransformDateTime(
    date: Date | string,
    format = "yyyy-MM-dd HH:mm a"
  ) {
    return this.datePipe.transform(date, format);
  }

  IsNullOrUndefined(value: any) {
    if (value == null || value == undefined) {
      return true;
    } else {
      return false;
    }
  }

  DateDiff = {
    inSeconds: function (d1: Date, d2: Date) {
      var t2 = d2.getTime();
      var t1 = d1.getTime();

      return Math.round((t2 - t1) / 1000);
    },
    inMinutes: function (d1: Date, d2: Date) {
      var t2 = d2.getTime();
      var t1 = d1.getTime();

      return Math.round((t2 - t1) / (60 * 1000));
    },
    inHours: function (d1: Date, d2: Date) {
      var t2 = d2.getTime();
      var t1 = d1.getTime();

      return Math.round((t2 - t1) / (3600 * 1000));
    },
    inDays: function (d1: Date, d2: Date) {
      var t2 = d2.getTime();
      var t1 = d1.getTime();

      return Math.round((t2 - t1) / (24 * 3600 * 1000));
    },

    inWeeks: function (d1: Date, d2: Date) {
      var t2 = d2.getTime();
      var t1 = d1.getTime();

      return Math.round((t2 - t1) / (24 * 3600 * 1000 * 7));
    },

    inMonths: function (d1: Date, d2: Date) {
      var d1Y = d1.getFullYear();
      var d2Y = d2.getFullYear();
      var d1M = d1.getMonth();
      var d2M = d2.getMonth();

      return d2M + 12 * d2Y - (d1M + 12 * d1Y);
    },

    inYears: function (d1: Date, d2: Date) {
      return d2.getFullYear() - d1.getFullYear();
    },
  };

  getDropdownValuesFromArray(collectionArray: any[]): any[] {
    let typeArray: any[] = [];
    for (let i = 0; i < collectionArray.length; i++) {
      typeArray.push({});
      typeArray[i].label = collectionArray[i].Name;
      typeArray[i].value = collectionArray[i].Code;
    }
    return typeArray;
  }

  GetEnumName(enumArray: any, value: any, isSC = true) {
    let name = enumArray[value];
    if (isSC) {
      const text = name;
      const result = text.replace(/([A-Z])/g, " $1");
      name = result.charAt(0).toUpperCase() + result.slice(1);
    }
    return name;
  }

  compareObjects(obj1: any, obj2: any) {
    let equal = true;
    for (let key in obj1) {
      if (obj1[key] !== obj2[key]) {
        equal = false;
        break;
      }
    }
    return equal;
  }
}
