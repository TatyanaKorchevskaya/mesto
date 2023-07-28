import { initialCards } from "./cards.js";

const profileInfoEditButton = document.querySelector(
  ".profile-info__edit-button"
);
const cardAddButton = document.querySelector(".profile__add-button");

const popupEdit = document.querySelector(".popup_edit_profile");
const popupAdd = document.querySelector(".popup_add_element");
const popupImage = document.querySelector(".popup_image_active");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const placeInput = document.querySelector(".popup__input_type_place");
const linkInput = document.querySelector(".popup__input_type_link");
const profileName = document.querySelector(".profile-info__title");
const profileJob = document.querySelector(".profile-info__intro");
const closeButtons = document.querySelectorAll('.popup__close');

const container = document.querySelector(".elements__container");
const template = document.querySelector("#element-template").content;

const zoomImage = document.querySelector(".popup__image");
const zoomDescription = document.querySelector(".popup__description");

const card = initialCards;

const profileForm = document.forms["profile-info"];
const cardForm = document.forms["card-form"];

let cardImage;

function fillProfileInputs() {
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
  fillProfileInputs();
});

cardAddButton.addEventListener("click", () => {
  openPopup(popupAdd);
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
  const elementTitle = li.querySelector(".element__title");
  const elementImage = li.querySelector(".element__image");
  elementTitle.textContent = name;
  elementImage.src = link;
  elementImage.alt = `Фотография: ${name}`;
  return li;
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const newLi = getCard(placeInput.value, linkInput.value);
  container.prepend(newLi);
  evt.target.reset()
  closePopup(popupAdd);
}

function togglePopupImage(evt) {
  openPopup(popupImage);
  const image = evt.target;
  const description = image
    .closest(".element")
    .querySelector(".element__title").textContent;
  zoomDescription.textContent = description;
  zoomImage.src = image.src;
  zoomImage.alt = `Фотография: ${description}`;
}

cardForm.addEventListener("submit", handleCardFormSubmit);

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
   button.addEventListener('click', () => closePopup(popup));
});
