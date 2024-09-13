const { select, input, checkbox } = require('@inquirer/prompts');

let meta = {
    value: ' Tomar 3 lts de água por dia',
    checked: false
};

let metas = [ meta ];

const listarMetas = async ()=> {
    const respostas = await checkbox({
        message:'use as Setas para mudar de meta, o Espaço para marcar e desmarcar e o Enter para finalizar essa etapa',
        choices: [...metas]
    });

    if(respostas.length == 0){
        console.log('Nenhuma meta selecionada');
        return
    }

    metas.forEach((m)=> {
        m.checked = false;
    })

    respostas.forEach((resposta)=> {
        const meta = metas.find((m)=> {
            return m.value == resposta
        })

        meta.checked = true;
    })

    console.log('Metas marcadas como concluídas com sucesso')
}

const cadastrarMeta = async ()=> {
    const meta = await input({ message: 'Digite a meta:'});
    
    if (meta.length == 0) {
        console.log('Meta não pode ser vazia');
        return
    }

    metas.push({
        value: meta,
        checked: false
    })
}

const start = async ()=> {
    while(true){
        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar Meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar Metas",
                    value: "listar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        });

        switch(opcao){
            case "cadastrar":
                await cadastrarMeta()
                console.log(metas);
                break
            case "listar":
                await listarMetas();
                break
            case "sair":
                return
        };
    };
};

start()