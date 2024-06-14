import './pages/index.css'; // импорт главного файла стилей
import { initialCards } from './components/cards.js';
import { createCard, deleteCard, onImageClick } from './components/card.js'
import { openModal, closeModal } from './components/modal.js';

const placesList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button')
const profileAddButton = document.querySelector('.profile__add-button')
const popupTypeEdit = document.querySelector('.popup_type_edit')
const popupsClose = document.querySelectorAll('.popup__close')
const popupTypeNewCard = document.querySelector('.popup_type_new-card')

// Находим форму в DOM
const formElement = document.querySelector('.popup__form');

// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

// Находим форму для добавления карточки
const addCardForm = popupTypeNewCard.querySelector('.popup__form');
// Находим поля формы для добавления карточки
const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = addCardForm.querySelector('.popup__input_type_url');
// Находим контейнер для карточек
const cardsContainer = document.querySelector('.places__list');

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
  evt.preventDefault();

  // Получите значение полей jobInput и nameInput из свойства value
  const newName = nameInput.value;
  const newJob = jobInput.value;

  // Выберите элементы, куда должны быть вставлены значения полей
  const nameElement = document.querySelector('.profile__title');
  const jobElement = document.querySelector('.profile__description');

  // Вставьте новые значения с помощью textContent
  nameElement.textContent = newName;
  jobElement.textContent = newJob;
}

// Прикрепляем обработчик к форме
formElement.addEventListener('submit', handleFormSubmit);


// Обработчик «отправки» формы для добавления карточки
function handleAddCardSubmit(evt) {
  evt.preventDefault();

  // Получите значения полей cardNameInput и cardLinkInput
  const cardName = cardNameInput.value;
  const cardLink = cardLinkInput.value;

  // Создайте новую карточку
  const newCard = createCard({ name: cardName, link: cardLink }, deleteCard);

  // Добавьте карточку в начало контейнера
  cardsContainer.prepend(newCard);

  // Очистите форму
  cardNameInput.value = '';
  cardLinkInput.value = '';
}

// Прикрепляем обработчик к форме для добавления карточки
addCardForm.addEventListener('submit', handleAddCardSubmit);


// Открытие попапа по клику на кнопку
profileEditButton.addEventListener('click', () => openModal(popupTypeEdit));
profileAddButton.addEventListener('click', () => openModal(popupTypeNewCard));

// Закрытие попапа по клику на кнопку закрытия
popupsClose.forEach(button => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup');
    closeModal(popup);
  });
});


// @todo: Вывести карточки на страницу
function showInitialCards() {
    initialCards.forEach((cardData) => {
        placesList.append(createCard(cardData, deleteCard, onImageClick));
    });
}
showInitialCards();


