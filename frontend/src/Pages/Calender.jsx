import React from "react";

const Calendar = () => {
  const today = new Date();
  const currentMonth = today.getMonth(); // 0-indexed
  const currentYear = today.getFullYear();

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendar = () => {
    const days = [];
    const totalDays = getDaysInMonth(currentYear, currentMonth);
    const startDay = new Date(currentYear, currentMonth, 1).getDay();

    // Empty slots before the 1st day of the month
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="text-center py-2"></div>);
    }

    // Actual days of the month
    for (let i = 1; i <= totalDays; i++) {
      const isToday =
        i === today.getDate() &&
        currentMonth === today.getMonth() &&
        currentYear === today.getFullYear();

      days.push(
        <div
          key={i}
          className={`text-center py-2 rounded ${
            isToday ? "bg-blue-500 text-white font-bold" : ""
          }`}
        >
          {i}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-7 ">
      <h1 className="text-2xl font-bold text-center mb-4 ">
        {monthNames[currentMonth]} {currentYear}
      </h1>
      <div className="grid grid-cols-7 font-medium mb-4 text-center">
        {daysOfWeek.map((day) => (
          <div key={day} className="py-5 ">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 ">
        {generateCalendar()}
      </div>
    </div>
  );
};

export default Calendar;
