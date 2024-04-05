import { Dashboard , EditBlog ,AllAnnouncements, AllOrders, AllBlogs ,AllContacts, AddBlogs, Blog} from "../pages";
import React from "react";
import Protected from "../protected/Protected";

const semiRoutes = [
    {
        path: "",
        element :<Protected> <Dashboard/></Protected>,
    },
    {
        path: "/admin/announcement",
        element : <Protected><AllAnnouncements/></Protected>
    },
    {
        path: "/admin/orders",
        element : <Protected><AllOrders/></Protected>
    },
    {
        path: "/admin/blogs",
        element : <Protected><AllBlogs/></Protected>
    },
    {
        path: '/admin/contact',
        element: <Protected><AllContacts/></Protected>
    },
    {
        path: '/admin/add-blog',
        element: <Protected><AddBlogs/></Protected>
    },
    {
        path: `/admin/post/:slug`,
        element: <Protected><Blog/></Protected>
    },
    {
        path: `/admin/edit/blog/:id`,
        element: <Protected> <EditBlog/> </Protected>
    }

]

export default semiRoutes;