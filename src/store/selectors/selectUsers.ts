
import {RootStateOrAny} from "../index";
import {UserType} from '../../types';


export const selectUsers = (state: RootStateOrAny): UserType[] => state.usersData.users;
