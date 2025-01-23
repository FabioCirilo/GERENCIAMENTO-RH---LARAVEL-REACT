export const Resume = ({ user }) => {
    return (
        <div className="p-4">
            <div className="py-4">
                <h5 className="text-[18px] text-primary dark:text-slate-300">
                    Sobre {user.firstName} {user.lastName}
                </h5>
                <span className="text-[15px] text-[#2c384e] dark:text-slate-500 italic py-4">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Quaerat ullam, odio vitae sequi, soluta laudantium mollitia
                    qui accusantium deleniti magnam reprehenderit illo voluptate
                    perspiciatis possimus esse nesciunt, tempora totam illum.
                </span>
            </div>

            <div className="py-4">
                <h5 className="text-[18px] text-primary dark:text-slate-300">
                    Dados Pessoais
                </h5>
                <div className="flex gap-20 py-4">
                    <span className="text-[16px] dark:text-slate-500 text-[#2c384e] w-1/2">
                        Nome
                    </span>
                    <div className="flex w-full">
                        <span className="text-gray-600">{user.nome}</span>
                    </div>
                </div>
                <div className="flex gap-20 py-4">
                    <span className="text-[16px] dark:text-slate-500 text-[#2c384e] w-1/2">
                        Sobrenome
                    </span>
                    <div className="flex w-full">
                        <span className="text-gray-600">Angolana</span>
                    </div>
                </div>
                <div className="flex gap-20 py-4">
                    <span className="text-[16px] dark:text-slate-500 text-[#2c384e] w-1/2">
                        Email
                    </span>
                    <div className="flex w-full">
                        <span className="text-gray-600">12/12/2023</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
