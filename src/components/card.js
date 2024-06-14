import { openModal } from './modal.js';

export function createCard(cardData, onDeleteCard, onImageClick) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    
    
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const cardImage = cardElement.querySelector('.card__image');
    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__image').alt = cardData.name;
    cardElement.querySelector('.card__title').textContent = cardData.name;
    
    deleteButton.addEventListener('click', () => {
        onDeleteCard(cardElement);
    });
    
    likeButton.addEventListener('click', () => {
        // Переключаем класс для изменения цвета
        likeButton.classList.toggle('card__like-button_is-active'); 
    });

    cardImage.addEventListener('click', () => {
        onImageClick(cardData); // Вызываем обработчик клика по изображению
      });
    
    return cardElement;
    }
    
    // @todo: Функция удаления карточки
    export function deleteCard(cardElement) {
    cardElement.remove();
    }
    
    export function onImageClick(cardData) {
        // Открываем попап с картинкой
        const popupImage = document.querySelector('.popup__image');
        const popupCaption = document.querySelector('.popup__caption');
        const popupTypeImage = document.querySelector('.popup_type_image');
      
        popupImage.src = cardData.link;
        popupImage.alt = cardData.name;
        popupCaption.textContent = cardData.name;
      
        openModal(popupTypeImage);
      }
