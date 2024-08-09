import {ClientLayout} from "../layouts";
import {Home} from "../pages/Client";
const routesClient = [
    {
        path: "/home",
        layout: ClientLayout,
        component: Home,
    },
];

export default routesClient;