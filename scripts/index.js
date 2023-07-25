import { initialCards } from "./cards.js";

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
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const placeInput = document.querySelector(".popup__input_type_place");
const linkInput = document.querySelector(".popup__input_type_link");
const profileName = document.querySelector(".profile-info__title");
const profileJob = document.querySelector(".profile-info__intro");

const container = document.querySelector(".elements__container");
const template = document.querySelector("#element-template").content;

const zoomImage = document.querySelector(".popup__image");
const zoomDescription = document.querySelector(".popup__description");


const card = initialCards;

const profileForm = document.forms["profile-info"];
const cardForm = document.forms["card-form"];

let cardImage;

function fillInputValue() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function openPopup(el) {
  el.classList.add("popup_opened");
}

function closePopup(el) {
  el.classList.remove("popup_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
}
profileForm.addEventListener("submit", handleProfileFormSubmit);

profileInfoEditButton.addEventListener("click", () => {
  openPopup(popupEdit);
  fillInputValue();
});

cardAddButton.addEventListener("click", () => {
  openPopup(popupAdd);
});

buttonClosePopupEdit.addEventListener("click", () => {
  closePopup(popupEdit);
});
buttonClosePopupAdd.addEventListener("click", () => {
  closePopup(popupAdd);
});

function render() {
  card.forEach(renderCard);
}

function renderCard({ name, link }) {
  const li = getCard(name, link);
  container.append(li);
}

render();

function getCard(name, link) {
  const li = createCard(name, link);
  li.querySelector(".element__delete-button").addEventListener(
    "click",
    function () {
      li.remove();
    }
  );
  li.querySelector(".element__like-button").addEventListener(
    "click",
    function (evt) {
      evt.target.classList.toggle("element__like-button_active");
    }
  );
  li.querySelector(".element__image").addEventListener(
    "click",
    togglePopupImage
  );

  return li;
}

function createCard(name, link) {
  const li = template.querySelector(".element").cloneNode(true);
  li.querySelector(".element__title").textContent = name;
  li.querySelector(".element__image").src = link;
  li.querySelector(".element__image").alt = `Фотография: ${name}`;
  return li;
}

function addCardSubmit(evt) {
  evt.preventDefault();
  const newLi = getCard(placeInput.value, linkInput.value);
  container.prepend(newLi);

  closePopup(popupAdd);
}

function togglePopupImage(evt) {
  openPopup(popupImage);
  const image = evt.target;
  const description = image
    .closest(".element")
    .querySelector(".element__title").textContent;
  zoomImage.src = image.src;
  zoomDescription.textContent = description;
}

buttonClosePopupImage.addEventListener("click", () => {
  closePopup(popupImage);
});

cardForm.addEventListener("submit", addCardSubmit);
