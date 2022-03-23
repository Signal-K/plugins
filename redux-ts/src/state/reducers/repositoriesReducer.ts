import { ActionType } from '../action-types';
import { Action } from '../actions';

interface RepositoriesState {
    loading: boolean;
    error: string | null;
    data: string[];
}

const reducer = (state: RepositoriesState, action: Action): RepositoriesState => {
    switch (action.type) { // Switch list of different action types
        case ActionType.SEARCH_REPOSITORIES:
            return { loading: true, error: null, data: [] };
        case ActionType.SEARCH_REPOSITORIES_SUCCESS:
            // 'action' is SearchRepositoriesSuccessAction
            return { loading: false, error: null, data: action.payload };
        case ActionType.SEARCH_REPOSITORIES_ERROR:
            return { loading: false, error: action.payload, data: [] };
        default:
            return state;
    }
};

export default reducer;