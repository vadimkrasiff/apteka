import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { getStorage } from "../../redux/storage-reducer";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import Preloader from "../../common/Preloader";
import css from "./Order.module.css";
import { Button, Form, Input, Modal, Table, Typography } from "antd";
import OrderForm from "./OrderForm";
import { NavLink } from "react-router-dom";
import { createOrder } from "../../redux/orders-reducer";

let Order = ({ storage, isFetching, getStorage, createOrder, worker_id }) => {

    document.title = "Заказы"
    useEffect(() => {
        getStorage()
    }, []);

    

    const columns = [
        {
            title: 'Название',
            dataIndex: 'name',
            sorter: (a, b) => {
                const textA = a.name.props.children;
                const textB = b.name.props.children;
                return textA.localeCompare(textB);
              }
        },
        {
            title: 'Цена',
            dataIndex: 'cost',
            sorter: (a, b) => a.cost - b.cost
        },
        {
            title: 'Количество',
            dataIndex: 'count',
            sorter: (a, b) => a.count - b.count
        },
        {
            title: 'Категория',
            dataIndex: 'category_name',
            sorter: (a, b) => a.category_name.localeCompare(b.category_name)
        },
        {
            title: 'Производитель',
            dataIndex: 'manufacturer',
            sorter: (a, b) => a.manufacturer.localeCompare(b.manufacturer)
        },
    ];

   

    const [loading, setLoading] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const showModal  = () => {
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
            setOpenModal(true);
          setLoading(false);
        }, 1000);
      }

  const handleSelectChange = (selectedRowKeys, selectedRows) => {
    const filteredRows = selectedRows.filter((row) => row.count !== 0);
    setSelectedRows(filteredRows);
    setSelectedRowKeys(selectedRowKeys);
  };

  const setNull = () => {
    setSelectedRows([]);
    setSelectedRowKeys([]);
  } 

  const rowSelection = {
    selectedRowKeys,
    onChange: handleSelectChange,
    getCheckboxProps: (record) => ({
        disabled: record.count === 0,
      }),
  };

  const [openModal, setOpenModal] = useState(false);

  const [searchText, setSearchText] = useState('');

    const storageItems = storage ? storage.filter(item => {
        return (
            item.name.toLowerCase().includes(searchText.toLowerCase())
        )
    }) : null;

    const handleChange = e => {
        setSearchText(e.target.value);
        setSelectedRows([]);
    setSelectedRowKeys([]);
    };


    const data = storageItems ? storageItems.map((el, i) => ({
        key: i + 1,
        id: el.id,
        name: (<NavLink to={'/product/' + el.id}>{ el.name}</NavLink>),
        cost: el.cost,
        count: el.count,
        category_name: el.category_name,
        manufacturer: el.manufacturer || "Не указан",
        pharmacy_id: el.pharmacy_id,

    })) : null;


    return <>
        {isFetching || !storage ? <Preloader /> :
            <div className={css.form}>
                <Typography.Title level={3} style={{ marginBottom: 20 }}>Заказ</Typography.Title>
                <div className={css.search}>
                    <Form
                        name="basic"
                    >
                        <Form.Item
                            name="search" >
                            <Input onChange={handleChange} placeholder="Поиск..." style={{ width: "100%", height: 40, position: "relative" }} />
                        </Form.Item>
                    </Form>
                </div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
                <Button type="primary" onClick={showModal } disabled={!selectedRows.length} loading={loading}>Заказать</Button>
                <span style={{marginLeft:20}}>{selectedRows.length ? `Количество: ${selectedRows.length}` : ''}</span>
                <OrderForm createOrder={createOrder} openModal={openModal} setOpenModal={setOpenModal} columns={columns} selectedRows={selectedRows} setNull={setNull} setSelectedRows={setSelectedRows} />
            </div>
        }
    </>
}

let mapStateToProps = (state) => ({
    storage: state.storage.storage,
    isFetching: state.storage.isFetching,
})

export default compose(connect(mapStateToProps, { getStorage, createOrder }), withAuthRedirect)(Order);