import * as actions from "./index";
import { DashboardService } from "@services";

export function getEmployeeList() {
  return function(dispatch, getState) {
    let dashboardData = DashboardService.getEmployeeList();
    dispatch(saveEmployeeList(dashboardData));
  };
}

function saveEmployeeList(dashboardData) {
  return {
    type: actions.dashboardDataInfo,
    dashboardData: dashboardData
  };
}
