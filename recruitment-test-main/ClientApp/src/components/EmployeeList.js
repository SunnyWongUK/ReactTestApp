import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Growl } from 'primereact/growl';
import { actionCreators } from '../store/Employee';

class EmployeeList extends Component {

    constructor() {
        super();
        this.state = {};
        this.onEmployeeSelect = this.onEmployeeSelect.bind(this);
        this.dialogHide = this.dialogHide.bind(this);
        this.addNew = this.addNew.bind(this);
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate() {
        // This method is called when the route parameters change
        if (this.props.forceReload) {
            this.fetchData();
        }
    }

    fetchData() {
        this.props.requestEmployees();
    }

    updateProperty(property, value) {
        let employee = this.state.employee;
        employee[property] = value;
        this.setState({ employee: employee });
    }

    onEmployeeSelect(e) {
        this.newEmployee = false;
        this.setState({
            displayDialog: true,
            employee: Object.assign({}, e.data)
        });
    }

    dialogHide() {
        this.setState({ displayDialog: false });
    }

    addNew() {
        this.newEmployee = true;
        this.setState({
            employee: { name: '', value: '' },
            displayDialog: true
        });
    }

    save() {
        this.props.saveEmployee(this.state.employee, this.newEmployee);
        this.dialogHide();
        //this.growl.show({ severity: 'success', detail: this.newEmployee ? "Data Saved Successfully" : "Data Updated Successfully" });
    }

    delete() {
        this.props.deleteEmployee(this.state.employee.name);
        this.dialogHide();
        //this.growl.show({ severity: 'error', detail: "Data Deleted Successfully" });
    }

    render() {

        /*let header = <div className="p-clearfix" style={{ lineHeight: '1.87em' }}>Employee List</div>*/

        let header = <div><div className="p-clearfix" style={{ width: '100%' }}>
            <Button style={{ float: 'left' }} label="Add" icon="pi pi-plus" onClick={this.addNew} />
        </div><div className="p-clearfix" style={{ lineHeight: '1.87em' }}>Employee List</div></div>

        //let footer = <div className="p-clearfix" style={{ width: '100%' }}>
        //    <Button style={{ float: 'left' }} label="Add" icon="pi pi-plus" onClick={this.addNew} />
        //</div>;

        let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
            <Button label="Close" icon="pi pi-times" onClick={this.dialogHide} />
            <Button label="Delete" disabled={this.newEmployee ? true : false} icon="pi pi-times" onClick={this.delete} />
            <Button label={this.newEmployee ? "Save" : "Update"} icon="pi pi-check" onClick={this.save} />
        </div>;

        return (
            <div>
                <Growl ref={(el) => this.growl = el} />

                <DataTable value={this.props.employees} selectionMode="single" header={header} selection={this.state.selectedEmployee} onSelectionChange={e => this.setState({ selectedEmployee: e.value })} onRowSelect={this.onEmployeeSelect}>
                    <Column field="name" header="Name" />
                    <Column field="value" header="Value" />
                </DataTable>

                {/*<DataTable value={this.props.employees} selectionMode="single" header={header} footer={footer} selection={this.state.selectedEmployee} onSelectionChange={e => this.setState({ selectedEmployee: e.value })} onRowSelect={this.onEmployeeSelect}>*/}
                {/*    <Column field="name" header="Name" />*/}
                {/*    <Column field="value" header="Value" />*/}
                {/*</DataTable>*/}

                <br></br>

                <Dialog visible={this.state.displayDialog} style={{ 'width': '380px' }} header="Employee Detail" modal={true} footer={dialogFooter} onHide={() => this.setState({ displayDialog: false })}>
                    {
                        this.state.employee &&

                        <div className="p-grid p-fluid">

                            {/*<div><label htmlFor="name">Name</label></div>*/}
                            {/*<div>*/}
                            {/*    <label id="name" >{this.state.employee.name}</label>*/}
                            {/*</div>*/}

                            <div><label htmlFor="firstName">Name</label></div>
                            <div>
                                <InputText id="name" disabled={!this.newEmployee} onChange={(e) => { this.updateProperty('name', e.target.value) }} value={this.state.employee.name} />
                            </div>

                            <div style={{ paddingTop: '10px' }}><label htmlFor="value">Value</label></div>
                            <div>
                                <InputText id="value" onChange={(e) => { this.updateProperty('value', e.target.value) }} value={this.state.employee.value} />
                            </div>

                        </div>
                    }
                </Dialog>

            </div>
        )
    }
}

// Make employees array available in props
function mapStateToProps(state) {
    return {
        employees: state.employees.employees,
        loading: state.employees.loading,
        errors: state.employees.errors,
        forceReload: state.employees.forceReload
    }
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(EmployeeList);
