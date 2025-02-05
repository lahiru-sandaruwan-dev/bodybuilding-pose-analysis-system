import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "currencyConverter",
})
export class CurrencyConverterPipe implements PipeTransform {
  transform(
    amount: number,
    conversionRate: number,
    currencyCode: string = null
  ): string {
    if (isNaN(amount) || !amount) {
      return currencyCode == null || currencyCode == undefined
        ? `0.00`
        : `${currencyCode} 0.00`;
    }

    const convertedAmount = (amount / conversionRate).toFixed(2);

    const formattedAmount = parseFloat(convertedAmount).toLocaleString(
      undefined,
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );
    return currencyCode == null || currencyCode == undefined
      ? `${formattedAmount}`
      : `${currencyCode} ${formattedAmount}`;
  }
}
