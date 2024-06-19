import "./pages/index.css"; // импорт главного файла стилей
import { initialCards } from "./components/cards.js";
import { createCard, deleteCard, toggleLike } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";

const nameElement = document.querySelector(".profile__title");
const jobElement = document.querySelector(".profile__description");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupsClose = document.querySelectorAll(".popup__close");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
// Находим форму в DOM
const editProfileForm = document.querySelector(".popup__form_type_edit");
// Находим поля формы в DOM
const nameInput = editProfileForm.querySelector(".popup__input_type_name");
const jobInput = editProfileForm.querySelector(
  ".popup__input_type_description"
);
// Находим форму для добавления карточки
const addCardForm = popupTypeNewCard.querySelector(".popup__form");
// Находим поля формы для добавления карточки
const cardNameInput = addCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = addCardForm.querySelector(".popup__input_type_url");
// Попап с картинкой
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const popupTypeImage = document.querySelector(".popup_type_image");
// Находим контейнер для карточек
const cardsContainer = document.querySelector(".places__list");

// Обработчик «отправки» формы
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  // Получаем значение полей jobInput и nameInput из свойства value
  const newName = nameInput.value;
  const newJob = jobInput.value;

  nameElement.textContent = newName;
  jobElement.textContent = newJob;

  // Закрываем попап с помощью функции closeModal
  closeModal(popupTypeEdit);
}

// Прикрепляем обработчик к форме
editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);

// Обработчик «отправки» формы для добавления карточки
function handleAddCardSubmit(evt) {
  evt.preventDefault();

  // Получаем значения полей cardNameInput и cardLinkInput
  const cardName = cardNameInput.value;
  const cardLink = cardLinkInput.value;

  // Создаем новую карточку
  const newCard = createCard(
    { name: cardName, link: cardLink },
    deleteCard,
    onImageClick,
    toggleLike
  );

  // Добавляем карточку в начало контейнера
  cardsContainer.prepend(newCard);

  // Очистка формы с помощью метода reset()
  addCardForm.reset();

  closeModal(popupTypeNewCard);
}

// Прикрепляем обработчик к форме для добавления карточки
addCardForm.addEventListener("submit", handleAddCardSubmit);

// Открытие модального окна
profileEditButton.addEventListener("click", () => {
  // Заполняем инпуты данными из профиля
  const newName = nameInput.value;
  const newJob = jobInput.value;

  nameElement.textContent = newName;
  jobElement.textContent = newJob;

  // Открываем модальное окно с помощью функции openModal
  openModal(popupTypeEdit);
});

profileAddButton.addEventListener("click", () => openModal(popupTypeNewCard));

function onImageClick(cardData) {
  // Открываем попап с картинкой
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;

  openModal(popupTypeImage);
}

// Закрытие попапа по клику на кнопку закрытия
popupsClose.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup");
    closeModal(popup);
  });
});

// @todo: Вывести карточки на страницу
function showInitialCards() {
  initialCards.forEach((cardData) => {
    cardsContainer.append(
      createCard(cardData, deleteCard, onImageClick, toggleLike)
    );
  });
}
showInitialCards();
