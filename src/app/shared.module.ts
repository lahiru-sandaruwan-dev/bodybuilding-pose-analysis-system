// shared.module.ts

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CurrencyConverterPipe } from "./shared/pipes/currency-converter.pipe";
import { TruncatePipe } from "./shared/pipes/truncate.pipe";
import { DateConverterPipe } from "./shared/pipes/date-converter.pipe";

@NgModule({
  declarations: [CurrencyConverterPipe, TruncatePipe, DateConverterPipe],
  imports: [CommonModule],
  exports: [CurrencyConverterPipe, TruncatePipe, DateConverterPipe],
})
export class SharedModule {}
