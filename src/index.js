document.addEventListener('DOMContentLoaded', function() {
  // Challenge 1: Fetch and display random dog images
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
  const dogImageContainer = document.getElementById('dog-image-container');

  fetch(imgUrl)
    .then(response => response.json())
    .then(data => {
      data.message.forEach(imageUrl => {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Random dog image';
        img.style.width = '200px'; // Added for better display
        img.style.margin = '10px';
        dogImageContainer.appendChild(img);
      });
    })
    .catch(error => console.error('Error fetching images:', error));

  // Challenge 2: Fetch and display dog breeds
  const breedUrl = "https://dog.ceo/api/breeds/list/all";
  const dogBreedsList = document.getElementById('dog-breeds');
  let allBreeds = []; // Store all breeds for filtering

  fetch(breedUrl)
    .then(response => response.json())
    .then(data => {
      allBreeds = Object.keys(data.message);
      renderBreeds(allBreeds);
    })
    .catch(error => console.error('Error fetching breeds:', error));

  function renderBreeds(breeds) {
    // Clear existing breeds
    dogBreedsList.innerHTML = '';
    
    breeds.forEach(breed => {
      const li = document.createElement('li');
      li.textContent = breed;
      dogBreedsList.appendChild(li);
    });
  }

  // Challenge 3: Change font color on click
  dogBreedsList.addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
      // Toggle between blue and black
      event.target.style.color = event.target.style.color === 'blue' ? 'black' : 'blue';
    }
  });

  // Challenge 4: Filter breeds by letter
  const breedDropdown = document.getElementById('breed-dropdown');

  breedDropdown.addEventListener('change', function(event) {
    const selectedLetter = event.target.value;
    
    if (selectedLetter === '') {
      renderBreeds(allBreeds); // Show all breeds if no letter selected
    } else {
      const filteredBreeds = allBreeds.filter(breed => breed.startsWith(selectedLetter));
      renderBreeds(filteredBreeds);
    }
  });
});