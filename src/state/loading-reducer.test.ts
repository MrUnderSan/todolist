import {changeLoadingStatusAC, loadingReducer, LoadingType} from './loading-reducer';
import {v1} from 'uuid';
test('correct loading status of correct todolist should be changed', () => {

    const todolistId1 = v1();
    const todolistId2 = v1();

    const startState: LoadingType = {
        [todolistId1]: false,
        [todolistId2]: false
    };

    const action = changeLoadingStatusAC(todolistId2, true);
    const endState = loadingReducer(startState, action);

    expect(endState[todolistId1]).toBeFalsy()
    expect(endState[todolistId2]).toBeTruthy()

});