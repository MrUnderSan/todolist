import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import {Error404} from '../components/pages/Error404';
import {Page} from '../components/pages/Page';
import { ProtectedPage } from "../components/pages/ProtectedPage";
import {dataState} from '../data/dataState';
import {ProtectedRoute} from './ProtectedRoute';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <Error404/>,
        children: [
            {
                path: "/page/:id",
                element: (
                    <Page pages={dataState.pages}/>
                ),
            },
        ],
    },
    {
        path: "/protected",
        element: (
            <ProtectedRoute>
                <ProtectedPage />
            </ProtectedRoute>

        ),
    },
]);