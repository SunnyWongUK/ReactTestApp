import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Growl } from 'primereact/growl';
import { actionCreators } from '../store/EmployeeDataAnalysis';

class EmployeeDataAnalysisList extends Component {

    constructor() {
        super();
        this.state = {};   
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
        this.props.requestEmployeeDataAnalysis();
    }       
     
    render() {

        let header = <div className="p-clearfix" style={{ lineHeight: '1.87em' }}>Employee Data Analysis</div>;             
        
        return (
            <div>
                <Growl ref={(el) => this.growl = el} />

                <DataTable value={this.props.employees} selectionMode="single" header={header} selection={this.state.selectedEmployee} onSelectionChange={e => this.setState({ selectedEmployee: e.value })} onRowSelect={this.onEmployeeSelect}>
                    <Column field="name" header="Name" />
                    <Column field="value" header="Value" />
                </DataTable>                
                <br></br>
            </div>           
        )
    }
}

// Make employee data analysis array available in props
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
)(EmployeeDataAnalysisList);
