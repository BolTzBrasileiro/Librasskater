// Inicializa os ícones
lucide.createIcons();

// Menu Mobile
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
const iconMenu = mobileBtn.querySelector('i');


mobileBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    // Troca ícone (se estivesse usando biblioteca completa, aqui é simplificado)
});

// Fecha menu ao clicar em link
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});



// 1. Nossa "Base de Dados" da equipe
const equipe = [
    {
        nome: "Daniel Gonçalves",
        cargo: "Fundador & Skatista",
        descricao: "Skatista amador, modelo e organizador.",
        imagem: "img/Daniel.jpg"
    }
    ,
    {
        nome: "Victor PV",
        cargo: "Categoria Park",
        descricao: "Skatista Surdo.",
        imagem: "img/Victor.jpeg"
    }
    ,
    {
        nome: "Bruno Henrique",
        cargo: "Skatista Surdo",
        descricao: "Comunicador e Palestrante.",
        imagem: "img/Bruno.jpg"
    }
    ,
    {
        nome: "Igor Reis",
        cargo: "Skatista Surdo",
        descricao: "Designer e Informática.",
        imagem: "img/Igor.jpg"
    }
    ,
    {
        nome: "Mateus Requião",
        cargo: "VideoMaker",
        descricao: "Skatista surdo e Comunicador.",
        imagem: "img/Mateus.jpg"
    }
    ,
    {
        nome: "Pedro Henrique",
        cargo: "Skatista Surdo",
        descricao: "Comunicador e Músico.",
        imagem: "img/Pedro.jpeg"
    }
    ,
    {
        nome: "Cris Tadeu",
        cargo: "Fotógrafo",
        descricao: "VideoMaker e Fotógrafo.",
        imagem: "img/Cristian.jpg"
    }
    ,
    {
        nome: "Wagner Morais",
        cargo: "Skatista Surdo",
        descricao: "VideoMaker e Comunicador.",
        imagem: "img/Wagner.jpg"
    }
];

// 2. Selecionamos o contêiner no HTML
const container = document.getElementById('equipe-container');

// 3. Função para gerar o HTML de cada card
const gerarCards = () => {
    let cardsHTML = '';
    let imgHTML = ''
    equipe.forEach(membro => {
        // Usamos crases (`) para criar Template Literals e inserir as variáveis dinamicamente
        // Adicionei classes do Tailwind na imagem para fazer o efeito de aparecer no hover de forma suave
        cardsHTML += `
                <div class="card bg-white p-6 shadow-sm hover:shadow-xl transition-all border-zinc-200 border-l-4 hover:border-roxo group">
                    <div class="flex justify-between items-center">
                        <div class="column">
                            <h3 class="font-bold text-lg text-zinc-900 uppercase">${membro.nome}</h3>
                            <p class="text-xs text-roxo font-bold uppercase mb-2">${membro.cargo}</p>
                            <p class="text-sm text-gray-500">${membro.descricao}</p>
                        </div>
                        <img src="${membro.imagem}" alt="${membro.nome}" class="person-img bg-white rounded-xl ml-4 w-28 h-28 object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"> 

                    </div>
                </div>
            `;
    });

    // 4. Injetamos todo o HTML gerado de uma vez no contêiner
    container.innerHTML = cardsHTML;
};

// 5. Executa a função
gerarCards();





// Função que seria chamada quando o formulário for enviado
async function enviarFormulario(event) {
    



    // Se o botão estiver dentro de uma tag <form>, isso impede a página de piscar/recarregar

    if (event) event.preventDefault();
    // Requirimentos de dados do formulário
    const fnome = document.getElementById('form-nome').value;
    const femail = document.getElementById('form-mail').value;
    const fmensagem = document.getElementById('form-mensagem').value;

    // verificar se o input não está vazia
    if(fnome.trim() !== "" ||femail.trim() !== "" || fmensagem.trim() !== ""){
        const dadosFormulario = {
            nome: fnome,
            email: femail,
            mensagem: fmensagem
        };

        // Seleciona o botão que disparou o evento (ou pelo ID dele)
        const botaoEnviar = event.target.querySelector('button[type="submit"]') || event.target;

        // Desabilita o botão para impedir novos cliques
        botaoEnviar.disabled = true;
        botaoEnviar.innerText = "Enviando...";

        // Enviando para a nossa rota do Node.js
        const resposta = await fetch('/api/enviar-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosFormulario)
        });

        if (resposta.ok) {
            // 1. Muda o texto IMEDIATAMENTE para "Enviado!"
            botaoEnviar.innerText = "Enviado!";

            // Opcional: Você pode mudar a cor do botão para verde aqui, se quiser!
            // botaoEnviar.style.backgroundColor = "green";

            // 2. Cria o cronômetro de 3 segundos (3000 milissegundos)
            setTimeout(() => {
                // Tudo que está aqui dentro só vai acontecer depois de 3 segundos
                botaoEnviar.disabled = false;
                botaoEnviar.innerText = "Enviar";

                // Redireciona a página (se você ainda quiser fazer isso após o delay)
            }, 3000);
        } else {
            alert("Erro ao enviar a mensagem.");
            botaoEnviar.disabled = false;
            botaoEnviar.innerText = "Enviar";
        }
    }else{
                // Seleciona o botão que disparou o evento (ou pelo ID dele)
        const botaoEnviar = event.target.querySelector('button[type="submit"]') || event.target;
            // 1. Muda o texto IMEDIATAMENTE para "Preencha todos campos!!"
            botaoEnviar.disabled = false;
            botaoEnviar.innerText = "Preencha todos campos!";

            // Opcional: Você pode mudar a cor do botão para verde aqui, se quiser!
            // botaoEnviar.style.backgroundColor = "green";

            // 2. Cria o cronômetro de 3 segundos (3000 milissegundos)
            setTimeout(() => {
                // Tudo que está aqui dentro só vai acontecer depois de 3 segundos
                botaoEnviar.disabled = false;
                botaoEnviar.innerText = "Enviar";

                // Redireciona a página (se você ainda quiser fazer isso após o delay)
            }, 3000);
    }
}
