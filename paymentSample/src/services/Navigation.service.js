import { NavigationActions, StackActions } from "react-navigation";

let _container;

export class NavigationService {
  static reset(routeName, params, key = null) {
    _container.dispatch(
      StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            type: "Navigation/NAVIGATE",
            routeName,
            params
          })
        ],
        key
      })
    );
  }

  static setContainer(container) {
    _container = container;
  }
}
