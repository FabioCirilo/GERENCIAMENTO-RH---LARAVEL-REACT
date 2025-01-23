import React, { useState } from "react";
import axios from "axios";
import { MoveRight } from "lucide-react";

export const CompleteForm = ({ user }) => {
    const [Loading, setLoading] = useState(false);
    const [ProfileImg, setProfileImg] = useState(null);
    const [ImgError, setImagError] = useState(null);

    // Inicializa o estado do formulário com dados do funcionário.
    const [formData, setFormData] = useState({
        nome: user.firstName || "",
        sobrenome: user.lastName || "",
        email: user.email || "",
    });

    const setProfileIMG = (event) => {
        const uploadedImage = event.target.files[0];
        if (uploadedImage) {
            if (
                uploadedImage.type === "image/png" ||
                uploadedImage.type === "image/jpeg" ||
                uploadedImage.type === "image/jpg"
            ) {
                const imageURL = URL.createObjectURL(uploadedImage);
                setProfileImg(imageURL);
                setImagError(null);
            } else {
                setImagError("Formato não suportado..!");
            }
        }
    };

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = async (ev) => {
        ev.preventDefault();
        setLoading(true);
        const funcionarioId = 1; // Supondo que 1 é o ID do funcionário; substitua conforme necessário
        const url = `http://localhost:8000/api/users/${userId}`; // URL correta para atualizar

        try {
            // Necessita de Headers, como o token de autenticação, se autenticado pela API
            await axios.put(url, formData, {
                headers: {
                    // Autenticação se for necessário, substitua `yourAuthToken` pelo token real
                    Authorization: "Bearer $token",
                    "Content-Type": "application/json",
                },
            });
            alert("Perfil atualizado com sucesso!");
            window.close();
        } catch (error) {
            console.error(
                "Erro ao atualizar perfil:",
                error.response || error.message
            );
            if (error.response) {
                alert(
                    `Erro ao atualizar perfil: ${
                        error.response.data.message || "Erro desconhecido"
                    }`
                );
            } else if (error.request) {
                alert(
                    "Erro ao atualizar perfil: Nenhuma resposta do servidor."
                );
            } else {
                alert("Erro ao atualizar perfil: Configuração incorreta.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <form className="py-4" onSubmit={onSubmit}>
                <div className="flex items-center justify-between py-2">
                    <span className="text-[16px] text-[#2c384e] w-1/2 dark:text-slate-500">
                        Nome Completo
                    </span>
                    <input
                        name="nome"
                        type="text"
                        value={formData.nome}
                        onChange={onInputChange}
                        placeholder="Nome completo"
                        className="dark:bg-gray-700 dark:border-slate-500 w-full py-1 px-1 text-gray-800 outline-none border-2 border-slate-400 rounded focus:border-violet-700"
                    />
                </div>
                <div className="flex items-center justify-between py-2">
                    <span className="text-[16px] text-[#2c384e] w-1/2 dark:text-slate-500">
                        Sobrenome
                    </span>
                    <input
                        name="nacionalidade"
                        type="text"
                        value={formData.sobrenome}
                        onChange={onInputChange}
                        placeholder="Sobrenome"
                        className="dark:bg-gray-700 dark:border-slate-500 w-full py-1 px-1 text-gray-800 outline-none border-2 border-slate-400 rounded focus:border-violet-700"
                    />
                </div>
                <div className="flex items-center justify-between py-2">
                    <span className="text-[16px] text-[#2c384e] w-1/2 dark:text-slate-500">
                        Email
                    </span>
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={onInputChange}
                        placeholder="Email"
                        className="dark:bg-gray-700 dark:border-slate-500 w-full py-1 px-1 text-gray-800 outline-none border-2 border-slate-400 rounded focus:border-violet-700"
                    />
                </div>
                <button
                    className="rounded shadow text-white bg-violet-700 mt-2 py-2 px-4 w-[170px]"
                    type="submit"
                >
                    {Loading ? "Carregando..." : "Salvar alterações"}
                </button>
            </form>
        </div>
    );
};
