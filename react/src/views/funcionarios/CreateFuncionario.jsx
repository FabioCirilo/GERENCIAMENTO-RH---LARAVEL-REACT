import { TEInput } from "tw-elements-react";
import axiosClient from "../../axios-client";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Ban } from "lucide-react";
import SuccessComponent from "../../components/SuccessComponent";
import ErrorComponent from "../../components/ErrorComponent";

export default function CreateFuncionario() {
    const [departamentos, setDepartamentos] = useState([]);
    const [Loading, setLoading] = useState(false);
    const [Erros, setErros] = useState(null);
    const [NetworkError, setNetworkError] = useState(null);
    const [created, setCreacted] = useState(false);
    const nomeREF = useRef();
    const salarioREF = useRef();
    const departamentoREF = useRef();
    const emailREF = useRef();
    const telefoneREF = useRef();
    const cargoREF = useRef();
    const entradaREF = useRef();
    const imageREF = useRef();
    const navigate = useNavigate();

    const NovoFuncionario = (ev) => {
        ev.preventDefault();
        setLoading(true);

        const file = imageREF.current.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64data = reader.result.split(",")[1]; // Pega o código base64

                const payload = {
                    nome: nomeREF.current.value,
                    salario: salarioREF.current.value,
                    id_departamento: departamentoREF.current.value,
                    email: emailREF.current.value,
                    telefone: telefoneREF.current.value,
                    cargo: cargoREF.current.value,
                    data_entrada: entradaREF.current.value,
                    image: base64data, // Adiciona a imagem codificada em base64
                };

                axiosClient
                    .post("/funcionarios", payload)
                    .then((data) => {
                        navigate("/funcionarios");
                        console.log(data);
                        setLoading(false);
                    })
                    .catch((data) => {
                        const response = data.response;

                        if (response && response.status === 500) {
                            setErros(
                                "Falha no servidor, tente recarregar a página"
                            );
                        }
                        if (response && response.status === 422) {
                            setErros(response.data.errors);
                        }
                        if (data.code === "ERR_NETWORK") {
                            console.log("NETWORK ERROR");
                            setNetworkError(
                                "Falha na conexão com o servidor - verifique a internet!"
                            );
                        }

                        setLoading(false);
                    });
            };

            reader.readAsDataURL(file); // Converte o arquivo para base64
        }
    };

    useEffect(() => {
        axiosClient
            .get("/departmentos")
            .then(({ data }) => {
                console.log(data);
                setDepartamentos(data.data);
            })
            .catch((Erroor) => {
                const err = Erroor.response;
                console.log(err);
            });
    }, []);

    return (
        <div className="py-4 px-8">
            <h1 className="text-gray-500 text-[30px] font-light py-4 dark:text-white capitalize">
                Novo funcionário{" "}
            </h1>

            {Erros && (
                <div className="py-7">
                    {Object.keys(Erros).map((keys) => (
                        <p className="bg-red-500 py-2 my-2 px-1 flex items-center gap-2 rounded text-slate-50">
                            <Ban className="w-[16px]" />
                            <span>{Erros[keys][0]}</span>
                        </p>
                    ))}
                </div>
            )}
            {NetworkError && <ErrorComponent errors={NetworkError} />}
            {created && (
                <SuccessComponent mensagem="Funcionario criado com sucesso" />
            )}

            <form className="flex flex-col gap-7">
                <div className="flex gap-1 items-center">
                    <div className="w-1/2">
                        <TEInput
                            type="text"
                            id="exampleFormControlInput1"
                            label="Nome Completo"
                            ref={nomeREF}
                            required
                        ></TEInput>
                    </div>
                    <div className="w-1/2">
                        <TEInput
                            type="text"
                            id="exampleFormControlInput1"
                            label="Cargo na empresa"
                            ref={cargoREF}
                            required
                        ></TEInput>
                    </div>
                </div>

                <div className="flex gap-1 items-center">
                    <div className="w-1/2">
                        <TEInput
                            type="number"
                            id="exampleFormControlInput1"
                            label="Salário"
                            ref={salarioREF}
                            required
                        ></TEInput>
                    </div>
                    <div className="w-1/2">
                        <select
                            ref={departamentoREF}
                            data-te-select-init
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary motion-reduce:transition-none placeholder:opacity-0 disabled:bg-neutral-100 read-only:bg-neutral-100 dark:disabled:bg-neutral-700 dark:read-only:bg-neutral-700 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary px-3 py-[0.32rem] leading-[1.6]"
                        >
                            <option value={0}>Selecione o departamento</option>
                            {departamentos.map((departamen) => (
                                <option
                                    value={departamen.id}
                                    key={departamen.id}
                                >
                                    {departamen.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex gap-1 items-center">
                    <div className="w-1/2">
                        <TEInput
                            type="email"
                            id="exampleFormControlInput1"
                            label="Email do funcionário"
                            ref={emailREF}
                            required
                        ></TEInput>
                    </div>
                    <div className="w-1/2">
                        <TEInput
                            type="number"
                            id="exampleFormControlInput1"
                            label="Telefone do funcionário"
                            ref={telefoneREF}
                            required
                        ></TEInput>
                    </div>
                </div>
                <div className="flex gap-1 items-center">
                    <div className="w-1/2">
                        <TEInput
                            type="date"
                            id="exampleFormControlInputHelper"
                            ref={entradaREF}
                            required
                        ></TEInput>
                        <div className="absolute t-0 w-full text-sm text-neutral-500 peer-focus:text-primary dark:text-neutral-200 dark:peer-focus:text-primary">
                            Entrada na empresa
                        </div>
                    </div>
                </div>
                <div className="flex gap-1 items-center">
                    <div className="w-1/2">
                        <input
                            type="file"
                            ref={imageREF}
                            accept="image/*"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="Select Image"
                        />
                    </div>
                </div>

                <div className="py-8">
                    <button
                        onClick={NovoFuncionario}
                        className="rounded shadow text-white bg-violet-700 py-2 px-4 w-[170px]"
                    >
                        {Loading ? "carregendo..." : "Cadastrar"}
                    </button>
                </div>
            </form>
        </div>
    );
}
