// Obtém o elemento HTML com o ID 'pokedex'
const pokedex = document.getElementById('pokedex');
const searchButton = document.getElementById('search-btn');
const generationSelect = document.getElementById('generation');

//Faz o carregamento de Pokemons de acordo com o inicio e fim (Por exemplo pokemon do 100 ao 200)
const buscaPokemon = (inicio, fim) => {
    //Cria um Array vazio para salvar os dados que serão puxados depois.
    const promises = [];
    // Loop para gerar URLs para os Pokémon buscados
    for (let i = inicio; i <= fim; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        /* Adiciona uma promessa para buscar cada Pokémon
        * promises é uma matriz (array) onde estão sendo armazenadas todas as promessas geradas pelas solicitações fetch.
        ! O método .push(...) adiciona o novo item (a promessa retornada por fetch e processada por .then()) ao final da matriz promises
        ^ A função fetch é usada para fazer uma solicitação HTTP a um recurso na rede...
        * No caso desta linha, a url representa o endpoint da API do Pokémon que está sendo acessado.
        ! O método .then() é chamado em uma promessa (Promise) para executar um callback quando a promessa for resolvida.
        ^ O argumento do método .then() é uma função que recebe a resposta da solicitação (res).
        * (res) => res.json() é uma função de seta (arrow function) que pega a resposta (res) e chama o método .json() nela. 
        ! Esse método lê a resposta e retorna outra promessa (Promise) que, quando resolvida, contém os dados JSON parseados.
        */
        promises.push(fetch(url).then((res) => res.json()));
    }
    //* Resolve todas as promessas de uma vez
    //! O que faz: 'Promise.all' recebe um array de Promises (promises no caso)...
    //^ e retorna uma única Promise que resolve quando todas as Promises do array forem resolvidas. (Desta forma ela espera)

    //* 'results': O parâmetro results no callback contém um array com os valores resolvidos das Promises originais, que no nosso caso, 
    //! são os dados dos Pokémon retornados pela API.

    //^ const pokemon = results.map((result) => ({ ... })): 
    //* O que faz: Itera(Passa sobre os itens) sobre o array 'results' utilizando o método map para transformar cada elemento (result) do array.
    //! Transformação: Cada result é um objeto com os dados de um Pokémon. O map cria um novo array (pokemon) onde cada objeto tem: nome, imagem, tipo
    Promise.all(promises).then((results) => {
        // Mapeia os resultados para extrair as informações desejadas de cada Pokémon
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id
        }));
        // Chama a função para exibir os Pokémon na página
        displayPokemon(pokemon);
    });
};

// Função para exibir os Pokémon na página
const displayPokemon = (pokemon) => {
    console.log(pokemon);
    // Gera o HTML para cada Pokémon e junta tudo em uma string
    const pokemonHTMLString = pokemon
        .map(
            (poke) => `
        <li class="card ${poke.type}">
            <img class="card-image" src="${poke.image}"/>
            <h2 class="card-title">${poke.id}. ${poke.name}</h2>
            <p class="card-subtitle">Type: <b>${poke.type}</b></p>
        </li>
    `
        )
        .join('');
    // Insere o HTML gerado no elemento 'pokedex'
    pokedex.innerHTML = pokemonHTMLString;
};

// Mapeia as gerações para seus intervalos de ID
const generationMap = {
    '1': [1, 151],
    '2': [152, 251],
    '3': [252, 386],
    '4': [387, 493],
    '5': [494, 649],
    'X': [1, 1015],
    // Se necessário adicionar mais gerações
};


// Adiciona um listener para o botão de busca
searchButton.addEventListener('click', () => {
    const generation = generationSelect.value;
    const [start, end] = generationMap[generation];
    buscaPokemon(start, end);
});

// Chama a função para buscar e exibir os Pokémon da primeira geração inicialmente
buscaPokemon(1, 150);
