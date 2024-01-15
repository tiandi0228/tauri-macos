import { Location, RouteObject } from 'react-router-dom';

export type RouteComponent = React.FC<BrowserRouterProps> | (() => any);

export interface IRouter {
    path: string;
    redirect?: string;
    component?: RouteComponent;
    children?: IRouter[];
  }