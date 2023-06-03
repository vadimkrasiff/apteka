import React, { useEffect } from "react";
import css from "./../Admin.module.css"
import { Table, Typography } from "antd";
import { getDataWorkers } from "../../../redux/workers-reducer";
import { connect } from "react-redux";
import { compose } from "redux";

let Worker = ({workers}) => {

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
            sorter: (a, b) => a.rol.localeCompare(b.rol)
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
          sorter: (a, b) => a.address.localeCompare(b.address)
        },
      ];
      const data= workers.map((el, i )=> ({
        key: i+1,
          id: el.id,
          login: el.login,
          rol: el.rol == "admin"? "Aдминистратор": 'Фармацевт',
          fio: el.fio,
          num_phone: el.num_phone,
          address: el.address,
      }))

    return  <div className={css.form} style={{width:1000}}>
      <Typography.Title level={3} style={{marginBottom:20}}>Сотрудники</Typography.Title>
    <Table  columns={columns} dataSource={data} />
    </div>
}


export default Worker;