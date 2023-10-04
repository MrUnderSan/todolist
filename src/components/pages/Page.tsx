import React from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {PagesType} from "./../../data/dataState";
import {Error404} from "./Error404";

type PropsType = {
    pages: PagesType[]
}

export const Page: React.FC<PropsType> = ({pages}) => {
    const params = useParams()
    const locale=useLocation()
    console.log(locale.pathname)

    const navigate = useNavigate()

    const backHandler = () => {
        navigate(-1)
    }
    const mainHandler = () => {
        navigate('/page/0')
    }

    return (
        <>
            {locale.pathname==='/page/0'&& <div>SECRET TEXT</div>}
            {pages[Number(params.id)]
                ? <div>
                    <div>
                        {pages[Number(params.id)].heading}
                    </div>
                    <div>
                        {pages[Number(params.id)].about}
                    </div>
                </div>
                : <Error404/>
            }
            <button onClick={backHandler}>back</button>
            <button onClick={mainHandler}>main page</button>
        </>
    );
};

