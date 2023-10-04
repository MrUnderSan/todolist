import React, {useEffect, useState} from 'react';
import {NavLink, Outlet} from 'react-router-dom';
import './App.css';
import './App.css';
import styles from './components/Site.module.css';
import { useWindowSize } from './helpers/useWindowSize';
import {S} from './_stylesSC';


function App() {
    // const [burger, setBurger] = useState(false)

    const size = useWindowSize();
    console.log(size)

    return (
        // <div>
        //     hello
        //     <Outlet />
        //     {/*<Site/>*/}
        // </div>
        <>
            <div className={styles.header}><h1>HEADER</h1></div>
            <div className={styles.body}>
                {size > 768

                    ? <div className={styles.nav}>
                        <S.NavWrapper><NavLink to={'/page/0'}>PageOne</NavLink></S.NavWrapper>
                        <S.NavWrapper><NavLink to={'/page/1'}>PageTwo</NavLink></S.NavWrapper>
                        <S.NavWrapper><NavLink to={'/page/2'}>PageThree</NavLink></S.NavWrapper>
                        <S.NavWrapper><NavLink to={'/protected'}>Protected</NavLink></S.NavWrapper>
                    </div>
                    : <div></div>
                }

                <div className={styles.content}>
                    <Outlet/>
                </div>
            </div>
        </>
    );
}


export default App;
