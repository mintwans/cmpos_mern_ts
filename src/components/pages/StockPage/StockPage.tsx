import AddIcon from "@mui/icons-material/Add";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Stack,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import {
  DataGrid,
  GridColDef,
  GridColumns,
  GridRenderCellParams,
  GridRowId,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootReducers } from "../../../reducers";
import * as stockActions from "./../../../actions/stock.action";
import { imageUrl } from "./../../../constants";
import StockCard from "./../../fragments/StockCard/StockCard";
import { useDebounce, useDebounceCallback } from "@react-hook/debounce";

export default (props: any) => {
  const stockReducer = useSelector((state: RootReducers) => state.stockReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [value, setValue] = useDebounce("", 500);

  useEffect(() => {
    dispatch(stockActions.getProductByKeyword(value));
  }, [value]);

  useEffect(() => {
    dispatch(stockActions.getProducts());
  }, []);

  const stockColumns: GridColDef[] = [
    {
      headerName: "ID",
      field: "product_id",
      width: 50,
    },
    {
      headerName: "IMG",
      field: "image",
      width: 80,
      renderCell: ({ value }: GridRenderCellParams<string>) => (
        <img
          src={`${imageUrl}/images/${value}?dummy=${Math.random()}`}
          style={{ width: 70, height: 70, borderRadius: "5%" }}
        />
      ),
    },
    {
      headerName: "NAME",
      field: "name",
      width: 500,
    },
    {
      headerName: "STOCK",
      width: 120,
      field: "stock",
      renderCell: ({ value }: GridRenderCellParams<string>) => (
        <Typography variant="body1">
          <NumberFormat
            value={value}
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={0}
            fixedDecimalScale={true}
          />
        </Typography>
      ),
    },
    {
      headerName: "PRICE",
      field: "price",
      width: 120,
      renderCell: ({ value }: GridRenderCellParams<string>) => (
        <Typography variant="body1">
          <NumberFormat
            value={value}
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
      headerName: "TIME",
      field: "created",
      width: 120,
    },
    {
      headerName: "ACTION",
      field: ".",
      width: 120,
      renderCell: ({ row }: GridRenderCellParams<string>) => (
        <Stack direction="row">
          <IconButton
            aria-label="edit"
            size="large"
            onClick={() => {
              navigate("/stock/edit/" + row.product_id);
            }}
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => {
              setSelectedProduct(row);
              setOpenDialog(true);
            }}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const handleDeleteConfirm = () => {
    dispatch(stockActions.deleteProduct(selectedProduct.product_id));
    dispatch(stockActions.getProducts());
    setOpenDialog(false);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const showDialog = () => {
    if (selectedProduct === null) {
      return "";
    }

    return (
      <Dialog
        open={openDialog}
        keepMounted
        onClose={() => {}}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          <img
            src={`${imageUrl}/images/${
              selectedProduct.image
            }?dummy=${Math.random()}`}
            style={{ width: 100, borderRadius: "5%" }}
          />
          <br />
          Confirm to delete the product? : {" " + selectedProduct.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            You cannot restore deleted product.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="info">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Box>
      {/* Summary Icons */}
      <Grid container style={{ marginBottom: 16 }} spacing={7}>
        <Grid item lg={3} md={6}>
          <StockCard
            icon={AddShoppingCartIcon}
            title="TOTAL"
            subtitle="112 THB"
            color="#00a65a"
          />
        </Grid>

        <Grid item lg={3} md={6}>
          <StockCard
            icon={NewReleasesIcon}
            title="EMPTY"
            subtitle="9 PCS."
            color="#f39c12"
          />
        </Grid>

        <Grid item lg={3} md={6}>
          <StockCard
            icon={AssignmentReturnIcon}
            title="RETURN"
            subtitle="1 PCS."
            color="#dd4b39"
          />
        </Grid>

        <Grid item lg={3} md={6}>
          <StockCard
            icon={StarIcon}
            title="LOSS"
            subtitle="5 PCS."
            color="#00c0ef"
          />
        </Grid>
      </Grid>

      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          marginTop: 10,
          display: "flex",
          alignItems: "center",
          width: 400,
          marginBottom: 2,
        }}
      >
        <input type="text" hidden />
        <InputBase
          onChange={(e: React.ChangeEvent<any>) => {
            setValue(e.target.value);
            e.stopPropagation();
            e.preventDefault();
          }}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search product name"
          inputProps={{ "aria-label": "search product name" }}
        />
        <SearchIcon />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="add"
          component={Link}
          to="/stock/create"
        >
          <AddIcon />
        </IconButton>
      </Paper>

      <DataGrid
        sx={{ backgroundColor: "white", height: "50vh" }}
        getRowId={(row) => row.product_id}
        onRowClick={(e) => {}}
        rows={stockReducer.result}
        columns={stockColumns}
        rowsPerPageOptions={[5]}
      />
      {showDialog()}
    </Box>
  );
};
