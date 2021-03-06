fetch("http://localhost:3000/api/products")
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (value) {

        // ************** récupération  de l'array dans le local storage ************************

        let ArrayJSON = JSON.parse(localStorage.getItem("article"));
        let carts = document.getElementById('cart__items');
        /**** Déclaration des variables */
        var totalQty = 0;
        var totalprix = 0;
        // ***************parcourir le tableau dans le local storage *********************************
        for (let i of ArrayJSON) {

            for (let p of value) {
                let id = i.idProduit;
                if (id == p._id) {

                    //*********** Injection des differents elements dans le DOM ( ) ******************************************

                    // <div class="cart__item__img">  
                    let article = document.createElement('article');
                    carts.appendChild(article);
                    let attr = document.createAttribute('class');
                    attr.value = 'cart__item';
                    article.setAttributeNode(attr);
                    article.dataset.id = i.idProduit;
                    article.dataset.color = i.couleurProduit;

                    let cart__item__img = document.createElement('div');
                    article.appendChild(cart__item__img);
                    let attr_img = document.createAttribute('class');
                    attr_img.value = 'cart__item__img';
                    cart__item__img.setAttributeNode(attr_img);

                    let img = document.createElement('img');
                    img.src = p.imageUrl;
                    cart__item__img.appendChild(img);

                    //<div class="cart__item__content">
                    let cart__item__content = document.createElement('div');
                    article.appendChild(cart__item__content);
                    let attr_cartItemContent = document.createAttribute('class');
                    attr_cartItemContent.value = 'cart__item__content';
                    cart__item__content.setAttributeNode(attr_cartItemContent);

                    // description
                    let cart__item__content__description = document.createElement('div');
                    cart__item__content.appendChild(cart__item__content__description);
                    let attr_cartItemContentDescription = document.createAttribute('class');
                    attr_cartItemContentDescription.value = 'cart__item__content__description';
                    cart__item__content__description.setAttributeNode(attr_cartItemContentDescription);

                    //description : nom, couleur, prix
                    let nom_produit = document.createElement('h2');
                    nom_produit.textContent = p.name;
                    cart__item__content__description.appendChild(nom_produit);

                    let couleur_produit = document.createElement('p');
                    couleur_produit.textContent = i.couleurProduit;
                    cart__item__content__description.appendChild(couleur_produit);


                    let prix_produit = document.createElement('p');
                    prix_produit.textContent = p.price + '€';
                    cart__item__content__description.appendChild(prix_produit);

                    // Paramètres
                    let cart__item__content__settings = document.createElement('div');
                    cart__item__content.appendChild(cart__item__content__settings);
                    let attr_cartItemContentSettings = document.createAttribute('class');
                    attr_cartItemContentSettings.value = 'cart__item__content__settings';
                    cart__item__content__settings.setAttributeNode(attr_cartItemContentSettings);

                    //Paramétrer Quantité
                    let qte_produit = document.createElement('div');
                    cart__item__content__settings.appendChild(qte_produit);
                    let attr_qteProduit = document.createAttribute('class');
                    attr_qteProduit.value = 'cart__item__content__settings__quantity';
                    qte_produit.setAttributeNode(attr_qteProduit);

                    // paragraphe
                    let quantite_produit = document.createElement('p');
                    quantite_produit.textContent = 'Qté : ';
                    qte_produit.appendChild(quantite_produit);

                    //input 
                    let itemQuantity = document.createElement('input');
                    qte_produit.appendChild(itemQuantity);
                    let attr_itemQuantity = document.createAttribute('class');
                    attr_itemQuantity.value = 'cart__item__content__settings__quantity';
                    qte_produit.setAttributeNode(attr_itemQuantity);
                    itemQuantity.setAttribute("type", "number");
                    itemQuantity.setAttribute("min", "1");
                    itemQuantity.setAttribute("max", "100");
                    itemQuantity.setAttribute("value", i.qty);
                    itemQuantity.name = 'itemQuantity';



                    //suppression articleSuppressionArticle
                    let SuppressionArticle = document.createElement('div');
                    cart__item__content__settings.appendChild(SuppressionArticle);
                    let attr_SuppressionArticle = document.createAttribute('class');
                    attr_SuppressionArticle.value = 'cart__item__content__settings__delete';
                    SuppressionArticle.setAttributeNode(attr_SuppressionArticle);


                    // 'Button Supprimer'
                    let deleteItem = document.createElement('p');
                    SuppressionArticle.appendChild(deleteItem);
                    let attr_deleteItem = document.createAttribute('class');
                    attr_deleteItem.value = 'deleteItem';
                    deleteItem.textContent = 'Supprimer ';

                    // calcul Total prix

                    totalprix += (parseInt(p.price) * parseInt(i.qty));

                }

                i_qty = parseInt(i.qty);

            }
            // calcul total quantité
            totalQty += i_qty;




        }



        let totalQuantity = document.getElementById('totalQuantity');
        totalQuantity.textContent = totalQty;

        let totalPrice = document.getElementById('totalPrice');
        totalPrice.textContent = totalprix;

/*************************  Modification quantité articles **************************************************** */ 
/************************************************************************************************************* */
        var selectqty = document.getElementsByClassName('cart__item__content__settings__quantity');
        var deleteProduit = document.getElementsByClassName('cart__item__content__settings__delete');


        for (var i = 0; i < selectqty.length; i++) {
            var qty = selectqty[i];

            var del = deleteProduit[i];

/* ********************** Modification quantité articles ****************************/
            qty.onchange = function (e) {


                console.log('Nouvelle quantité:' + e.target.value);
                window.location.reload();
                let productModified;
                let arr = JSON.parse(localStorage.getItem("article"));
                for (var i = 0; i < arr.length; i++) {
                    window.location.reload;
                    productModified = {
                        'idProduit': e.target.closest('article').dataset.id,
                        'qty': e.target.value,
                        'couleurProduit': e.target.closest('article').dataset.color,
                    };
                    if ((arr[i].idProduit == e.target.closest('article').dataset.id) &&
                        (arr[i].couleurProduit == e.target.closest('article').dataset.color)) {
                        delete arr[i];
                    }

                }
                temp = [];
                for (let i of arr) {
                    i && temp.push(i);
                    arr = temp;
                }

                arr.push(productModified);
                localStorage.removeItem("article");
                localStorage.setItem("article", JSON.stringify(arr));
                arr.push(productModified);



            }


        }


/****************************************Suppression article******************************************************** */ 
        let arr = JSON.parse(localStorage.getItem("article"));
        let idToDelete;

        for (var i = 0; i < deleteProduit.length; i++) {
            var del = deleteProduit[i];
            del.onclick = function (e) {
                idToDelete = e.target.closest('article').dataset.id;

                for (i = 0; i < arr.length; i++) {
                    if ((JSON.parse(localStorage.getItem("article"))[i].idProduit == e.target.closest('article').dataset.id) && (JSON.parse(localStorage.getItem("article"))[i].couleurProduit == e.target.closest('article').dataset.color) ){
                        delete arr[i];
                        console.log(arr)
                    }
                }
                temp2 = [];
                for (let i of arr) {
                    i && temp2.push(i);
                    arr = temp2;
                }
                localStorage.removeItem("article");
                localStorage.setItem("article", JSON.stringify(arr))
                window.location.reload();
            }
        }

 /* ********************Formulaire de commande **************************/
  /*********************************************************************/
        //Séléction bouton "Commander"
        const btnOrder = document.querySelector('#order');
        // déclaration des variables
        var prenom = document.getElementById('firstName');
        var nom = document.getElementById('lastName');
        var adresse = document.getElementById('address');
        var ville = document.getElementById('city');
        var email = document.getElementById('email');
        
        // fonction de vérification de l' adresse email
        function verif_email(saisie) {
            var pattern = /^[a-z0-9.-]{2,}@+[a-z0-9.-]{2,}$/i;

            if (pattern.test(saisie)) {
                return true;

            }
            else {

                document.getElementById('emailErrorMsg').innerHTML = 'Veuillez rentrer une adresse mail valide !';
                return false;
            }

        }
        // fonction de vérification du nom
        function verif_firstName(inputtxt) {
            var letters = /^[A-Za-z]+$/;
            if (inputtxt.match(letters)) {

                return true;
            }
            else {
                document.getElementById('firstNameErrorMsg').innerHTML = 'Veuillez rentrer un prénom valide !';
                return false;
            }
        }
        // fonction de vérification du prénom
        function verif_lastName(inputtxt) {
            var letters = /^[A-Za-z]+$/;
            if (inputtxt.match(letters)) {

                return true;
            }
            else {
                document.getElementById('lastNameErrorMsg').innerHTML = 'Veuillez rentrer un nom valide !';
                return false;
            }
        }




/**************************Analyse de données saisies -**************************************/

        btnOrder.addEventListener('click', (e) => {


            e.preventDefault();


            //Si on clique sur Order et qu'un champ est vide , => affiche une fenêtre d'alerte

            if (!prenom.value || !nom.value || !adresse.value || !ville.value || !email.value) {
                e.preventDefault();
                alert('Veuillez saisir tous les champs !');


            } else {
                // sinon, si tous les champs du formaulaire sont bien remplis, faire la vérification du contenu des champs
                verif_firstName(prenom.value);
                verif_lastName(nom.value);
                verif_email(email.value);
                // si tous les champs ont passé la validation
                if (verif_firstName(prenom.value) == true && verif_lastName(nom.value) == true  && verif_email(email.value) == true) {
                    // récupération des valeurs du formulaire pour les mettre dans le localstorage
                    localStorage.setItem('prenom', document.querySelector('#firstName').value);
                    localStorage.setItem('nom', document.querySelector('#lastName').value);
                    localStorage.setItem('adresse', document.querySelector('#address').value);
                    localStorage.setItem('ville', document.querySelector('#city').value);
                    localStorage.setItem('email', document.querySelector('#email').value);


                    // Mettre les valeurs du formulaire dans un objet
                    const contact = {
                        firstName: document.querySelector("#firstName").value,
                        lastName: document.querySelector("#lastName").value,
                        address: document.querySelector("#address").value,
                        city: document.querySelector("#city").value,
                        email: document.querySelector("#email").value

                    }


                    // Mettre les valeurs du formulaire et les produits séléctionnés dans un objet

                    let products = [];

                    for (let l = 0; l < arr.length; l++) {
                        let productId = arr[l].idProduit;
                        products.push(productId)

                    }


                    let infoSend = {
                        contact,
                        products,

                    }

                    console.log(infoSend);

/*******************************Requête POSt sur l'API **************************************************************************************** */
                    let promise01 = fetch("http://localhost:3000/api/products/order", {
                        method: "POST",
                        headers: {
                            'content-type': "application/json"
                        },
                        mode: "cors",
                        body: JSON.stringify(infoSend),
                    });


                    promise01.then(async (response) => {

                        try {

                            const content = await response.json();
                            console.log(content);

                            if (response.ok) {

                                console.log('resultat.ok' + response.ok);
                                // récupération de l'identifiant de commande dans la réponse de l'API
                                localStorage.setItem("responseId", content.orderId)
                                // Id de la commande dans l'URL
                                document.location.href = '../html/confirmation.html?id=' + content.orderId;

                                console.log("responseId");
                            } else {
                                console.log('reponse du serveur:' + response.status);
                                alert('Probléme avec le serveur: erreur ' + response.status);



                            }

                        } catch (e) {
                            console.log(e);
                        }
                    });
                }


            }
        });

    })

    .catch(function (err) {
        // Une erreur est survenue
    });

//****************************** affichage de l'Id de la commande et nettoyage du local storage******************************************************************* */
var newPage = window.location.href;
var url = new URL(newPage);
const idCommande = document.getElementById('orderId');
idCommande.textContent = url.searchParams.get("id");
//console.log(' >>>>> ' + idCommande.textContent)
localStorage.clear();


/****************************************** THE END *********************************************** */