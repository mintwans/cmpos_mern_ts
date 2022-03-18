import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as transactionActions from "./../../../actions/transaction.action";
import Moment from "react-moment";
import NumberFormat from "react-number-format";
import AddIcon from "@mui/icons-material/Add";

import { imageUrl } from "./../../../constants";
import {
  DataGrid,
  GridColDef,
  GridColumns,
  GridRenderCellParams,
  GridRowId,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { RootReducers } from "../../../reducers";
import { Avatar, Grid, Paper, Stack, Typography } from "@mui/material";

export default (props: any) => {
  const dispatch = useDispatch();
  const [orderList, setOrderList] = useState([]);
  const [selectedId, setSelectedId] = useState<GridRowId>(0);

  const transactionReducer = useSelector(
    (state: RootReducers) => state.transactionReducer
  );

  useEffect(() => {
    dispatch(transactionActions.getTransactions());

    setTimeout(() => {
      if (transactionReducer.result.length > 0) {
        setOrderList(JSON.parse(transactionReducer.result[0].order_list));
        setSelectedId(Number(transactionReducer.result[0].transaction_id));
      }
    }, 300);
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
        <Moment format="YYYY/MM/DD hh:mm">{params.value}</Moment>
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
    {
      headerName: "IMG",
      width: 50,
      field: "order_list",
      renderCell: (params: GridRenderCellParams<any>) => {
        const orderList = JSON.parse(params.value);
        return <Avatar src={`${imageUrl}/images/${orderList[0].image}`} />;
      },
    },
  ];

  return (
    <Paper sx={{ padding: 4 }}>
      <Grid container spacing={2} sx={{ height: "80vh" }}>
        <Grid item xs={7}>
          <DataGrid
            onSelectionModelChange={(newSelectionModel) => {
              setSelectedId(newSelectionModel[0]);
            }}
            selectionModel={[selectedId]}
            onRowClick={(e) => setOrderList(JSON.parse(e.row.order_list))}
            rows={transactionReducer.result}
            columns={transactionColumns}
            rowsPerPageOptions={[5]}
          />
        </Grid>
        <Grid item xs={5}>
          <ul>
            {orderList.map((item: any) => (
              <Stack direction="row" spacing={1}>
                <Avatar src={`${imageUrl}/images/${item.image}`} />
                <li>{item.name}</li>
              </Stack>
            ))}
          </ul>
        </Grid>
      </Grid>
    </Paper>
  );
};
