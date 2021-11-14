fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    console.log(value);
    let elt = document.getElementById('items');
    var block_product;
    
    for (let p of value){

        console.log(p.imageUrl);
        console.log(p.name);
        console.log(p.description);

        block_product = document.createElement ('div');
        block_product.id = p._id;
        elt.appendChild(block_product);
        block_product.style.height = '400px';
        block_product.style.width = '300px';
        block_product.style.marginBottom = '50px';
        block_product.style.backgroundColor = '#3d424f';
        block_product.style.borderRadius = '5%';
        block_product.style.borderRadius = '5%';
        block_product.style.overflow = 'hidden';
        block_product.onmouseenter = function(event){
           event.target.style.boxShadow = '10px 5px 5px #3d424f';
        }
        block_product.onmouseleave = function(event){
            event.target.style.boxShadow = '';
         }

         block_product.style.cursor ='pointer';
         block_product.onclick = function(){
             document.location.href = '../html/product.html';
         }
        

        let img = document.createElement('img');
        img.src = p.imageUrl;
        block_product.appendChild(img);
        img.style.height = '300px';
        img.style.width = '300px';
        img.style.borderTopLeftRadius = '5%';
        img.style.borderTopRightRadius = '5%';
       
        

        let product_name = document.createElement('p');
        product_name.textContent = p.name;
        block_product.appendChild(product_name);
        product_name.style.textAlign = 'center';
        product_name.style.textTransform = 'uppercase';
        product_name.style.fontWeight = 'bold';

        let product_description = document.createElement('p');
        product_description.textContent = p.description;
        block_product.appendChild(product_description);
        product_description.title = p.description;
        product_description.style.textAlign = 'center';
        product_description.style.fontSize = '10px';
        product_description.style.marginRight = '40px';
        product_description.style.marginLeft = '40px';
        product_description.style.blockSize = '30px';
        product_description.style.overflow = 'hidden';
        product_description.style.display ='block';
        product_description.style.textOverflow = 'ellipsis';
        product_description.style.whiteSpace = 'nowrap';
    

    }
  })
  .catch(function(err) {
    // Une erreur est survenue
  }); 
  console.log("window size: " + window.innerWidth + " px")

  