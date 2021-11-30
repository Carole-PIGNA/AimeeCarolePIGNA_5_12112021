// chaque ID du produit a été récupéré dans l'URL
var str = window.location.href;
console.log('>>>>> ' + str);
var url = new URL(str);

var id = url.searchParams.get("id");
console.log(' >>>>> ' + id);

// On accéde et parcourt l'API 
fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    let elt = document.getElementsByClassName('item__img')[0];
    let att = document.createAttribute("id");
    att.value = "item__img";
    elt.setAttributeNode(att);
    let img = document.createElement('img');

    let titleProduct = document.getElementById('title');
    let title = document.createElement('h1');

    let priceProduct = document.getElementById('price');
    let price = document.createElement('span');

    let descriptionProduct = document.getElementById('description');
    let description = document.createElement('p');

    let colorsProduct = document.getElementById('colors');
    

    let inputQty = document.getElementById('quantity');
    // je set la quantité à 1 par défaut
    inputQty.value = "1";

// je compare l'id du produit sur ma page avec les _id de l'API pour récupérer les prix et autres
    for (let p of value) {
      if (id == p._id) {

        img.src = p.imageUrl;
        img.alt = p.altTxt;
        elt.appendChild(img);

        title.textContent = p.name;
        titleProduct.appendChild(title);

        price.textContent = p.price;
        priceProduct.appendChild(price);

        description.textContent = p.description;
        descriptionProduct.appendChild(description);


        var array = p.colors;
        for (var i = 0; i < array.length; i++) {
          var option = document.createElement('option');
          option.value = array[i];
          option.text = array[i];
          colorsProduct.appendChild(option);
          // je set la couleur par défaut 
          colorsProduct.selectedIndex = 0;
          colorsProduct.value = array[0];

        }



      }

    }

    // Lorsqu'on appuie sur Ajouter au panier


    let add = document.getElementById('addToCart');
  
    add.addEventListener("click", function () {

      // fonction fenêtre pop up
      const popupConfirmation = () => {
        if (window.confirm(`Cliquez OK pour continuer les achats
        ou Annuler pour voir votre Panier`)) {
          window.location.href = '../html/index.html';
        } else {
          window.location.href = '../html/cart.html';
        }
      }

      popupConfirmation();

      // récupération des caractéristiques Produit (formulaire)
      let optionsProduit = {
        idProduit: id,
        qty: document.getElementById('quantity').value,
        couleurProduit: document.getElementById('colors').value,

      };


      //**************** LOCAL STORAGE **********************

      //Déclaration variable "produitsdanspanier" dans laquelle on mettra les Key et les valeurs qui sont dans le local storage
      // avec JSON.parse pour convertir les données en format JSON qui sont dans le local Storage en objet Javascript
      let produitsdanspanier = JSON.parse(localStorage.getItem("produit"));
      let articlePanier = JSON.parse(localStorage.getItem("article"));
      // si il y a déjà des produits enregistré dans le local storage
      if (produitsdanspanier) {
        produitsdanspanier.push(optionsProduit);


      }
      // si rien d'enregistré dans le local storage
      else {
        produitsdanspanier = [];
        produitsdanspanier.push(optionsProduit);
        localStorage.setItem("article", JSON.stringify(produitsdanspanier));


        if (articlePanier !== null || articlePanier.length !== 0) {

          for (let pDP of articlePanier) {
            // si produit déjà présent (même id, même couleur), on incrémente seulement la qté
            if (pDP.idProduit == optionsProduit.idProduit && pDP.couleurProduit == optionsProduit.couleurProduit) {
              var intQty_pDP = parseInt(pDP.qty); // conversion des string en entier pour l'incrémentation
              var intQty_optionsProduit = parseInt(optionsProduit.qty);// conversion des string en entier pour l'incrémentation
              optionsProduit.qty = intQty_pDP + intQty_optionsProduit + ''; // optionsProduit.qty étant un string, on fait l'addition, puis on le remet en strin par le +''

            }
            else {
              produitsdanspanier.push(pDP);
            }



          }

          localStorage.setItem("article", JSON.stringify(produitsdanspanier));

        }
      }

    });

  })

  .catch(function (err) {
    // Une erreur est survenue
  });

