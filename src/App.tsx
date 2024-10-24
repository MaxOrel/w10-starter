import { useEffect, useState } from "react";
import { DayTaskList } from "./components/DayTaskList";
import { Calendar } from "./components/calendar";
import { generateFakeData, TaskList } from "./lib/API";
import { formatDate } from "./lib/utils";
import "./styles.scss";
import { CalendarCell } from "./lib/CalendarBuilder";

export default function App() {
  const [taskList, setTaskList] = useState<TaskList>({});

  useEffect(() => {
    generateFakeData()
      .then((result) => {
        setTaskList(result);
      })
      .catch((err) => {
        console.error(`Can not load tasks:`, err);
      });
  }, []);

  return (
    <div className="App">
      <Calendar>
        {({ value, date }: CalendarCell) => {
          return (
            <>
              <span>{value}</span>
              <DayTaskList items={taskList[formatDate(date!)] || []} />
            </>
          );
        }}
      </Calendar>
    </div>
  );
}
