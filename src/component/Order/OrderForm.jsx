import { Input, InputNumber, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";

let OrderForm = ({ openModal, setOpenModal, selectedRows}) => {


    const [data, setData] = useState(selectedRows);
    const [inputValues, setInputValues] = useState({});

    useEffect(() => {
        setData(() => {
          const updatedData = selectedRows.map((item) => ({
            ...item,
            maxCount: item.count, // Добавляем новое свойство maxCount со значением count
          }));
          return updatedData;
        });
      }, [selectedRows]);

    const handleOk = () => {
        console.log(data);
        setOpenModal(false);
    };
    const handleCancel = () => {
        setOpenModal(false);
    };

    const handleSave = (key, dataIndex, value) => {
    const newData = data.map((item) => {
      if (item.key === key) {
        return { ...item, [dataIndex]: value };
      }
      return item;
    });
    setData(newData);
    setInputValues((prevInputValues) => ({
        ...prevInputValues,
        [key]: value
      }));
  };

  const isOkButtonDisabled = Object.values(inputValues).some((value) => !value);

    const columns = [
        {
            title: 'Название',
            dataIndex: 'name',
            editable: true,
            sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
            title: 'Цена',
            dataIndex: 'cost',
            sorter: (a, b) => a.cost - b.cost
        },
        {
            title: 'Количество',
            dataIndex: 'count',
            editable: true,
            sorter: (a, b) => a.count - b.count,
            render: (text, record) => {
                const maxCount = record.maxCount || 0; 
                const initialCount = inputValues[record.key];
                return (
                  <InputNumber
                    min={1}
                    max={maxCount}
                    value={initialCount}
                    onChange={(value) => handleSave(record.key, 'count', value)}
                  />
                );
              }
        },
    ];

    // const initialData = data.map((item) => ({ ...item, count: 1 }));

    return <>
        <Modal okButtonProps={{ disabled: isOkButtonDisabled }} width={1000} style={{width:1000}} open={openModal} onOk={handleOk} onCancel={handleCancel}>
        <Table rowKey="key" columns={columns} dataSource={data}  />
        </Modal>
    </>
}

export default OrderForm;