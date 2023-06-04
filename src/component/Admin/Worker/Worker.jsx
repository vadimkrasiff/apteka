import React, { useEffect, useState } from "react";
import css from "./../Admin.module.css"
import { Form, Input, Table, Typography } from "antd";
import { getDataWorkers } from "../../../redux/workers-reducer";
import { connect } from "react-redux";
import { compose } from "redux";

let Worker = ({ workers }) => {


  const [searchText, setSearchText] = useState('');

  const filteredWorkers = workers ? workers.filter(el => {
    return (
      el.fio.toLowerCase().includes(searchText.toLowerCase())
    )
  }) : null;

  const handleChange = e => {
    setSearchText(e.target.value);
};


const uniqueAddress = [...new Set(filteredWorkers.map(el => el.address))];
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Логин',
      dataIndex: 'login',
      sorter: (a, b) => a.login.localeCompare(b.login)
    },
    {
      title: 'Должность',
      dataIndex: 'rol',
      sorter: (a, b) => a.rol.localeCompare(b.rol),
      filters: [
        {
          text: 'Aдминистратор',
          value: 'Aдминистратор',
        },
        {
          text: 'Фармацевт',
          value: 'Фармацевт',
        },
      ],
      onFilter: (value, record) => record.rol.indexOf(value) === 0,
    },
    {
      title: 'ФИО',
      dataIndex: 'fio',
      sorter: (a, b) => a.fio.localeCompare(b.fio)
    },
    {
      title: 'Номер телефона',
      dataIndex: 'num_phone',
      sorter: (a, b) => a.num_phone.localeCompare(b.num_phone)
    },
    {
      title: 'Адрес аптеки',
      dataIndex: 'address',
      filters: uniqueAddress.map((address) => ({
        text: address,
          value: address,
      })),
      sorter: (a, b) => a.address.localeCompare(b.address),
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
  ];
  const data = filteredWorkers.map((el, i) => ({
    key: i + 1,
    id: el.id,
    login: el.login,
    rol: el.rol == "admin" ? "Aдминистратор" : 'Фармацевт',
    fio: el.fio,
    num_phone: el.num_phone,
    address: el.address,
  }))

  return <div className={css.form} style={{ width: 1000 }}>
    <Typography.Title level={3} style={{ marginBottom: 20 }}>Сотрудники</Typography.Title>
    <Form
      name="basic"
    >
      <Form.Item
        name="search" >
        <Input allowClear onChange={handleChange} placeholder="Введите имя сотрудника" style={{ width: "100%", height: 40, position: "relative" }} />
      </Form.Item>
    </Form>
    <Table columns={columns} dataSource={data} />
  </div>
}


export default Worker;