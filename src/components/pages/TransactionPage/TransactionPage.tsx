import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as transactionActions from "./../../../actions/transaction.action";
import Moment from "react-moment";
import NumberFormat from "react-number-format";

import { imageUrl } from "./../../../constants";
import {
  DataGrid,
  GridColDef,
  GridColumns,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { RootReducers } from "../../../reducers";
import { Grid, Typography } from "@mui/material";

export default (props: any) => {
  const dispatch = useDispatch();
  const [orderList, setOrderList] = useState([]);
  const transactionReducer = useSelector(
    (state: RootReducers) => state.transactionReducer
  );

  useEffect(() => {
    dispatch(transactionActions.getTransactions());
  }, []);

  const transactionColumns: GridColDef[] = [
    {
      headerName: "ID",
      field: "transaction_id",
      width: 50,
    },

    {
      headerName: "DATE",
      field: "timestamp",
      width: 150,
      renderCell: (params: GridRenderCellParams<string>) => (
        <Moment format="YYYY/MM/DD HH:MM">{params.value}</Moment>
      ),
    },
    {
      headerName: "STAFF",
      width: 120,
      field: "staff_id",
    },
    {
      headerName: "TOTAL",
      field: "total",
      width: 70,
      renderCell: (params: GridRenderCellParams<string>) => (
        <NumberFormat
          value={params.value}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"฿"}
        />
      ),
    },
    {
      headerName: "PAID",
      field: "paid",
      width: 70,
      renderCell: (params: GridRenderCellParams<string>) => (
        <NumberFormat
          value={params.value}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"฿"}
        />
      ),
    },
    {
      headerName: "#SKU",
      width: 100,
      field: "order_list",
      renderCell: (params: GridRenderCellParams<any>) => (
        <Typography>{JSON.parse(params.value).length} SKU</Typography>
      ),
    },
  ];

  const orderColumns = [
    {
      title: "ID",
      field: "product_id",
      render: (item: any) => (
        <Typography variant="body1">{item.product_id}</Typography>
      ),
    },
    {
      title: "IMAGE",
      field: "image",
      cellStyle: { padding: 0 },
      render: (item: any) => (
        <img
          src={`${imageUrl}/images/${item.image}?dummy=${Math.random()}`}
          style={{ width: 80, height: 80, borderRadius: "5%" }}
        />
      ),
    },
    {
      title: "NAME",
      cellStyle: { minWidth: 400 },
      field: "name",
      render: (item: any) => (
        <Typography variant="body1">{item.name}</Typography>
      ),
    },
    {
      title: "PRICE",
      field: "price",
      render: (item: any) => (
        <Typography variant="body1">
          <NumberFormat
            value={item.price}
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale={true}
            prefix={"฿"}
          />
        </Typography>
      ),
    },
    {
      title: "STOCK",
      field: "stock",
      render: (item: any) => (
        <Typography variant="body1">
          <NumberFormat
            value={item.stock}
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={0}
            fixedDecimalScale={true}
            suffix={" pcs"}
          />
        </Typography>
      ),
    },
  ];

  return (
    <Grid container spacing={2} sx={{ height: "80vh" }}>
      <Grid item xs={6}>
        <DataGrid
          onRowClick={(e) => setOrderList(JSON.parse(e.row.order_list))}
          rows={transactionReducer.result}
          columns={transactionColumns}
          rowsPerPageOptions={[5]}
        />
      </Grid>
      <Grid item xs={6}>
        <ul>
          {orderList.map((item: any) => (
            <li>{item.name}</li>
          ))}
        </ul>
      </Grid>
    </Grid>
  );
};
