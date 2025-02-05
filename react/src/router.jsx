import { createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/signup";
import Funcionarios from "./views/funcionarios/Funcionarios";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/dashboard";
import CreateFuncionario from "./views/funcionarios/CreateFuncionario";
import FuncionarioPerfil from "./views/funcionarios/FuncionarioPerfil";
import Departamentos from "./views/departamentos/departamentos";
import DepartamentoFuncionarios from "./views/departamentos/DepartamentoFuncionarios";
import FormDepartamento from "./views/departamentos/FormDepartamento";
import NOtFund from "./components/NOtFund";
import Pontos from "./views/ponto/pontos";
import Users from "./views/User/users";
import UsersPerfil from "./views/User/perfil";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Dashboard />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/funcionarios",
                element: <Funcionarios />,
            },
            {
                path: "/users",
                element: <Users />,
            },
            {
                path: "/User/:id",
                element: <UsersPerfil />,
            },
            {
                path: "/funcionario/novo",
                element: <CreateFuncionario />,
            },
            {
                path: "/funcionario/:id",
                element: <FuncionarioPerfil />,
            },
            {
                path: "/departamentos",
                element: <Departamentos />,
            },
            {
                path: "/departamento/:id",
                element: <DepartamentoFuncionarios />,
            },
            {
                path: "/departamentos/novo",
                element: <FormDepartamento />,
            },

            {
                path: "/departamentos/atualizar/:id",
                element: <FormDepartamento />,
            },
            {
                path: "/pontos",
                element: <Pontos />,
            },
            {
                path: "*",
                element: <NOtFund />,
            },
        ],
    },

    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
        ],
    },
]);

export default router;
