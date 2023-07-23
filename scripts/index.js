const profileInfoEditButton = document.querySelector(
  ".profile-info__edit-button"
);
const cardAddButton = document.querySelector(".profile__add-button");

const popupEdit = document.querySelector(".popup_edit_profile");
const popupAdd = document.querySelector(".popup_add_element");
const popupImage = document.querySelector(".popup_image_active");
const buttonClosePopupEdit = popupEdit.querySelector(".popup__close");
const buttonClosePopupAdd = popupAdd.querySelector(".popup__close");
const buttonClosePopupImage = popupImage.querySelector(".popup__close");
const formElement = document.querySelectorAll(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const placeInput = document.querySelector(".popup__input_type_place");
const linkInput = document.querySelector(".popup__input_type_link");
const profileName = document.querySelector(".profile-info__title");
const profileJob = document.querySelector(".profile-info__intro");

let cardImage;

const elements = document.querySelector(".elements");

function togglePopupEdit() {
  popupEdit.classList.toggle("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function togglePopupAdd() {
  popupAdd.classList.toggle("popup_opened");
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}
formElement.forEach((element) => {
  element.addEventListener("submit", handleFormSubmit);
});

profileInfoEditButton.addEventListener("click", togglePopupEdit);
cardAddButton.addEventListener("click", togglePopupAdd);

buttonClosePopupEdit.addEventListener("click", closePopup);
buttonClosePopupAdd.addEventListener("click", closePopup);

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const container = document.querySelector(".elements__container");
const template = document.querySelector("#element-template").content;

const card = initialCards.map(function (item) {
  return {
    name: item.name,
    link: item.link,
  };
});

function render() {
  card.forEach(renderCard);
  findCardImage();
}

function findCardImage() {
  cardImage = document.querySelectorAll(".element__image");
}

function renderCard({ name, link }) {
  const li = template.querySelector(".element").cloneNode(true);
  li.querySelector(".element__title").textContent = name;
  li.querySelector(".element__image").src = link;
  li.querySelector(".element__like-button").addEventListener(
    "click",
    function (evt) {
      evt.target.classList.toggle("element__like-button_active");
    }
  );
  container.append(li);
  li.querySelector(".element__delete-button").addEventListener(
    "click",
    function () {
      li.remove();
    }
  );
}

render();

function createCard(name, link) {
  const li = template.querySelector(".element").cloneNode(true);
  li.querySelector(".element__title").textContent = name;
  li.querySelector(".element__image").src = link;
  return li;
}

function addCardSubmit(evt) {
  evt.preventDefault();
   const newLi = createCard(placeInput.value, linkInput.value);
  container.prepend(newLi);
  newLi
    .querySelector(".element__delete-button")
    .addEventListener("click", function () {
      newLi.remove();
    });
  newLi
    .querySelector(".element__like-button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__like-button_active");
    });
  findCardImage();
  updateCardImageEvent();
  closePopup();
}

function togglePopupImage(evt) {
  popupImage.classList.toggle("popup_opened");
  const image = evt.target;
  const description =
    image.parentElement.querySelector(".element__title").textContent;
  document.querySelector(".popup__image").src = image.src;
  document.querySelector(".popup__description").textContent = description;
}

function closePopup() {
  popupEdit.classList.remove("popup_opened");
  popupAdd.classList.remove("popup_opened");
  popupImage.classList.remove("popup_opened");
}

function updateCardImageEvent() {
  cardImage.forEach((image) => {
    image.addEventListener("click", togglePopupImage);
  });
}
updateCardImageEvent();

buttonClosePopupImage.addEventListener("click", closePopup);

document.querySelector(".popup__form_create").addEventListener("submit", addCardSubmit);
