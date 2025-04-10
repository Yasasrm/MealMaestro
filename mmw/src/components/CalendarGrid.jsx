import React, { useState, useEffect, useContext } from "react";
import { InfoContext } from "../context/InfoContext";

const fetchDayStatus = async (year, month) => {
  return new Promise((resolve) => {
    const statuses = [];
    for (let i = 1; i <= 31; i++) {
      const status = ["yellow", "red", "green"][Math.floor(Math.random() * 4)];
      statuses.push({ day: i, status });
    }
    console.log(statuses);
    resolve(statuses);
  });
};

const CalendarGrid = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [dayStatus, setDayStatus] = useState([]);

  const generateMonthGrid = (year, month) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const totalDays = lastDayOfMonth.getDate();
    const firstDay = firstDayOfMonth.getDay();

    let days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= totalDays; i++) {
      days.push(i);
    }

    while (days.length % 7 !== 0) {
      days.push(null);
    }

    return days;
  };

  useEffect(() => {
    const grid = generateMonthGrid(selectedYear, selectedMonth);
    setDaysInMonth(grid);
    
    fetchDayStatus(selectedYear, selectedMonth).then((statusData) => {
      setDayStatus(statusData);
    });
  }, [selectedYear, selectedMonth]);

  const handleYearChange = (e) => {
    setSelectedYear(Number(e.target.value));
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(Number(e.target.value));
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const { setShow, setInfoTopic, setInfoMessage } = useContext(InfoContext);
  const handleShow = (t, m) => {
    setInfoTopic(t);
    setInfoMessage(m);
    setShow(true);
  };
  const handleClose = () => {
    setInfoTopic("");
    setInfoMessage("");
    setShow(false);
  };

  const handleDayClick = (day) => {
    if (day) {
      const clickedDate = new Date(selectedYear, selectedMonth, day);
      const status = getDayStatus(day);
      status?handleShow("Not null", `You clicked on ${clickedDate.toDateString()}`):handleShow("null", `You clicked on ${clickedDate.toDateString()}`);
    }
  };
  const getDayStatus = (day) => {
    const status = dayStatus.find((status) => status.day === day);
    return status ? status.status : null;
  };

  return (
    <div>
      <div>
        <select value={selectedYear} onChange={handleYearChange}>
          {Array.from({ length: 10 }, (_, index) => (
            <option key={index} value={selectedYear - 5 + index}>
              {selectedYear - 5 + index}
            </option>
          ))}
        </select>

        <select value={selectedMonth} onChange={handleMonthChange}>
          {months.map((month, index) => (
            <option key={index} value={index}>
              {month}
            </option>
          ))}
        </select>
      </div>

      <div className="calendar-grid">
        {daysInMonth.map((day, index) => {
          const status = getDayStatus(day);
          return (
            <div
              key={index}
              className="calendar-day"
              onClick={() => handleDayClick(day)}
              style={{
                backgroundColor:
                  status === "yellow" ? "#fcf9bd" : status === "red" ? "#ff8084" : status === "green" ? "#a6f5ae" : "transparent",
                pointerEvents: day === null ? "none" : "auto",
              }}
            >
              {day || ""}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 5px;
          margin-top: 10px;
        }
        .calendar-day {
          padding: 10px;
          text-align: center;
          border: 1px solid #ddd;
          cursor: pointer;
        }
        .calendar-day:nth-child(7n) {
          color: red; /* Highlight Sundays */
        }
        .calendar-day:hover {
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
};

export default CalendarGrid;