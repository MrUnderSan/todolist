import React from 'react';
import styles from './Site.module.css'
import {PageOne} from "./../components/pages/PageOne";
import {PageTwo} from "./..//components/pages/PageTwo";
import {PageThree} from "./../components/pages/PageThree";
import {Navigate, NavLink, Route, Routes} from 'react-router-dom';
import {Error404} from "./../components/pages/Error404";
import {S} from './../_stylesSC'
import {Page} from "./../components/pages/Page";
import {dataState} from "./../data/dataState";


export const Site = () => {
    return (
        <div>
            <div className={styles.header}><h1>HEADER</h1></div>
            <div className={styles.body}>
                <div className={styles.nav}>

                    <S.NavWrapper><NavLink to={'/page/0'} >PageOne</NavLink></S.NavWrapper>
                    <S.NavWrapper><NavLink to={'/page/1'} >PageTwo</NavLink></S.NavWrapper>
                    <S.NavWrapper><NavLink to={'/page/2'} >PageThree</NavLink></S.NavWrapper>
                    {/*<div><NavLink to={'/page1'} className={({isActive})=>isActive?styles.active : styles.navLink }>PageOne</NavLink></div>*/}
                    <div><a href="/page1">Without routes</a></div>
                </div>
                <div className={styles.content}>
                    <Routes>
                        <Route path={'/'} element={<Navigate to={'/page1'}/>}/>
                        <Route path={'/page/:id'} element={<Page pages={dataState.pages} />}/>

                        {/*<Route path={'/page/:id'} element={<Page/>}/>*/}
                        {/*<Route path={'/page/:id'} element={<Page/>}/>*/}

                        <Route path={'/page/*'} element={<Error404/>}/>
                    </Routes>

                </div>
            </div>
        </div>
    );
};
//
// const NavWrapper = styled.div`
//   margin-left: 10px;
//   font-size: 20px;
//
//   & > a {
//     text-decoration: none;
//     color: #1e3786;
//   }
//
//   & > a.active {
//     text-decoration: none;
//     color: #03eaff;
//   }
//
//   & > a:hover {
//     color: steelblue; /* Цвет ссылки */
//   }
// `
