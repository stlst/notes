import React from "react";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { DemoUseState } from "./page/DemoUseState/index";
import { DemoUseEffect } from "./page/DemoUseEffect/index";
import { DemoUseCallback } from "./page/DemoUseCallback/index";
import { DemoUseContext } from "./page/DemoUseContext";
import UseEffectClassDemo from "./page/DemoUseEffect/UseEffectClassDemo";
import { DemoUseFetchData } from "./page/DemoUseFetchData/index";
import { DemoRules } from "./page/DemoRules/index";
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
  { routerPath: "rules", component: DemoRules }
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
