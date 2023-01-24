import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NumericFormat } from "react-number-format";
import { imageUrl } from "./../../../constants";
import { GridColDef, GridRenderCellParams, GridRowId } from "@mui/x-data-grid";
import { Avatar, Grid, Paper, Stack, Typography } from "@mui/material";
import { getTransactions, shopSelector } from "../../../store/slices/shopSlice";
import { useAppDispatch } from "../../../store/store";
import CMDataGrid from "../../fragments/CMDataGrid";
import dayjs from "dayjs";
import "dayjs/locale/th";

const Transaction = (props: any) => {
  const dispatch = useAppDispatch();
  const [orderList, setOrderList] = useState([]);
  const [selectedId, setSelectedId] = useState<GridRowId>(0);

  const shopReducer = useSelector(shopSelector);

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch, shopReducer]);

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
        <Typography variant="body1">
          {/* 543 diff thai years */}
          {dayjs(params.value)
            .locale("th")
            .add(543, "year")
            .format("DD MMMM YYYY")}
        </Typography>
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
        <NumericFormat
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
        <NumericFormat
          value={params.value}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"฿"}
        />
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
        <Grid item xs={orderList.length ? 7 : 12}>
          <CMDataGrid
            sx={{ height: "70vh" }}
            showOutline={false}
            getRowId={(row) => row.transaction_id}
            onSelectionModelChange={(newSelectionModel) => {
              setSelectedId(newSelectionModel[0]);
            }}
            selectionModel={[selectedId]}
            onRowClick={(e) => {
              setOrderList(JSON.parse(e.row.order_list));
            }}
            rows={shopReducer.transactionAllResult}
            columns={transactionColumns}
            rowsPerPageOptions={[5]}
          />
        </Grid>
        <Grid item xs={orderList.length ? 5 : 0}>
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

export default Transaction;
