import {
    Users2,
    Building2,
    Blocks,
    Landmark,
    Wrench,
    Info,
    LogOut,
    TimerIcon,
    TimerReset,
    Palette,
    Sun,
    Moon,
} from "lucide-react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

import axiosClient from "../axios-client";
import { useEffect, useState } from "react";

export default function DefaultLayout() {
    const { user, token, setUser, setToken } = useStateContext();
    const initialDarkMode = localStorage.getItem("tema") === "dark";
    const [darkMode, setDarkMode] = useState(initialDarkMode);
    const [userImage, setUserImage] = useState(null);

    useEffect(() => {
        if (token) {
            axiosClient
                .get("/user")
                .then(({ data }) => {
                    setUser(data);
                    return axiosClient.get("/user/image");
                })
                .then(({ data }) => {
                    setUserImage(data.imageURL);
                })
                .catch((error) => {
                    console.log("Erro ao buscar dados de usuario:", error);
                });
        }
    }, [token]);
    if (!token) {
        return <Navigate to="/login" />;
    }

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem("tema", newMode ? "dark" : "light");

        // Adicione ou remova a classe 'dark' do corpo do documento
        if (newMode) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    };

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark");
            localStorage.setItem("tema", "dark");
        } else {
            document.body.classList.remove("dark");
            localStorage.setItem("tema", "light");
        }
    }, [darkMode]);

    if (!token) {
        return <Navigate to="/login" />;
    }

    const onLogout = (ev) => {
        ev.preventDefault();
        axiosClient.post("/logout").then(({ data }) => {
            setToken(null);
            setUser({});
        });
    };

    useEffect(() => {
        axiosClient
            .get("/user")
            .then(({ data }) => {
                setUser(data);
            })
            .catch((reason) => {
                console.log("razão " + reason);
                const err = reason.response;
                if (err && err.status === 401) {
                    setToken(null);
                }
            });
    }, []);
    // O array vazio como segundo argumento faz com que o efeito só seja executado após a montagem inicial do componente

    return (
        <div className="flex defaultLayout dark:bg-gray-900">
            <aside className="h-screen w-[240px] p-4 bg-[#5b08a7] dark:bg-gray-800">
                <div className="h-full pb-4 divide-y divide-slate-400 overflow-y-auto">
                    <div className="flex py-4 items-center justify-center text-white font-body">
                        <span className="text-lg text-center">
                            RH MANAGEMENT{" "}
                        </span>
                    </div>
                    <ul className="space-y-2 font-medium">
                        <Link to="/dashboard">
                            <li className="mt-4">
                                <span className="flex items-center p-2 text-white hover:text-gray-500 dark:hover:text-white rounded-lg dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg
                                        className="w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 22 21"
                                    >
                                        <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                        <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                    </svg>
                                    <span className="ml-3">Dashboard</span>
                                </span>
                            </li>
                        </Link>
                        <Link to="/funcionarios">
                            <li>
                                <span className="flex items-center p-2 text-white hover:text-gray-500 dark:hover:text-white rounded-lg dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <Users2 className="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                    <span className="flex-1 ml-3 whitespace-nowrap">
                                        Funcionários
                                    </span>
                                </span>
                            </li>
                        </Link>
                        <Link to="/users">
                            <li>
                                <span className="flex items-center p-2 text-white hover:text-gray-500 dark:hover:text-white rounded-lg dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <Users2 className="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                    <span className="flex-1 ml-3 whitespace-nowrap">
                                        Usuários
                                    </span>
                                </span>
                            </li>
                        </Link>
                        <Link to="/departamentos">
                            <li>
                                <span className="flex items-center p-2 text-white hover:text-gray-500 dark:hover:text-white rounded-lg dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <Blocks className="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />

                                    <span className="flex-1 ml-3 whitespace-nowrap">
                                        Departamentos
                                    </span>
                                </span>
                            </li>
                        </Link>
                        <Link to="/departamentos">
                            <li>
                                <span className="flex items-center p-2 text-white hover:text-gray-500 dark:hover:text-white rounded-lg dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <Landmark className="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />

                                    <span className="flex-1 ml-3 whitespace-nowrap">
                                        Finanças
                                    </span>
                                    <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                                        +2
                                    </span>
                                </span>
                            </li>
                        </Link>
                        <Link to="/pontos">
                            <li>
                                <span className="flex items-center p-2 text-white  hover:text-gray-500 dark:text-slate-300 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <TimerReset className="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                    <span className="flex-1 ml-3 whitespace-nowrap">
                                        Registros de ponto
                                    </span>
                                </span>
                            </li>
                        </Link>
                    </ul>
                    <br />
                    <ul className="space-y-2 font-medium">
                        <li
                            onClick={toggleDarkMode}
                            className="mt-4 cursor-pointer"
                        >
                            <span className="flex items-center p-2 text-white hover:text-gray-500 dark:hover:text-white rounded-lg dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <Palette className="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <span className="flex-1 ml-3 whitespace-nowrap">
                                    Alterar tema:
                                </span>
                                {!darkMode && (
                                    <Sun className="flex-shrink-0 w-5 h-5 text-white dark:text-slate-300 transition duration-75  group-hover:text-gray-900 dark:group-hover:text-white" />
                                )}
                                {darkMode && (
                                    <Moon className="flex-shrink-0 w-5 h-5 text-white dark:text-slate-300 transition duration-75  group-hover:text-gray-900 dark:group-hover:text-white" />
                                )}
                            </span>
                        </li>
                        <Link to="/">
                            <li>
                                <span className="flex items-center p-2 text-white dark:text-slate-300 hover:text-gray-500 dark:hover:text-white rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <Wrench className="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                    <span className="flex-1 ml-3 whitespace-nowrap">
                                        Configurações
                                    </span>
                                </span>
                            </li>
                        </Link>
                        <li>
                            <span className="flex items-center p-2 text-white hover:text-gray-500 dark:hover:text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <Info className="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />

                                <span className="flex-1 ml-3 whitespace-nowrap dark:text-slate-300">
                                    Sistema
                                </span>
                            </span>
                        </li>
                        <li onClick={onLogout} className="cursor-pointer">
                            <span className="flex items-center p-2 text-white dark:text-slate-300 hover:text-gray-500 dark:hover:text-white rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <LogOut className="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <span className="flex-1 ml-3 whitespace-nowrap">
                                    Terminar Sessão
                                </span>
                            </span>
                        </li>
                    </ul>
                </div>
            </aside>

            <main className=" flex-1">
                <nav className="w-full">
                    <ul className="flex gap-4 items-center justify-end bg-white dark:bg-gray-700 shadow-md py-4 px-8">
                        <li>
                            <Link
                                to="/User/:id"
                                className="flex items-center gap-2"
                            >
                                <span className="text-slate-900 dark:text-slate-300">
                                    {user.firstName} <br />
                                </span>
                                <div className="relative">
                                    {userImage && (
                                        <img
                                            className="w-10 h-10 rounded-full"
                                            src={userImage}
                                            alt="User Avatar"
                                        />
                                    )}
                                    <span className="top-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <Outlet />
            </main>
        </div>
    );
}
