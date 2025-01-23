import { useEffect, useState } from "react";
import Cards from "../../components/dashboard/Cards.jsx";
import axiosClient from "../../axios-client";
import { Link } from "react-router-dom";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        getUsers();
    }, []);

    const onDelete = (user) => {
        if (
            !window.confirm(
                "Are you sure want to delete " + user.firstName + "?"
            )
        ) {
            return;
        }

        axiosClient
            .delete(`/users/${user.id}`)
            .then((data) => {
                console.log(data);
                getUsers();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getUsers = () => {
        setLoading(true);

        axiosClient
            .get("/users")
            .then(({ data }) => {
                console.log(data);
                setUsers(data.data);
                setTotal(data.meta.total);
                setLoading(false);
            })
            .catch((data) => {
                const err = data.response;
                console.log(data);
                if (err && err.status === 404) {
                    console.log(404);
                    setErrors(
                        "Não foi possível carregar os usuários!",
                        err.message
                    );
                }
                if (data.code === "ERR_NETWORK") {
                    console.log("NETWORK ERROR");
                    setErrors(
                        "Falha na conexão com o servidor - verifique a internet!"
                    );
                }
                setLoading(false);
            });
    };

    return (
        <div className="py-4 px-8">
            <div className="flex justify-between items-center">
                <h1 className="text-gray-500 text-[30px] font-light py-4 dark:text-white">
                    Listagem de Usuários{" "}
                    <span className="text-gray-400 text-base"> ({total})</span>
                </h1>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left  text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 bg-gray-200 uppercase  dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-4 py-3">
                                First Name
                            </th>
                            <th scope="col" className="px-4 py-3">
                                Last Name
                            </th>
                            <th scope="col" className="px-4 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-4 py-3"></th>
                        </tr>
                    </thead>

                    {loading && (
                        <tbody>
                            <tr>
                                <td
                                    colSpan="6"
                                    className="text-center py-4 text-base italic"
                                >
                                    processando...
                                </td>
                            </tr>
                        </tbody>
                    )}
                    {errors && (
                        <tbody>
                            <tr>
                                <td
                                    colSpan="6"
                                    className="text-center py-4 text-base italic"
                                >
                                    {errors}
                                </td>
                            </tr>
                        </tbody>
                    )}
                    {!loading && (
                        <tbody>
                            {users.map((user) => (
                                <tr
                                    key={user.id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                >
                                    <td className="px-6 py-4 hover:underline cursor-pointer">
                                        {user.firstName}
                                    </td>
                                    <td className="px-3 py-4">
                                        {user.lastName}
                                    </td>
                                    <td className="px-3 py-4">{user.email}</td>
                                    <td className="px-6 py-4 flex gap-2">
                                        <Link
                                            to={`/user/${user.id}`}
                                            className="font-medium text-white p-2  bg-blue-600 dark:text-white hover:underline"
                                        >
                                            <span>ver</span>
                                        </Link>
                                        <button
                                            onClick={(ev) => onDelete(user)}
                                            className="font-medium text-white p-2  bg-red-600 dark:text-white hover:underline"
                                        >
                                            <span>delete</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}
