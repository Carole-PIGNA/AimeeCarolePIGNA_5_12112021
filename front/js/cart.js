fetch("http://localhost:3000/api/products")
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (value) {

        // récupération  de l'array dans le local storage

        let ArrayJSON = JSON.parse(localStorage.getItem("article"));
        // parcourir l'array

        let carts = document.getElementById('cart__items');
        var totalQty = 0;
        var totalprix = 0;

        for (let i of ArrayJSON) {
            
            for (let p of value) {
                let id = i.idProduit;
                if (id == p._id) {
                    //console.log(i);
                    // article class="cart__item"
                    let article = document.createElement('article');
                    carts.appendChild(article);
                    let attr = document.createAttribute('class');
                    attr.value = 'cart__item';
                    article.setAttributeNode(attr);
                    article.dataset.id = i.idProduit;
                    article.dataset.color = i.couleurProduit;
                    //console.log(article.dataset.id );
                    //console.log(article.dataset.color);
                    
                    //<div class="cart__item__img">
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
                        let cart__item__content__description= document.createElement('div');
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
                            prix_produit.textContent = p.price +'€';
                            cart__item__content__description.appendChild(prix_produit);
                        
                    // Paramètres
                        let cart__item__content__settings= document.createElement('div');
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
                                qte_produit .appendChild(quantite_produit);

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
                                itemQuantity.name= 'itemQuantity';
                               


                        //suppression articleSuppressionArticle
                            let SuppressionArticle = document.createElement('div');
                            cart__item__content__settings.appendChild(SuppressionArticle);
                            let attr_SuppressionArticle = document.createAttribute('class');
                            attr_SuppressionArticle .value = 'cart__item__content__settings__delete';
                            SuppressionArticle.setAttributeNode(attr_SuppressionArticle);


                                // 'Button Supprimer'
                                let deleteItem = document.createElement('p');
                                SuppressionArticle.appendChild(deleteItem);
                                let attr_deleteItem = document.createAttribute('class');
                                attr_deleteItem.value = 'deleteItem';
                                deleteItem.textContent = 'Supprimer ';
                                
                    // calcul Total prix

                totalprix += (parseInt(p.price)* parseInt(i.qty));

                }

            i_qty = parseInt(i.qty);  

            }
           // calcul total quantité
            totalQty += i_qty;


           
        }



        let totalQuantity = document.getElementById('totalQuantity');
        totalQuantity.textContent = totalQty;

        let totalPrice = document.getElementById('totalPrice');
        totalPrice.textContent  = totalprix;

         // modification quantité articles

         var selectqty = document.getElementsByClassName('cart__item__content__settings__quantity'); 
        var deleteProduit = document.getElementsByClassName ('cart__item__content__settings__delete');


        for (var i =0; i < selectqty.length; i++){
             var qty = selectqty[i];

             var del = deleteProduit[i];
             
            // ajout ou basse quantité articles
             qty.onchange = function(e){

               console.log('Nouvelle quantité:' + e.target.value);
               // console.log('Nouvelle id:' + e.target.closest('article').dataset.id);
               // console.log('Nouvelle couleur:' + e.target.closest('article').dataset.color);
              let productModified;
              let arr = JSON.parse(localStorage.getItem("article"));
              console.log(">>>> Arr  before")
              console.log(ArrayJSON);
               for (var i = 0; i < arr.length; i++){
                productModified = {
                    'idProduit' : e.target.closest('article').dataset.id,
                    'qty' : e.target.value,
                    'couleurProduit':e.target.closest('article').dataset.color,
                };
                if ((arr[i].idProduit == e.target.closest('article').dataset.id ) && 
                (arr[i].couleurProduit == e.target.closest('article').dataset.color)){
                    delete arr[i]; 
               }
            }
            temp = [];
            for(let i of arr){
                i && temp.push(i);
                arr = temp;
            }

            arr.push(productModified);
            localStorage.removeItem("article"); 
            localStorage.setItem("article", JSON.stringify(arr))
            arr.push(productModified)

           // console.log(ArrayJSON);

             }
            

            }
             

             // suppression article
        let arr = JSON.parse(localStorage.getItem("article"));
        let idToDelete;

            for (var i =0; i < deleteProduit.length; i++){
            var del = deleteProduit[i];
            del.onclick = function (e){
                idToDelete = e.target.closest('article').dataset.id;

                    for(i=0; i<arr.length;i++){
                        if(JSON.parse(localStorage.getItem("article"))[i].idProduit==e.target.closest('article').dataset.id){
                            delete arr[i];
                            console.log(arr)
                        }
                    }
                    temp2 = [];
                    for(let i of arr){
                        i && temp2.push(i);
                        arr = temp2;
                    }
                    localStorage.removeItem("article"); 
                    localStorage.setItem("article", JSON.stringify(arr))
                    window.location.reload();
                }
            }
// ***************************************************************
// ********************Formulaire de commande **************************
//Séléction bouton "Commander"
const btnOrder = document.querySelector('#order');
var prenom = document.getElementById('firstName');
var nom = document.getElementById('lastName');
var adresse = document.getElementById('address');
var ville = document.getElementById('city');
var email = document.getElementById('email');
// fonction de vérification des adresses emails

function verif_email(saisie)
{
    var pattern = /^[a-z0-9.-]{2,}@+[a-z0-9.-]{2,}$/i;
 
    if (pattern.test(saisie))
    {
        return true;
         
     }
    else{
        window.alert('La saisie est invalide !');
        return false;
    }

}
function verif_name(inputtxt)
  {
   var letters = /^[A-Za-z]+$/;
   if(inputtxt.match(letters))
     {

      return true;
     }
   else
     {
     alert("Veuillez mettre un nom/prénom valide");
     return false;
     }
  }

  var contact;

//--------------Analyse de données saisies -----

btnOrder.addEventListener('click', (e)=>{


    e.preventDefault();

       
    //Si un champ est vide et qu'on clique sur Order, => retourne un message d'erreur
    
    if (!prenom.value || !nom.value || !adresse.value || !ville.value || !email.value ){
        e.preventDefault();
        alert('Veuillez saisir tous les champs !');
       
        
    } else{
            
            verif_name(nom.value);
            verif_name(prenom.value);
            verif_email(email.value); 
            
        if (verif_name(nom.value)== true && verif_name(prenom.value) == true && verif_name(prenom.value) == true){
                      // récupération des valeurs du formulaire pour les mettre dans le localstorage
                      localStorage.setItem('prenom', document.querySelector('#firstName').value );
                      localStorage.setItem('nom', document.querySelector('#lastName').value );
                      localStorage.setItem('adresse', document.querySelector('#address').value );
                      localStorage.setItem('ville', document.querySelector('#city').value );
                      localStorage.setItem('email', document.querySelector('#email').value );
        
          
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
                  
                            console.log('resultat.ok: ${response.ok}');
                  
                            console.log("Id de reponse");
                            console.log(content.orderId);
                  
                            localStorage.setItem("responseId", content.orderId)
                  
                           // window.location = "confirmation.html";
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
           
 
        console.log('Commande enregistrée');



       

        
      
    
        }
    });
 
    })
   
    .catch(function (err) {
        // Une erreur est survenue
    });


    
 
 
