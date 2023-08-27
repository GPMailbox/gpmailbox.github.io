function removeAccents(input) {
    return input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search");
    const suggestionBox = document.getElementById("suggestions");
    
      const suggestions = ["oui","baguette"]
  
    
      searchInput.addEventListener("input", function () {
        const inputText = searchInput.value;
        const words = inputText.split(" ");
        const lastWord = words[words.length - 1].toLowerCase();
    
        suggestionBox.innerHTML = "";
    
        if (lastWord !== "") {
          const normalizedLastWord = removeAccents(lastWord);
    
          const matchingSuggestions = suggestions.filter(suggestion =>
            removeAccents(suggestion.toLowerCase()).startsWith(normalizedLastWord)
          );
    
          matchingSuggestions.forEach(suggestion => {
            const suggestionElement = document.createElement("div");
            suggestionElement.classList.add("suggestion");
            suggestionElement.textContent = suggestion;
            suggestionElement.addEventListener("click", function () {
              words[words.length - 1] = suggestion;
              searchInput.value = words.join(" ");
              suggestionBox.style.display = "none";
            });
            suggestionBox.appendChild(suggestionElement);
          });
    
          if (matchingSuggestions.length > 0) {
            suggestionBox.style.display = "block";
          } else {
            suggestionBox.style.display = "none";
          }
        } else {
          suggestionBox.style.display = "none";
        }
      });
    
      document.addEventListener("click", function(event) {
        if (!event.target.closest(".searchbar-container")) {
          suggestionBox.style.display = "none";
        }
      });
    });