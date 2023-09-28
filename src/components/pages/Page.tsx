import React from 'react';
import {PagesType} from '../../data/dataState';
import {useLocation, useParams} from 'react-router-dom';
import {Error404} from './Error404';

type PropsType = {
    pages: PagesType[]
}

export const Page = (props: PropsType) => {
    const params = useParams()
    const currentID = Number(params.id)

    const locale = useLocation()

    return (
        <div>
            {locale.pathname==='/page/0' && <div>SECRET TEXT</div>}
            {props.pages[currentID]
                ?
                <div>
                    <div>
                        {props.pages[currentID].heading}
                    </div>
                    <div>
                        {props.pages[currentID].about}
                    </div>
                </div>
                : <Error404/>
            }

        </div>
    );
};