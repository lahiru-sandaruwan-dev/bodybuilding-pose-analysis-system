import { Injectable } from "@angular/core";
import * as XLSX from "xlsx";

@Injectable({
  providedIn: "root",
})
export class ExcelService {
  constructor() {}

  // GenerateExcelFile(cols: any[], data: any[], fileName: string) {
  //   let newData = [];
  //   data.forEach((element) => {
  //     let newObj = {};
  //     cols.forEach((col) => {
  //       newObj[col.field] = element[col.field];
  //     });
  //     newData.push(newObj);
  //   });

  //   let Heading = [];
  //   cols.forEach((col) => {
  //     Heading.push(col.header);
  //   });

  //   var wscols = [];
  //   for (var i = 0; i < Heading.length; i++) {
  //     let max = Heading[i].length;
  //     newData.forEach((element) => {
  //       if (element[cols[i].field]?.toString().length > max)
  //         max = element[cols[i].field]?.length;
  //     });
  //     wscols.push({ wch: max + 1 });
  //   }

  //   const wb = XLSX.utils.book_new();
  //   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
  //   ws["!cols"] = wscols;
  //   XLSX.utils.sheet_add_aoa(ws, [Heading]);

  //   XLSX.utils.sheet_add_json(ws, newData, { origin: "A2", skipHeader: true });

  //   XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  //   let sheetName: string = fileName + " - " + new Date().toLocaleDateString();

  //   XLSX.writeFile(wb, sheetName + ".xlsx");
  // }

  GenerateExcelFileWithCustomHeader(
    cols: any[],
    data: any[],
    fileName: string
  ) {
    const newData = data.map((element) => {
      const newObj = {};
      cols.forEach((col) => {
        newObj[col.field] = element[col.field];
      });
      return newObj;
    });

    const Heading = cols.map((col) => col.header);

    const wscols = Heading.map((header, i) => {
      let max = header.length;
      newData.forEach((element) => {
        const fieldLength = (element[cols[i].field] ?? "").toString().length;
        if (fieldLength > max) max = fieldLength;
      });
      return { wch: max + 1 };
    });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([]);
    ws["!cols"] = wscols;

    XLSX.utils.sheet_add_aoa(ws, [Heading]);
    XLSX.utils.sheet_add_json(ws, newData, { origin: "A2", skipHeader: true });
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    const sheetName = `${fileName} - ${new Date()}`;
    XLSX.writeFile(wb, `${sheetName}.xlsx`);
  }

  GenerateExcelFile(data: any[], fileName: string) {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    const sheetName = `${fileName} - ${new Date()}`;
    XLSX.writeFile(wb, `${sheetName}.xlsx`);
  }
}
