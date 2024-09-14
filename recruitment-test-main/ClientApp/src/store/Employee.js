import { Common } from "../Common";

const initialState = {
    employees: [],
    loading: false,
    errors: {},
    forceReload: false
}

export const actionCreators = {
    requestEmployees: () => async (dispatch, getState) => {

        try {
            const url = '/API/Employee/Employees';
            const response = await fetch(url);
            const employees = await response.json();
            dispatch({ type: 'FETCH_EMPLOYEES', employees });
        }
        catch (err) {
            Common.Alert(err.message)
        }
    },
    saveEmployee: (employee, newEmployee) => async (dispatch, getState) => {

        try {
            var url;

            if (newEmployee) {
                url = '/API/Employee/InsertEmployee';
            }
            else {
                url = '/API/Employee/UpdateEmployee';
            }

            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            const requestOptions = {
                method: 'POST',
                headers,
                body: JSON.stringify(employee)
            };
            const request = new Request(url, requestOptions);
            const response = await fetch(request);
            const result = await response.json();

            if (result) {
                dispatch({ type: 'UPDATE_EMPLOYEE', employee });
                Common.Alert("Data saved successfully")
            } else {
                Common.Alert("Data fail saved")
            }
        }
        catch (err) {
            Common.Alert(err.message)
        }
    },
    deleteEmployee: name => async (dispatch, getState) => {

        try {
            const url = '/API/Employee/DeleteEmployee/' + name;
            const requestOptions = {
                method: 'DELETE',
            };
            const request = new Request(url, requestOptions);
            const response = await fetch(request);
            const result = await response.json();

            if (result) {
                dispatch({ type: 'DELETE_EMPLOYEE', name });
                Common.Alert("Data deleted successfully")
            } else {
                Common.Alert("Data fail deleted")
            }
        }
        catch (err) {
            Common.Alert(err.message)
        }
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    //*
    switch (action.type) {
        case 'FETCH_EMPLOYEE_DATA_ANALYSIS':
        case 'FETCH_EMPLOYEES': {
            return {
                ...state,
                employees: action.employees,
                loading: false,
                errors: {},
                forceReload: false
            }
        }
        case 'INSERT_EMPLOYEE':
        case 'UPDATE_EMPLOYEE': {
            return {
                ...state,
                employees: Object.assign({}, action.employee),
                forceReload: true
            }
        }
        case 'DELETE_EMPLOYEE': {
            return {
                ...state,
                name: action.name,
                forceReload: true
            }
        }
        default:
            return state;
    }
};
