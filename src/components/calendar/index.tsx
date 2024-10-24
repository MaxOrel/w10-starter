import React, { useState, useRef, CSSProperties } from "react";
import clsx from "clsx";
import { axis2D, fillArray, index, pointToString } from "../../lib/utils";
import { Button } from "../../ui/Button";
import { MonthCalendar } from "../../lib/Calendar";
import { useCalendar } from "./hooks/useCalendar";
import {
  CalendarMonthTable,
  CalendarBuilder,
  CalendarCell,
} from "../../lib/CalendarBuilder";
import { Grid, GridCSS } from "./Grid";
import { Cell } from "./Cell";

interface CalendarProps {
  children?: (props: CalendarCell) => React.ReactNode;
}

export function Calendar({ children }: CalendarProps) {
  const { calendar, prevMonth, nextMonth } = useCalendar()

  const isHeader = (x: number, y: number) => x === 0 || y === 0;

  return (
    <section className="calendar">
      <nav className="controls">
        <Button name="prev" className="yellow" onClick={prevMonth}>
          «
        </Button>
        <span className="current-date">{calendar.label}</span>
        <Button name="next" className="yellow" onClick={nextMonth}>
          »
        </Button>
      </nav>
      <Grid width={calendar.width} height={calendar.height}>
        {({ x, y, index }) => <Cell key={pointToString(x, y)} x={x} y={y} extraClass={clsx("day",
          calendar.table[index].className,
          {
            header: isHeader(x, y),
          })}>
          {children && !isHeader(x, y)
            ? children(calendar.table[index])
            : calendar.table[index].value}
        </Cell>
        }
      </Grid>
    </section >
  );
}
