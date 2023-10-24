import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createUser, plusUserCount} from './store/actions';
import {selectUsers, selectUsersCount} from './store/selectors';
import {SetTimeoutType} from './types';
import {CustomButton} from './components';
import {UsersCountValue} from './components';
import {v1} from 'uuid';
import {generateRandomName} from './utils';
import {UsersList} from './components';


const DELAY = 500;

export const App = () => {
  const dispatch = useDispatch();


  const users = useSelector(selectUsers);
  const usersCount = useSelector(selectUsersCount);

  console.log(users)
  console.log(usersCount)

  const [isAddNewUser, setIsAddNewUser] = useState<boolean>(false);

  useEffect(() => {
    let timeoutId: SetTimeoutType = setTimeout((): void => {
      setIsAddNewUser(false);
    }, DELAY);

    return () => clearTimeout(timeoutId);
  }, [users.length]);

  useEffect(() => {
    if (users.length > 0 && isAddNewUser) {
      dispatch(plusUserCount());
    }
  }, [dispatch, users.length, isAddNewUser]);

  const handleClick = useCallback((): void => {
    dispatch(createUser({id: v1(), name: generateRandomName()}));

    setIsAddNewUser(true);
  }, [dispatch]);

  return (
    <Fragment>
      <UsersCountValue usersCount={usersCount} />

      <CustomButton
        title="Click Me"
        isButtonDisabled={isAddNewUser}
        onClick={handleClick}
      />

      <UsersList users={users} />
    </Fragment>
  );
};
