import { Box, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Field, Form, Formik, FormikProps } from "formik";
import { TextField } from "formik-material-ui";

import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Product } from "../../../types/product.type";
import * as stockActions from "./../../../actions/stock.action";

export default () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showForm = ({ values, setFieldValue }: FormikProps<Product>) => {
    return (
      <Form>
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <Typography gutterBottom variant="h3">
              Create Stock
            </Typography>

            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="name"
              type="text"
              label="Name"
            />
            <br />
            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="price"
              type="number"
              label="Price"
            />

            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="stock"
              type="number"
              label="Stock"
            />

            <div style={{ margin: 16 }}>{showPreviewImage(values)}</div>

            <div>
              <img
                src={`${process.env.PUBLIC_URL}/images/ic_photo.png`}
                style={{ width: 25, height: 20 }}
              />
              <span style={{ color: "#00B0CD", marginLeft: 10 }}>
                Add Picture
              </span>

              <input
                type="file"
                onChange={(e: React.ChangeEvent<any>) => {
                  e.preventDefault();
                  setFieldValue("file", e.target.files[0]); // for upload
                  setFieldValue(
                    "file_obj",
                    URL.createObjectURL(e.target.files[0])
                  ); // for preview image
                }}
                name="image"
                click-type="type1"
                multiple
                accept="image/*"
                id="files"
                style={{ padding: "20px 0 0 20px" }}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ marginRight: 1 }}
            >
              Create
            </Button>
            <Button component={Link} to="/stock" variant="outlined" fullWidth>
              Cancl
            </Button>
          </CardActions>
        </Card>
      </Form>
    );
  };

  const showPreviewImage = (values: any) => {
    if (values.file_obj) {
      return <img src={values.file_obj} style={{ height: 100 }} />;
    }
  };

  const initialValues: Product = { name: "", stock: 10, price: 90 };

  return (
    <Box>
      <Formik
        validate={(values) => {
          let errors: any = {};
          if (!values.name) errors.name = "Enter name";
          if (!values.stock) errors.stock = "Enter stock";
          if (!values.price) errors.price = "Enter price";
          return errors;
        }}
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          let formData = new FormData();
          formData.append("name", values.name);
          formData.append("price", String(values.price));
          formData.append("stock", String(values.stock));
          formData.append("image", String(values.file));
          dispatch(stockActions.addProduct(formData));
          setSubmitting(false);
        }}
      >
        {(props) => showForm(props)}
      </Formik>
    </Box>
  );
};
