import clsx from "clsx";
import { CSSProperties, ReactNode } from "react";
import { axis2D, fillArray } from "../../lib/utils";

export interface GridCSS extends CSSProperties {
  "--w": number;
  "--h": number;
}

type CellCallbackProps = {};

type GridProps = {
  children: (params: CellCallbackProps) => ReactNode;
};

export const Grid = ({ children }: GridProps) => {
  return children();
};
