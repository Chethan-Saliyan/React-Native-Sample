const dashBoardPage = require("./../assets/JSON/dashBoardPage.json");

export class DashboardService {
  static getEmployeeList() {
    return dashBoardPage;
  }
}
