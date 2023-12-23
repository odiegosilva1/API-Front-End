const charactersList = document.getElementById('charactersList');
const searchInput = document.getElementById('searchInput');
const pagination = document.getElementById('pagination');

let currentPage = 1;
const charactersPerPage = 10;

// Função para buscar e exibir os personagens
async function fetchCharacters(page = 1) {
  const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
  const data = await response.json();
  const characters = data.results;

  displayCharacters(characters);
  displayPagination(data.info);
}

// Função para exibir os personagens na página
function displayCharacters(characters) {
  charactersList.innerHTML = '';
  characters.forEach(character => {
    const characterCard = document.createElement('div');
    characterCard.classList.add('character-card');
    characterCard.innerHTML = `
    <div>
    <img src="${character.image}" alt="${character.name}">
    </div>
    <div>
    <h2>${character.name}</h2>
    <p>Status: ${character.status}</p>
    <p>Species: ${character.species}</p>
    </div>

    `;
    charactersList.appendChild(characterCard);
  });
}

// Função para exibir a paginação
function displayPagination(info) {
  pagination.innerHTML = '';
  const totalPages = info.pages;

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.innerText = i;
    pageButton.addEventListener('click', () => {
      currentPage = i;
      fetchCharacters(i);
    });
    pagination.appendChild(pageButton);
  }
}

// Busca por personagens conforme o texto inserido no input de busca
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const characterCards = charactersList.querySelectorAll('.character-card');

  characterCards.forEach(card => {
    const characterName = card.querySelector('h2').innerText.toLowerCase();
    if (characterName.includes(searchTerm)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});

// Iniciar a página exibindo os personagens
fetchCharacters();
