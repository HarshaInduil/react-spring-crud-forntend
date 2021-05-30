import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import DataTable from "react-data-table-component";
import { Alert, AlertTitle } from "@material-ui/lab";
import AdvertisementService from "../../Services/AdvertisementService";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "40px",
    padding: "10px",
    border: "1px solid #73AD21",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    borderRadius: "5px",
  },
  container: {
    padding: "5px",
  },
}));

export default function Content(props) {
  const columns = [
    {
      name: "#ID",
      selector: "id",
      sortable: true,
      filter: true,
    },
    {
      name: "Title",
      selector: "title",
      sortable: true,
    },
    {
      name: "Description",
      selector: "description",
      sortable: true,
    },
    {
      name: "Address",
      selector: "address",
      sortable: true,
    },
    {
      name: "Sale Price",
      selector: "salePrice",
      sortable: true,
    },
    {
      name: "",
      selector: "id",
      cell: (row) => (
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={() =>
            props.history.push(`/advertisement-from/edit/${row.id}`)
          }
        >
          Edit
        </Button>
      ),
      sortable: true,
      width: "70px",
    },
    {
      name: "",
      selector: "id",
      cell: (row) => (
        <Button
          variant="contained"
          size="small"
          color="secondary"
          onClick={() => {
            deleteItem(row.id);
          }}
        >
          Delet
        </Button>
      ),
      sortable: true,
      width: "80px",
    },
  ];
  const classes = useStyles();

  const [advertisementList, setAdvertisementList] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const deleteItem = (id) => {
    AdvertisementService.delete(id)
      .then((response) => {
        setDeleteSuccess(true);
        setTimeout(() => {
          loadData();
          setDeleteSuccess(false);
        }, 1000);
      })
      .catch((error) => {
        setDeleteSuccess(false);
      });
  };

  const loadData = () => {
    AdvertisementService.getAllByUserId().then((response) => {
      setAdvertisementList(response.data);
    });
  };

  return (
    <div className={classes.root}>
      {deleteSuccess && (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          Delete Sucessful <strong></strong>
        </Alert>
      )}
      <Grid container className={classes.container}>
        <Grid item xs={3} style={{ marginLeft: "10px" }}>
          <h1>Advertisement List</h1>
        </Grid>
        <Grid item xs={1}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              props.history.push(`/advertisement-from/new/0`);
            }}
          >
            Add New
          </Button>
        </Grid>
        <Grid item xs={12}>
          <DataTable
            columns={columns}
            data={advertisementList}
            pagination
            filter
            paginationServer
            sortable
            theme
            persistTableHead
          />
        </Grid>
      </Grid>
    </div>
  );
}
