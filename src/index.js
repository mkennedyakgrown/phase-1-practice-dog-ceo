console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    getDogImages();
    getAllDogs();

    let dropdown = document.getElementById('breed-dropdown');
    let allBreeds = document.createElement('option');
    allBreeds.setAttribute('value', 'all breeds');
    allBreeds.textContent = 'all breeds';
    dropdown.appendChild(allBreeds);
    dropdown.addEventListener('change', sortBreeds);

    document.getElementById('dog-breeds').addEventListener('click', handleBreedClick);
});

function handleBreedClick(selection) {
    const breed = selection.target;
    breed.setAttribute('style', 'color:blue');
}

function sortBreeds(selection) {
    const letter = selection.target.value;
    let list = document.getElementById('dog-breeds').childNodes;
    list.forEach(item => {
        if (item.nodeType === 1) {
            if (item.innerText.slice(0,1) !== letter) {
                item.setAttribute('hidden', 'true');
            } else {
                item.removeAttribute('hidden');
            };
            if (letter === 'all breeds') {
                item.removeAttribute('hidden');
            };
        };
    });
}

function getAllDogs() {
    fetch(breedUrl)
    .then(res => res.json())
    .then(json => json['message'])
    .then(data => Object.keys(data).forEach((item => listBreeds(item))));
};

function listBreeds(breed) {
    let li = document.createElement('li');
    li.innerText = breed;
    document.getElementById('dog-breeds').appendChild(li);
};

function getDogImages() {
    fetch(imgUrl)
    .then(res => res.json())
    .then(data => data['message'])
    .then(data => data.forEach(image => renderOneImage(image)));
};

function renderOneImage(image) {
    let dogImage = document.createElement('p');
    dogImage.innerHTML = `<img src=${image}>`;
    document.getElementById('dog-image-container').appendChild(dogImage);
};