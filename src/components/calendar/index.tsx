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
  const instance = useRef<MonthCalendar>(new MonthCalendar());

  const rebuildCalendar = () => {
    const builder = new CalendarBuilder(instance.current);
    return builder.getMonthTable();
  };

  const [calendar, setCurrent] = useState<CalendarMonthTable>(rebuildCalendar);

  const nextMonth = () => {
    instance.current.next();
    setCurrent(rebuildCalendar());
  };

  const prevMonth = () => {
    instance.current.prev();
    setCurrent(rebuildCalendar());
  };

  const isHeader = (x: number, y: number) => x === 0 || y === 0;

  const cells: string[] = fillArray(calendar.width * calendar.height, "");

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
      <div className="layers">
        <form
          className={clsx("layer", "base")}
          style={
            {
              "--w": calendar.width,
              "--h": calendar.height,
            } as GridCSS
          }
        >
          {cells.map((_, index) => {
            const [x, y] = axis2D(index, calendar.width);
            return (
              <button
                key={pointToString(x, y)}
                className={clsx(
                  "cell",
                  "day",
                  calendar.table[index].className,
                  {
                    header: isHeader(x, y),
                  }
                )}
                data-x={x}
                data-y={y}
              >
                {children && !isHeader(x, y)
                  ? children(calendar.table[index])
                  : calendar.table[index].value}
              </button>
            );
          })}
        </form>
      </div>
    </section>
  );
}
