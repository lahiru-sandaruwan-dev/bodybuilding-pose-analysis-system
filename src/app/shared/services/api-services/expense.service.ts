import { Injectable } from "@angular/core";
import { ResourceService } from "../resource.service";
import { DataAccessService } from "../data-access.service";

@Injectable({
  providedIn: "root",
})
export class ExpenseService {
  constructor(
    private dataAccess: DataAccessService,
    private resource: ResourceService
  ) {}

  // save: '/:tripId',
  SaveExpense(body: any, tripId: string) {
    return this.dataAccess
      .POST(this.resource.expense.saveExpense + `/${tripId}`, body)
      .pipe((response) => {
        return response;
      });
  }

  // update: '/:tripId/:expenseId',
  UpdateExpense(body: any, tripId: string, expenseId: string) {
    return this.dataAccess
      .PUT(
        this.resource.expense.updateExpense + `/${tripId}/${expenseId}`,
        body
      )
      .pipe((response) => {
        return response;
      });
  }

  // deleteById: '/:tripId/:expenseId',
  DeleteExpense(tripId: string, expenseId: string) {
    return this.dataAccess
      .DELETE(
        this.resource.expense.deleteExpense + `/${tripId}/${expenseId}`,
        null
      )
      .pipe((response) => {
        return response;
      });
  }

  // getAllExpensesByTrip: '/:tripId',
  GetAllExpensesByTrip(tripId: string) {
    return this.dataAccess
      .GET(this.resource.expense.getAllExpensesByTrip + `/${tripId}`)
      .pipe((response) => {
        return response;
      });
  }

  // getExpenseById: '/:tripId',
  GetExpenseById(tripId: string, expenseId: string) {
    return this.dataAccess
      .GET(this.resource.expense.getExpenseById + `/${tripId}/${expenseId}`)
      .pipe((response) => {
        return response;
      });
  }

  // /:tripId/:expenseId
  GetExpenseByTripIdAndExpenseId(tripId: string, expenseId: string) {
    return this.dataAccess
      .GET(this.resource.expense.getExpensesById + `/${tripId}/${expenseId}`)
      .pipe((response) => {
        return response;
      });
  }

  // /saveSalary/:tripId
  SaveDriverSalary(body: any, tripId: string) {
    return this.dataAccess
      .POST(this.resource.expense.saveDriverSalary + `/${tripId}`, body)
      .pipe((response) => {
        return response;
      });
  }
}
