import { createBrowserHistory } from "history";
import React from "react";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import { DemoRules } from "./page/DemoRules/index";
import { DemoStatement } from "./page/DemoStatement";
import { DemoUseCallback } from "./page/DemoUseCallback/index";
import { DemoUseContext } from "./page/DemoUseContext";
import { DemoUseEffect } from "./page/DemoUseEffect/index";
import { DemoUseFetchData } from "./page/DemoUseFetchData/index";
import { DemoUseState } from "./page/DemoUseState/index";
import { DemoCustomModal } from "./page/DemoCustomModal/index";
export interface RouteType {
  routerPath: string;
  component: React.ComponentType;
}

const routes: RouteType[] = [
  {
    routerPath: "useState",
    component: DemoUseState
  },
  {
    routerPath: "useEffect",
    component: DemoUseEffect
    // component: UseEffectClassDemo
  },
  {
    routerPath: "useCallback",
    component: DemoUseCallback
  },
  {
    routerPath: "useContext",
    component: DemoUseContext
  },
  {
    routerPath: "useFetchData",
    component: DemoUseFetchData
  },
  { routerPath: "rules", component: DemoRules },
  { routerPath: "statement", component: DemoStatement },
  { routerPath: "customModal", component: DemoCustomModal }
];

export const history = createBrowserHistory();

export const AppRouter = () => {
  return (
    <Router history={history}>
      <div>
        <Switch>
          {routes.map((route: RouteType, index: number) => {
            return (
              <Route
                exact={true}
                path={`/${route.routerPath}`}
                key={index}
                component={route.component}
              />
            );
          })}
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};
