import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {Grid, Typography} from "@mui/material";
import CustomButton from "../../compenents/common/Button";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {Component} from "react";
import ItemService from "../../services/ItemService";
import Button from "@mui/material/Button";

class Item extends Component{
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                id: '',
                name: '',
                qty: '',
                unitPrice: ''
            },
            alert: false,
            message: '',
            severity: '',

            data: [],
            btnLabel: 'save',
            btnColor: 'primary'
        }
    }

    deleteItem = async (id) => {
        let params = {
            id: id
        }
        let res = await ItemService.deleteItem(params);

        if(res.status === 200) {
            this.setState({
                alert: true,
                message: res.data.message,
                severity: 'success'
            });
            this.loadData();
        } else {
            this.setState({
                alert: true,
                message: res.data.message,
                severity: 'error'
            });
        }
    };

    updateItem = (data) => {
        console.log(data)

        this.setState({
            btnLabel: 'update',
            btnColor: 'secondary',
            formData: {
                id: data.id,
                name: data.name,
                qty: data.qty,
                unitPrice: data.unitPrice
            }
        });
    };

    clearFields = () => {
        this.setState({
            formData: {
                id: '',
                name: '',
                qty: '',
                unitPrice: ''
            }
        });
    };

    // ------- React Map function example -------
    exampleForMap = () => {
        this.state.data.map((value, index) => {
            console.log(value)   // access element one by one
        })
    };

    loadData = async () => {
        let res = await ItemService.fetchItem();

        if (res.status === 200) {
            this.setState({
                data: res.data.data
            });
        }
        console.log(this.state.data)    // print customers array

        this.exampleForMap()

    };

    submitItem = async () => {
        let formData = this.state.formData;

        if(this.state.btnLabel === "save") {
            let res = await ItemService.postItem(formData);

            console.log(res)    //print the promise

            if (res.status === 201) {
                this.setState({
                    alert: true,
                    message: res.data.message,
                    severity: 'success'
                });
                this.clearFields();
                this.loadData();
            } else {
                this.setState({
                    alert: true,
                    message: res.response.data.message,
                    severity: 'error'
                });
            }
        } else {
            let res = await ItemService.putItem(formData);
            if(res.status === 200) {
                this.setState({
                    alert: true,
                    message: res.data.message,
                    severity: 'success',
                    btnLabel: 'save',
                    btnColor: 'primary'
                });
                this.clearFields();
                this.loadData();
            } else {
                this.setState({
                    alert: true,
                    message: res.response.data.message,
                    severity: 'error'
                });
            }
        }
    };

    componentDidMount() {
        this.loadData();
    }
    render() {
        return (
            // <Fragment>
            <>
                <ValidatorForm ref="form" className="pt-2" onSubmit={this.submitItem()} >
                    <Grid container className="pt-2" spacing={3}>
                        <Grid item lg={12} xs={12} sm={12} md={12} style={{display:"flex",justifyContent:"center"}}>
                            <Typography style={{color:"#0c2461"}} variant="h3">Item Manage</Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Typography style={{marginLeft:'10px'}} variant="subtitle1">Item Id</Typography>
                            <TextValidator
                                id="outlinedbasic"
                                placeholder="Item Id"
                                variant="outlined"
                                size="small"
                                style={{ width: '97%' , marginLeft:'10px'}}
                                value={this.state.formData.id}
                                onChange={(e) => {
                                    let formData = this.state.formData
                                    formData.id = e.target.value
                                    this.setState({ formData })
                                }}
                                validators={['required']}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Typography variant="subtitle1" style={{marginLeft:'10px'}}>Item Name</Typography>
                            <TextValidator
                                id="outlinedbasic"
                                placeholder="Item Name"
                                variant="outlined"
                                size="small"
                                style={{ width: '97%', marginLeft:'10px' }}
                                value={this.state.formData.name}
                                onChange={(e) => {
                                    let formData = this.state.formData
                                    formData.name = e.target.value
                                    this.setState({ formData })
                                }}
                                validators={['required']}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Typography style={{marginLeft:'10px'}} variant="subtitle1">Qty On Hand</Typography>
                            <TextValidator
                                id="outlinedbasic"
                                placeholder="Qty On Hand"
                                variant="outlined"
                                size="small"
                                style={{ width: '97%',marginLeft:'10px' }}
                                value={this.state.formData.address}
                                onChange={(e) => {
                                    let formData = this.state.formData
                                    formData.address = e.target.value
                                    this.setState({ formData })
                                }}
                                validators={['required']}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Typography style={{marginLeft:'10px'}} variant="subtitle1">Unit Price</Typography>
                            <TextValidator
                                id="outlinedbasic"
                                placeholder="Unit Price"
                                variant="outlined"
                                size="small"
                                style={{ width: '97%',marginLeft:'10px' }}
                                value={this.state.formData.salary}
                                onChange={(e) => {
                                    let formData = this.state.formData
                                    formData.salary = e.target.value
                                    this.setState({ formData })
                                }}
                                validators={['required']}
                            />
                        </Grid>
                        <Grid container style={{ marginTop: '10px',marginRight:'10px' }} direction="row" justifyContent="flex-end" alignItems="center">
                            <CustomButton label={this.state.btnLabel} type="submit" size="small" color={this.state.btnColor} variant="contained"/>
                            <Button style={{backgroundColor:"#e58e26", margin:"10px"}} variant="contained" size="small">Update</Button>
                            <Button style={{backgroundColor:"#eb2f06"}} variant="contained" size="small">Delete</Button>
                        </Grid>
                    </Grid>
                </ValidatorForm>
                <Grid container style={{ marginTop: '15px' }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="item table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Item Id</TableCell>
                                    <TableCell align="left">Item Name</TableCell>
                                    <TableCell align="left">Qty On Hand</TableCell>
                                    <TableCell align="left">Unit Price</TableCell>
                                    <TableCell align="left">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.data.map((row) => (
                                        <TableRow>
                                            <TableCell align="left">{row.id}</TableCell>
                                            <TableCell align="left">{row.name}</TableCell>
                                            <TableCell align="left">{row.qty}</TableCell>
                                            <TableCell align="left">{row.unitPrice}</TableCell>
                                            <TableCell align="left">
                                                <Tooltip title="Edit">
                                                    <IconButton
                                                        onClick={() => {
                                                            console.log("edit icon clicked!")
                                                            this.updateItem(row);
                                                        }}
                                                    >
                                                        <EditIcon color="primary" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete">
                                                    <IconButton
                                                        onClick={() => {
                                                            this.deleteItem(row.id)
                                                        }}
                                                    >
                                                        <DeleteIcon color="error" />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </>
            // </Fragment>
        );
    }
}
export default Item;