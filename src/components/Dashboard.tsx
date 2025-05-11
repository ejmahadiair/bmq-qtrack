"use client";

import { useState } from "react";
import { Card, Calendar, Dropdown, Button, theme } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  type ChartData,
} from "chart.js";
import moment from "moment";
import type { Moment } from "moment";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function SchoolDashboard() {
  const { token } = theme.useToken();
  const [selectedDate, setSelectedDate] = useState<Moment>(moment());

  // Attendance chart data
  const attendanceData: ChartData<"bar"> = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "High",
        data: [3000, 4000, 2500, 2000, 2500, 3500, 4000],
        backgroundColor: "#7BF1A8",
        borderRadius: 4,
      },
      {
        label: "Low",
        data: [1500, 2000, 1500, 4000, 1000, 2000, 1000],
        backgroundColor: "#A5D8FF",
        borderRadius: 4,
      },
    ],
  };

  // Finance chart data
  const financeData: ChartData<"line"> = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Issues",
        data: [
          4000, 2000, 4000, 5000, 4000, 4000, 4000, 4000, 4000, 4000, 4000,
          4000,
        ],
        borderColor: "#B8B5FF",
        backgroundColor: "#B8B5FF",
        tension: 0.4,
      },
      {
        label: "Expense",
        data: [
          3000, 2000, 2500, 2000, 3000, 3500, 3500, 3500, 3500, 3500, 3500,
          3500,
        ],
        borderColor: "#A5D8FF",
        backgroundColor: "#A5D8FF",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "#f0f0f0",
          borderDash: [5, 5],
        },
        ticks: {
          stepSize: 2500,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const events = [
    {
      title: "lorem ipsum dolor sit amet",
      time: "12:00 PM - 2:00 PM",
      description: "lorem ipsum dolor sit amet in id dolor sit amet",
      color: "bg-blue-50 border-blue-100",
    },
    {
      title: "lorem ipsum dolor sit amet",
      time: "12:00 PM - 2:00 PM",
      description: "lorem ipsum dolor sit amet in id dolor sit amet",
      color: "bg-purple-50 border-purple-100",
    },
    {
      title: "lorem ipsum dolor sit amet",
      time: "12:00 PM - 2:00 PM",
      description: "lorem ipsum dolor sit amet in id dolor sit amet",
      color: "bg-blue-50 border-blue-100",
    },
  ];

  const announcements = [
    {
      title: "Lorem ipsum dolor sit amet consectetur.",
      date: "2025-01-01",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia saepe nulla dolor repellat, dolores dignissimos ex labore ab illum ipsa veritatis rem magnam unde error!",
      color: "bg-white",
    },
    {
      title: "Lorem ipsum dolor sit amet consectetur.",
      date: "2025-01-01",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia saepe nulla dolor repellat, dolores dignissimos ex labore ab illum ipsa veritatis rem magnam unde error!",
      color: "bg-purple-50",
    },
    {
      title: "Lorem ipsum dolor sit amet consectetur.",
      date: "2025-01-01",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia saepe nulla dolor repellat, dolores dignissimos ex labore ab illum ipsa veritatis rem magnam unde error!",
      color: "bg-yellow-50",
    },
  ];

  const moreMenu = (
    <Dropdown
      menu={{
        items: [
          { key: "1", label: "View Details" },
          { key: "2", label: "Edit" },
        ],
      }}
      trigger={["click"]}
    >
      <Button type="text" icon={<MoreOutlined />} className="text-gray-400" />
    </Dropdown>
  );

  // Calendar panel change handler
  const onPanelChange = (value: any, mode: any) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  // Calendar wrapper style
  const calendarWrapperStyle = {
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-purple-100 border-none shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs text-gray-500">2024/25</div>
              <div className="text-3xl font-bold mt-2">900</div>
              <div className="text-gray-600 mt-1">Total Issues</div>
            </div>
            {moreMenu}
          </div>
        </Card>

        <Card className="!bg-blue-200 border-none shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs text-gray-500">2024/25</div>
              <div className="text-3xl font-bold mt-2">198</div>
              <div className="text-gray-600 mt-1">Flaged</div>
            </div>
            {moreMenu}
          </div>
        </Card>

        <Card className="bg-purple-100 border-none shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs text-gray-500">2024/25</div>
              <div className="text-3xl font-bold mt-2">666</div>
              <div className="text-gray-600 mt-1">Under Review</div>
            </div>
            {moreMenu}
          </div>
        </Card>

        <Card className="!bg-blue-200 border-none shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs text-gray-500">2024/25</div>
              <div className="text-3xl font-bold mt-2">333</div>
              <div className="text-gray-600 mt-1">Delivered</div>
            </div>
            {moreMenu}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card
          title={
            <div className="flex justify-between items-center">
              <span className="font-semibold">Motor Type</span>
              {moreMenu}
            </div>
          }
          className="shadow-sm col-span-1"
          bodyStyle={{ padding: "20px" }}
        >
          <div className="flex flex-col items-center">
            <div className="relative w-40 h-40 mb-6">
              <div className="absolute inset-0 rounded-full border-8 border-gray-100"></div>
              <div
                className="absolute inset-0 rounded-full border-8 border-transparent border-t-green-200 border-l-yellow-200"
                style={{ clipPath: "polygon(0 0, 50% 0, 50% 50%, 0 50%)" }}
              ></div>
              <div
                className="absolute inset-0 rounded-full border-8 border-transparent border-t-blue-200 border-r-blue-200"
                style={{
                  clipPath: "polygon(50% 0, 100% 0, 100% 50%, 50% 50%)",
                }}
              ></div>
              <div
                className="absolute inset-0 rounded-full border-8 border-transparent border-t-yellow-200 border-r-blue-200"
                style={{
                  clipPath: "polygon(50% 0, 100% 0, 100% 50%, 50% 50%)",
                }}
              ></div>
              <div className="absolute inset-0 flex justify-center items-center">
                <div className="bg-white rounded-full p-4 shadow-sm">
                  <div className="flex">
                    <div className="!text-blue-300 mr-2"></div>
                    <div className="!text-green-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="!text-yellow-300"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-16 w-full">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-blue-200 mb-2"></div>
                <div className="text-xl font-bold">1,234</div>
                <div className="text-gray-500 text-sm">Standerd (25%)</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-green-200 mb-2"></div>
                <div className="text-xl font-bold">1,234</div>
                <div className="text-gray-500 text-sm">Long Range (13%)</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-yellow-200 mb-2"></div>
                <div className="text-xl font-bold">1,234</div>
                <div className="text-gray-500 text-sm">
                  High Parformance (19%)
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card
          title={
            <div className="flex justify-between items-center">
              <span className="font-semibold">Case type</span>
              {moreMenu}
            </div>
          }
          className="shadow-sm col-span-2"
          bodyStyle={{ padding: "20px" }}
        >
          <div className="mb-4 flex items-center">
            <div className="flex items-center mr-4">
              <div className="w-3 h-3 rounded-full bg-green-300 mr-2"></div>
              <span className="text-sm text-gray-500">High</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-200 mr-2"></div>
              <span className="text-sm text-gray-500">Low</span>
            </div>
          </div>
          <div className="h-64">
            <Bar data={attendanceData} options={chartOptions} />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card
          title={
            <div className="flex justify-between items-center">
              <span className="font-semibold">Finance</span>
              {moreMenu}
            </div>
          }
          className="shadow-sm col-span-2"
          bodyStyle={{ padding: "20px" }}
        >
          <div className="mb-4 flex items-center">
            <div className="flex items-center mr-4">
              <div className="w-3 h-3 rounded-full bg-indigo-200 mr-2"></div>
              <span className="text-sm text-gray-500">Issues</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-200 mr-2"></div>
              <span className="text-sm text-gray-500">Expense</span>
            </div>
          </div>
          <div className="h-64">
            <Line data={financeData} options={chartOptions} />
          </div>
        </Card>

        <Card
          title={
            <div className="flex justify-between items-center">
              <span className="font-semibold">Calendar</span>
              {moreMenu}
            </div>
          }
          className="shadow-sm col-span-1"
          bodyStyle={{ padding: "12px" }}
        >
          <div style={calendarWrapperStyle}>
            <Calendar fullscreen={false} onPanelChange={onPanelChange} />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2">
          <Card
            title={
              <div className="flex justify-between items-center">
                <span className="font-semibold">Events</span>
                {moreMenu}
              </div>
            }
            className="shadow-sm mb-6"
            bodyStyle={{ padding: "0" }}
          >
            <div className="divide-y">
              {events.map((event, index) => (
                <div key={index} className={`p-4 ${event.color}`}>
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{event.title}</h3>
                    <span className="text-xs text-gray-500">{event.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {event.description}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="col-span-1">
          <Card
            title={
              <div className="flex justify-between items-center">
                <span className="font-semibold">Announcements</span>
                <span className="text-xs text-blue-500">View All</span>
              </div>
            }
            className="shadow-sm"
            bodyStyle={{ padding: "0" }}
          >
            <div className="divide-y">
              {announcements.map((announcement, index) => (
                <div key={index} className={`p-4 ${announcement.color}`}>
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{announcement.title}</h3>
                    <span className="text-xs text-gray-500">2025-01-01</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-3">
                    {announcement.description}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
