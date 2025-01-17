import React, { useState } from "react";
import axios from "axios";
import { MoveRight } from "lucide-react";

export const CompleteForm = ({ funcionario }) => {
    const [Loading, setLoading] = useState(false);
    const [ProfileImg, setProfileImg] = useState(null);
    const [ImgError, setImagError] = useState(null);

    // Inicializa o estado do formulário com dados do funcionário.
    const [formData, setFormData] = useState({
        nome: funcionario.nome || "",
        nacionalidade: "Angolana", // Você pode mudar isso se necessário
        nascimento: "21/09/2***", // Você pode mudar isso se necessário
        departamento: funcionario.departamento.id || "",
        cargo: funcionario.cargo || "",
        data_entrada: funcionario.data_entrada || "",
        email: funcionario.email || "",
        telefone: funcionario.telefone || "",
        linkedin: funcionario.linkedin || "", // Certifique-se de que esse campo exista
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
        try {
            // Enviar dados para o backend
            await axios.post("/api/employees", formData);
            alert("Perfil atualizado com sucesso!");
            // Fechar a aba ou redirecionar
            window.close(); // Fechar a aba
            // window.location.href = "/nova-pagina"; // Redirecionar para outra página (altere conforme necessário)
        } catch (error) {
            console.error("Houve um erro ao atualizar o perfil!", error);
            alert("Erro ao atualizar perfil.");
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
                        Nacionalidade
                    </span>
                    <input
                        name="nacionalidade"
                        type="text"
                        value={formData.nacionalidade}
                        onChange={onInputChange}
                        placeholder="Nacionalidade"
                        className="dark:bg-gray-700 dark:border-slate-500 w-full py-1 px-1 text-gray-800 outline-none border-2 border-slate-400 rounded focus:border-violet-700"
                    />
                </div>
                <div className="flex items-center justify-between py-2">
                    <span className="text-[16px] text-[#2c384e] w-1/2 dark:text-slate-500">
                        Nascimento
                    </span>
                    <input
                        name="nascimento"
                        type="text"
                        value={formData.nascimento}
                        onChange={onInputChange}
                        placeholder="Data de nascimento"
                        className="dark:bg-gray-700 dark:border-slate-500 w-full py-1 px-1 text-gray-800 outline-none border-2 border-slate-400 rounded focus:border-violet-700"
                    />
                </div>
                <div className="flex items-center justify-between py-2">
                    <span className="text-[16px] text-[#2c384e] w-1/2 dark:text-slate-500">
                        Departamento
                    </span>
                    <select
                        name="departamento"
                        value={formData.departamento}
                        onChange={onInputChange}
                        className="dark:bg-gray-700 dark:border-slate-500 w-full py-1 px-1 text-gray-800 outline-none border-2 border-slate-400 rounded focus:border-violet-700"
                    >
                        <option value="">Selecione o Departamento</option>
                        <option value={funcionario.departamento.id}>
                            {funcionario.departamento.nome}
                        </option>
                    </select>
                </div>
                <div className="flex items-center justify-between py-2">
                    <span className="text-[16px] text-[#2c384e] w-1/2 dark:text-slate-500">
                        Cargo
                    </span>
                    <input
                        name="cargo"
                        type="text"
                        value={formData.cargo}
                        onChange={onInputChange}
                        placeholder="Cargo"
                        className="dark:bg-gray-700 dark:border-slate-500 w-full py-1 px-1 text-gray-800 outline-none border-2 border-slate-400 rounded focus:border-violet-700"
                    />
                </div>
                <div className="flex items-center justify-between py-2">
                    <span className="text-[16px] text-[#2c384e] w-1/2 dark:text-slate-500">
                        Data de Entrada
                    </span>
                    <input
                        name="data_entrada"
                        type="text"
                        value={formData.data_entrada}
                        onChange={onInputChange}
                        placeholder="Data de entrada"
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
                <div className="flex items-center justify-between py-2">
                    <span className="text-[16px] text-[#2c384e] w-1/2 dark:text-slate-500">
                        Telefone
                    </span>
                    <input
                        name="telefone"
                        type="text"
                        value={formData.telefone}
                        onChange={onInputChange}
                        placeholder="Telefone"
                        className="dark:bg-gray-700 dark:border-slate-500 w-full py-1 px-1 text-gray-800 outline-none border-2 border-slate-400 rounded focus:border-violet-700"
                    />
                </div>
                <div className="flex items-center justify-between py-2">
                    <span className="text-[16px] text-[#2c384e] w-1/2 dark:text-slate-500">
                        LinkedIn
                    </span>
                    <input
                        name="linkedin"
                        type="text"
                        value={formData.linkedin}
                        onChange={onInputChange}
                        placeholder="LinkedIn"
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
