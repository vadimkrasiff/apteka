import { Input, InputNumber, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";

let OrderForm = ({ openModal, setOpenModal, selectedRows, setNull, createOrder}) => {


    const [data, setData] = useState(selectedRows);
    const [inputValues, setInputValues] = useState({});

    useEffect(() => {
      
        setData(() => {
          const updatedData = selectedRows.map((item) => ({
            ...item,
            maxCount: item.count,
            count: 1 // Добавляем новое свойство maxCount со значением count
          }));
          return updatedData;
        });
      }, [selectedRows]);

    const handleOk = () => {
        console.log(data);
        createOrder(data.map(el => ({
          item_id: el.id,
          count: el.count,
          sum: el.cost*el.count,
          pharmacy_id: el.pharmacy_id,
        })));
        setNull();
        setInputValues([]);
        setOpenModal(false);
    };
    const handleCancel = () => {
      setInputValues([]);
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
                const initialCount = inputValues[record.key]|| 1;
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

    return <>
        <Modal okButtonProps={{ disabled: isOkButtonDisabled }} width={1000} style={{width:1000}} open={openModal} onOk={handleOk} onCancel={handleCancel}>
        <Table rowKey="key" columns={columns} dataSource={data}  />
        </Modal>
    </>
}

export default OrderForm;