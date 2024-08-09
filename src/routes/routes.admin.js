import {HomeAdmin, Routers, Switches, Sites, SearchMac, BGP, NWAScript, SWScript, UserAdmin, ScriptList, Folders } from '../pages/Admin';
import {AdminLayout} from "../layouts";

const routesAdmin = [
    {
        path: "/admin",
        layout: AdminLayout,
        component: HomeAdmin,
    },
    {
        path: "/admin/users",
        layout: AdminLayout,
        component: UserAdmin,
    },
    {
        path: "/admin/folder-list",
        layout: AdminLayout,
        component: Folders,
        exact: true
    },
    {
        path: "/admin/script-list",
        layout: AdminLayout,
        component: ScriptList,
        exact: true
    },
    {
        path: "/admin/bgp",
        layout: AdminLayout,
        component: BGP,
    },
    {
        path: "/admin/nwa-scripts",
        layout: AdminLayout,
        component: NWAScript,
    },
    {
        path: "/admin/sw-scripts",
        layout: AdminLayout,
        component: SWScript,
    },
    {
        path: "/admin/routers",
        layout: AdminLayout,
        component: Routers,
    },
    {
        path: "/admin/switches",
        layout: AdminLayout,
        component: Switches,
    },
    {
        path: "/admin/sites",
        layout: AdminLayout,
        component: Sites,
    },
    {
        path: "/admin/search",
        layout: AdminLayout,
        component: SearchMac,
    },
];

export default routesAdmin;