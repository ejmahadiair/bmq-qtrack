/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  Button,
  Input,
  Modal,
  Switch,
  Table,
  DatePicker,
  Select,
  Slider,
  Space,
  Tag,
  Form,
  Popconfirm,
  Tooltip,
} from "antd";
import * as XLSX from "xlsx";
import React, { useEffect, useState, useRef } from "react";
import moment from "moment";

const { RangePicker } = DatePicker;
const { Option } = Select;

const TrackTable = () => {
  const [comment, setComment] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState("");
  const commentBoxRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    fetch("/assets/file/bmw.xlsm")
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => {
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
        const formatted: any = jsonData.map((row: any, index: number) => {
          const newRow: any = {};
          for (const key in row) {
            newRow[key.split(" ").join("_")] = row[key];
          }
          return {
            key: index,
            isFlaged: false,
            comments: [],
            ...newRow,
          };
        });
        setData(formatted);
        setFilteredData(formatted);
        setLoading(false)
      });
      return ()=>{
        setLoading(false)
      }
  }, []);

  const applyFilters = (values: any) => {
    const { DateRange, Car_Model, Severity_Rating } = values;
    let tempData = [...data];

    if (Car_Model) {
      tempData = tempData.filter((item: any) => item.Car_Model === Car_Model);
    }
    if (Severity_Rating) {
      tempData = tempData.filter(
        (item: any) =>
          item.Severity_Rating >= Severity_Rating[0] &&
          item.Severity_Rating <= Severity_Rating[1]
      );
    }
    if (DateRange) {
      const [start, end] = DateRange;
      tempData = tempData.filter((item: any) => {
        const date = moment(item.Date, "DD.MM.YY").startOf("day");
        return date.isBetween(start, end, "day", "[]");
      });
    }

    setFilteredData(tempData);
    setIsModalOpen(false);
  };

  const handleFlagToggle = (record: any) => {
    const updated: any = data.map((item: any) =>
      item.key === record.key ? { ...item, isFlaged: !item.isFlaged } : item
    );
    setData(updated);
    setFilteredData(updated);
  };

  const handleAddComment = (record: any) => {
    if (!comment.trim()) return;
    const updated: any = data.map((item: any) =>
      item.key === record.key
        ? {
            ...item,
            comments: [...item.comments, comment],
          }
        : item
    );
    setData(updated);
    setFilteredData(updated);
    setComment("");
  };

  const columns: any = [
    {
      title: "SL",
      render: (_: any, __: any, idx: number) => <span>{idx + 1}</span>,
      width: 50,
    },
    {
      title: "Date",
      dataIndex: "Date",
      render: (date: any) => moment(date, "DD.MM.YY").format("ll"),
    },
    {
      title: "Defect Name",
      dataIndex: "Defect_Name",
      render: (text: any) => <Tag color="volcano">{text}</Tag>,
      fixed: "left",
    },
    {
      title: "Station",
      dataIndex: "Station",
    },
    {
      title: "Part of the Car",
      dataIndex: "Part_of_the_Car",
    },
    {
      title: "Part Number",
      dataIndex: "Part_Number",
    },
    {
      title: "Severity",
      dataIndex: "Severity_Rating",
      render: (sev: any) => (
        <Tag color={sev > 7 ? "red" : sev > 4 ? "orange" : "blue"}>{sev}</Tag>
      ),
    },
    {
      title: "Car Model",
      dataIndex: "Car_Model",
    },
    {
      title: "Motor Type",
      dataIndex: "Motor_Type",
    },
    {
      title: "Design Package",
      dataIndex: "Design_Package",
    },
    {
      title: "Production Shift",
      dataIndex: "Production_Shift",
    },
    {
      title: "Resolution Time (hrs)",
      dataIndex: "Resolution_Time_(in_hours)",
    },
    {
      title: "Root Cause Identified",
      dataIndex: "Root_Cause_Identified",
    },
    {
      title: "Flag",
      fixed: "right",
      render: (_: any, record: any) => (
        <Space>
          <Switch
            checked={record?.isFlaged}
            onChange={() => handleFlagToggle(record)}
          />
          {record?.isFlaged && (
            <Popconfirm
              title={
                <div className="w-[300px] h-[250px] rounded-lg bg-gray-50 p-2 flex flex-col">
                  <div
                    ref={commentBoxRef}
                    className="flex-1 overflow-y-auto mb-2 p-1 border border-gray-200 rounded"
                  >
                    {(record.comments || []).map((cmt: any, i: number) => (
                      <div
                        key={i}
                        className={`p-2 rounded mb-1 ${
                          i % 2 === 0
                            ? "bg-blue-100 text-black"
                            : "bg-white text-black"
                        }`}
                      >
                        {cmt}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      onPressEnter={() => handleAddComment(record)}
                      placeholder="Add comment"
                    />
                    <Button
                      onClick={() => handleAddComment(record)}
                      type="primary"
                    >
                      Add
                    </Button>
                  </div>
                </div>
              }
              okButtonProps={{ hidden: true }}
              cancelButtonProps={{ hidden: true }}
              icon={false}
            >
              <Button size="small">Comments</Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4 bg-white rounded-2xl">
      <Space className="mb-4 ml-auto float-end" wrap>
        <Input.Search
          placeholder="Search by issue name"
          allowClear
          onChange={(e) => {
            const keyword = e.target.value.toLowerCase();
            setSearchTerm(keyword);
            const filtered = data.filter((item: any) =>
              item?.Defect_Name?.toLowerCase().includes(keyword)
            );
            setFilteredData(filtered);
          }}
          style={{ width: 250 }}
        />
        <Button
          onClick={() => setIsModalOpen(true)}
          type="primary"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>
          }
        ></Button>
      </Space>

      <Table
      loading={loading}
        dataSource={filteredData}
        columns={columns}
        scroll={{ x: 2000 }}
        bordered
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title="Advanced Filters"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={applyFilters}
          initialValues={{ Severity_Rating: [1, 10] }}
        >
          <Form.Item label="Date Range" name="DateRange">
            <RangePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Car Model" name="Car_Model">
            <Select placeholder="Select model" allowClear>
              {[...new Set(data.map((d: any) => d?.Car_Model))].map((model) => (
                <Option key={model}>{model}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Severity Rating" name="Severity_Rating">
            <Slider range max={10} step={1} defaultValue={[1, 10]} />
          </Form.Item>

          <div className="flex justify-end gap-2">
            <Button onClick={() => setIsModalOpen(false)}>Close</Button>
            <Button type="primary" htmlType="submit">
              Apply
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default TrackTable;
