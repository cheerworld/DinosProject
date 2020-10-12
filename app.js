//Create Dino constructor
function DinosCreate(species, weight, height, diet, where, when, fact, cardColor) {
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.where = where;
  this.when = when;
  this.fact = fact;
  this.cardColor = cardColor;
}

//Generate Dino object
let triceratops = new DinosCreate("Triceratops", 13000, 114, "herbavor", "North America", "Late Cretaceous", "First discovered in 1889 by Othniel Charles Marsh.", "#009687f5");
let tyrannosaurusRex = new DinosCreate("Tyrannosaurus Rex", 11905, 144, "carnivor", "North America", "Late Cretaceous", "The largest known skull measures in at 5 feet long.", "#dc7657f5");
let anklyosaurus = new DinosCreate("Anklyosaurus", 10500, 55, "herbavor", "North America", "Late Cretaceous", "Anklyosaurus survived for approximately 135 million years.", "#4bb3c1fa");
let brachiosaurus = new DinosCreate("Brachiosaurus", 70000, 372, "herbavor", "North America", "Late Jurasic", "An asteroid was named 9954 Brachiosaurus in 1991.", "#fac069f9");
let stegosaurus = new DinosCreate("Stegosaurus", 11600, 79, "herbavor", "North America, Europe, Asia", "Late Jurasic to Early Cretaceous", "The Stegosaurus had between 17 and 22 seperate places and flat spines.", "#b94169fa");
let elasmosaurus = new DinosCreate("Elasmosaurus", 16000, 59, "carnivor", "North America", "Late Cretaceous", "Elasmosaurus was a marine reptile first discovered in Kansas.", "#7f62b3fa");
let pteranodon = new DinosCreate("Pteranodon", 44, 20, "carnivor", "North America", "Late Cretaceous", "Actually a flying reptile, the Pteranodon is not a dinosaur.", "#9fc376f9");
let pigeon = new DinosCreate("Pigeon", 0.5, 9, "herbavor", "World Wide", "Holocene", "All birds are living dinosaurs.", "#677bcbfa");

//Validate the form
function validateForm() {

  let x = document.form.name.value;
  let y = document.form.feet.value;
  let z = document.form.inches.value;
  let w = document.form.weight.value;
  let valid = true;
  if (x == "" || y == "" || z == "" || w == "") {
    alert("Please fill out the form completely!");
    valid = false;
  }
  return valid;
}

const button = document.getElementById("btn");
button.addEventListener("click", function() {

  //call validateForm function, if ture, execute the rest of the code
  if (validateForm()) {

    // Create human object
    let human = new DinosCreate("", "", "", "", "", "", "", "#67a866f9");

    //Get human data from form
    (function getHumanData() {
      human.species = document.getElementById("name").value;
      human.weight = document.getElementById("weight").value;
      human.height = (parseFloat(document.getElementById("feet").value) * 12) + parseFloat(document.getElementById("inches").value);
      human.diet = document.getElementById("diet").value;
    })();

    //Dino compare method 1
    DinosCreate.prototype.compareWeight = function() {
      if (this.weight > human.weight) {
        return this.species + " is heavier than you.";
      } else {
        return this.species + " is lighter than you.";
      }
    };
    //Dino compare method 2
    DinosCreate.prototype.compareHeight = function() {
      if (this.height > human.height) {
        return this.species + " is taller than you.";
      } else {
        return this.species + " is short than you.";
      }
    };
    //Dino compare method 3
    DinosCreate.prototype.compareDiet = function() {
      if (this.diet === human.diet) {
        return this.species + " and you have the same diet!";
      } else {
        return this.species + " was " + this.diet + " while you are " + human.diet + ".";
      }
    };

    let dinos = [triceratops, tyrannosaurusRex, anklyosaurus, brachiosaurus, human, stegosaurus, elasmosaurus, pteranodon, pigeon];

    //Create a new button
    if (!document.querySelector(".newBtn")) {
      let newButton = document.createElement("button");
      let newButtonText = document.createTextNode("New Compare");
      newButton.appendChild(newButtonText);
      newButton.setAttribute("class", "newBtn");
      newButton.type = "button";
      //Add "New Compare" button back to DOM
      document.querySelector("#newButtonDiv").appendChild(newButton);
      //When "New Compare" button clicked, it hides and clear the grid, and show form
      newButton.addEventListener("click", function() {
        document.querySelector("#grid").innerHTML = "";
        document.querySelector("#grid").style.display = "none";
        document.querySelector("#dino-compare").style.display = "block";
        if (document.querySelector("#dino-compare").style.display = "block") {
          document.querySelector(".newBtn").style.display = "none";
        }
      });

    }

    //Create each tile
    dinos.forEach(function(dino) {
      let tileDiv = document.createElement("div");
      let title = document.createElement("h3");
      let image = document.createElement("img");
      let fact = document.createElement("p");
      tileDiv.className = "grid-item";
      //Add each tile bg color
      tileDiv.style.backgroundColor = dino.cardColor;
      let tileFragment = document.createDocumentFragment();
      tileFragment.appendChild(tileDiv);
      tileDiv.appendChild(title);
      tileDiv.appendChild(image);
      tileDiv.appendChild(fact);

      //Add tile to DOM
      document.querySelector("#grid").appendChild(tileFragment);

      //Generate title text
      let titleText = document.createTextNode(dino.species);
      title.appendChild(titleText);

      //Generate images
      if (dino === human) {
        image.src = "images/human.png";
      } else {
        image.src = "images/" + dino.species.toLocaleLowerCase() + ".png";
      }

      //Generate fact
      if (dino === human) {
        const humanFact = document.createTextNode(dino.fact);
        fact.appendChild(humanFact);
      } else if (dino === pigeon) {
        const pigeonFact = document.createTextNode(dino.fact);
        fact.appendChild(pigeonFact);
      } else {
        let randomNum = Math.floor(Math.random() * 6);
        let randomFact;
        //Generate random facts for Dinos
        switch (randomNum) {
          case 0:
            randomFact = dino.species + " used to live in " + dino.where + ".";
            break;
          case 1:
            randomFact = dino.species + " was alive during " + dino.when + ".";
            break;
          case 2:
            randomFact = dino.fact;
            break;
          case 3:
            randomFact = dino.compareWeight();
            break;
          case 4:
            randomFact = dino.compareHeight();
            break;
          case 5:
            randomFact = dino.compareDiet();
            break;
          default:
            randomFact = "No fact was found."
        }
        randomFact = document.createTextNode(randomFact);
        fact.appendChild(randomFact);
      }

    });
    // Remove form from screen
    document.querySelector("#dino-compare").style.display = "none";
    // On button click, prepare and display infographic
    document.querySelector("#grid").style.display = "flex";
    // On compare button click, display new compare button
    document.querySelector(".newBtn").style.display = "inline-block";
  };

});
