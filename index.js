const { select, input, checkbox } = require('@inquirer/prompts');

let meta = {
    value: 'Tomar 3 lts de água por dia',
    checked: false
};

let metas = [ meta ];

const listarMetas = async ()=> {
    const respostas = await checkbox({
        message:'use as Setas para mudar de meta, o Espaço para marcar e desmarcar e o Enter para finalizar essa etapa',
        choices: [...metas]
    });

    metas.forEach((m)=> {
        m.checked = false;
    });

    if(respostas.length == 0){
        console.log('Nenhuma meta selecionada');
        return
    }

    respostas.forEach((resposta)=> {
        const meta = metas.find((m)=> {
            return m.value == resposta
        });

        meta.checked = true;
    });

    console.log('Metas marcadas como concluídas com sucesso');
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

const metasRealizadas = async ()=> {
    const realizadas = metas.filter((meta)=>{
        return meta.checked
    })

    if(realizadas.length == 0){
        console.log('Sem metas realizadas');
        return
    }

    await select({
        message: `Metas Realizadas (${realizadas.length})`,
        choices: [...realizadas]
    })
}

const metasAbertas = async ()=> {
    const abertas = metas.filter((meta)=> {
        return meta.checked != true;
    });

    if (abertas.length == 0) {
        console.log('Não existem metas em aberto');
        return
    }

    await select({
        message: `Metas Abertas (${abertas.length})`,
        choices: [...abertas]
    })
}

const deletarMetas = async ()=> {
    const metasDesmarcadas = metas.map((meta)=>{
        return {value: meta.value, checked: false}
    })

    const itemsADeletar = await checkbox({
        message: "Selecione item para deletar",
        choices: [...metasDesmarcadas],
        instructions: false,
    })

    if (itemsADeletar.length == 0) {
        console.log('Nenhum item selecionado para deletar')
        return
    }

    itemsADeletar.forEach((item)=>{
        metas = metas.filter((meta)=> {
            return meta.value != item
        })
    })

    console.log('Metas deletadas com sucesso')
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
                    name: "Metas Abertas",
                    value: "abertas"
                },
                {
                    name: "Metas Realizadas",
                    value: "realizadas"
                },
                {
                    name: "Deletar Metas",
                    value: "deletar"
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
            case "abertas":
                await metasAbertas();
                break
            case "realizadas":
                await metasRealizadas();
                break
            case "deletar":
                await deletarMetas();
                break
            case "sair":
                return
        };
    };
};

start()