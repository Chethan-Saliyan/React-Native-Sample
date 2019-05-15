import * as actions from "../actions";

export function dashboardReducer(state = {}, action) {
  switch (action.type) {
    case actions.dashboardDataInfo: {
      return { ...state, dashboardData: action.dashboardData };
    }
    default:
      return state;
  }
}
