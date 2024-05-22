// @todo: Получить темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Получить DOM узлы
const placesList = document.querySelector('.places__list');
  
// @todo: Функция создания карточки
function createCard(cardData, onDeleteCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const deleteButton = cardElement.querySelector('.card__delete-button');
    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__title').textContent = cardData.name;
 
    deleteButton.addEventListener('click', () => {
        onDeleteCard(cardElement);
    });

    return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
    cardElement.remove();
}

// @todo: Вывести карточки на страницу
function showInitialCards() {
    initialCards.forEach((cardData) => {
        placesList.append(createCard(cardData, deleteCard));
    });
}

showInitialCards();
