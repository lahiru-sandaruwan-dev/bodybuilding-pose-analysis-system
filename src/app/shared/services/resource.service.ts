import { Injectable } from "@angular/core";
import { get } from "jquery";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ResourceService {
  constructor() { }

  private host: string = environment.apiURL;

  private Auth = this.host + "/auth";
  private Store = this.host + "/store";
  private User = this.host + "/user";
  private Leave = this.host + "/leave";
  private MonthAudit = this.host + "/monthAudit";
  private Common = this.host + "/common";
  private Vehicle = this.host + "/vehicle";
  private Trip = this.host + "/trip";
  private Expenses = this.host + "/expense";
  private Report = this.host + "/report";

  auth = {
    login: this.Auth + "/login",
    resetPassword: this.Auth + "/resetPassword",
    changePassword: this.Auth + "/changePassword",
    refreshAuth: this.Auth + "/refreshAuth",
  };

  store = {
    uploadFile: this.Store + "/upload",
    uploadMultipleFiles: this.Store + "/uploadMultiple",
  };

  user = {
    validateUser: this.User + "/validateUser",
    saveUser: this.User,
    getAllUsers: this.User,
    getUserById: this.User,
    blockUser: this.User + "/block",
    unblockUser: this.User + "/unblock",
    updateUser: this.User,
    deleteUser: this.User,
    getUsersByRole: this.User + "/userByRole",
  };

  leave = {
    saveLeave: this.Leave + "/apply",
    getAllLeaves: this.Leave,
    getLeaveById: this.Leave,
    approveLeave: this.Leave + "/approve",
    rejectLeave: this.Leave + "/reject",
    cancel: this.Leave + "/cancel",
    getLeaveCount: this.Leave + "/leaveCount",
    updateLeave: this.Leave + "/update",
    getEligibleLeaveForAdmin: this.Leave + "/eligibleLeaves",
  };

  monthAudit = {
    getPendingLeaves: this.MonthAudit + "/pendingLeaves",
    createNewMonth: this.MonthAudit + "/createNewMonth",
    getWorkingInfo: this.MonthAudit + "/workingInfo",
    getPendingTrips: this.MonthAudit + "/pendingTrip",
  };

  wegaShine = {
    session: "/session",
    devices: "/devices",
  };

  common = {
    getDataByType: this.Common + "/data",
    getGenders: this.Common + "/gender",
  };

  vehicle = {
    saveVehicle: this.Vehicle,
    getAllVehicles: this.Vehicle,
    getVehicleById: this.Vehicle,
    updateVehicle: this.Vehicle,
    deleteVehicleById: this.Vehicle,
    activeInactiveVehicles: this.Vehicle + "/activeInactive",
    getAllVehiclesByCount: this.Vehicle + "/passengerCount",
  };

  trip = {
    saveTrip: this.Trip,
    getAllTrips: this.Trip,
    getTripById: this.Trip,
    updateTrip: this.Trip,
    cancelTrip: this.Trip,
    assignDriver: this.Trip + "/assignDriver",
    updateTripStatus: this.Trip,
    getTripForPrint: this.Trip + "/tripForPrint",

    // checkList routes
    saveCheckList: this.Trip + "/checkList",
    getCheckList: this.Trip + "/checkList",

    // trip places
    getPlacesByTripId: this.Trip + "/places",
    updatePlaceAsMarked: this.Trip,
  };

  expense = {
    saveExpense: this.Expenses,
    updateExpense: this.Expenses,
    deleteExpense: this.Expenses,
    getAllExpensesByTrip: this.Expenses,
    getExpenseById: this.Expenses,
    getExpensesById: this.Expenses,
    saveDriverSalary: this.Expenses + "/saveSalary",
  };

  report = {
    monthlyTripReport: this.Report + '/monthlyTripReport',
    monthlyExpensesReport: this.Report + '/monthlyExpensesReport',
    monthlyDriverSalary: this.Report + '/monthlyDriverSalary',
    monthlyIncomeReport: this.Report + '/monthlyIncomeReport',
  }
}
