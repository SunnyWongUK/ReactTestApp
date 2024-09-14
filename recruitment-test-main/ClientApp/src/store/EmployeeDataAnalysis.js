import { Common } from "../Common";

const initialState = {
    employees: [],
    loading: false,
    errors: {},
    forceReload: false
}

export const actionCreators = {
    requestEmployeeDataAnalysis: () => async (dispatch, getState) => {

        try {
            const url = '/API/Employee/DataAnalysis';
            const response = await fetch(url);
            const employees = await response.json();
            dispatch({ type: 'FETCH_EMPLOYEE_DATA_ANALYSIS', employees });
        }
        catch (err) {
            Common.Alert(err.message)
        }
    },
};

//?
export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case 'FETCH_EMPLOYEE_DATA_ANALYSIS': {
            return {
                ...state,
                employees: action.employees,
                loading: false,
                errors: {},
                forceReload: false
            }
        }

        default:
            return state;
    }
};
