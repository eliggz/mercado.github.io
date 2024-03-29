let lista_productos = "";
let rangoMin = document.getElementById("rangeFilterCountMin");
let rangoMax = document.getElementById("rangeFilterCountMax");

// traer json
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      lista_productos = resultObj.data;
      mostrarProductos(lista_productos);
    }
  });
});

//mostrar html

function mostrarProductos() {
  let htmlContentToAppend = "";
  lista_productos.products.map((elemento) => {
    htmlContentToAppend += `
      <div onclick="setCatID(${elemento.id})" class="list-group-item list-group-item-action cursor-active">
          <div class="row">
           <p class="mb-1"> USD: ${elemento.cost}</p>
              <div class="col-3">
                  <img src="${elemento.image}" alt="${elemento.description}" class="img-thumbnail">
              </div>
              <div class="col">
                  <div class="d-flex w-100 justify-content-between">
                      <h4 class="mb-1">${elemento.name}</h4>
                  </div>
                  <p class="mb-1">${elemento.description}</p><p class="mb-1"> Vendidos: ${elemento.soldCount} </p>
                  
              </div>
          </div>
         
      </div>
      
      `;
  });

  document.getElementById("productsList").innerHTML = htmlContentToAppend;
}

function filtrarProductos(rangoMin, rangoMax) {
  let htmlContentToAppend = "";
  if(rangoMin.value && rangoMax.value){
    const listaFiltrada = lista_productos.products.filter((obj) => {
      if (obj.cost <= rangoMax.value && obj.cost >= rangoMin.value) {
        return obj;
      }
    });
    listaFiltrada.map((obj) => {
      htmlContentToAppend += `
        <div onclick="setCatID(${obj.id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
             <p class="mb-1"> USD: ${obj.cost}</p>
                <div class="col-3">
                    <img src="${obj.image}" alt="${obj.description}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${obj.name}</h4>
                    </div>
                    <p class="mb-1">${obj.description}</p><p class="mb-1"> Vendidos: ${obj.soldCount} </p>
                    
                </div>
            </div>
           
        </div>
        
        `;
    });

    document.getElementById("productsList").innerHTML = htmlContentToAppend;
   
  }

  else if(rangoMin.value && !rangoMax.value){
    const listaFiltrada = lista_productos.products.filter((obj) => {
        if (obj.cost >= rangoMin.value) {
          return obj;
        }
      });
      listaFiltrada.map((obj) => {
        htmlContentToAppend += `
          <div onclick="setCatID(${obj.id})" class="list-group-item list-group-item-action cursor-active">
              <div class="row">
               <p class="mb-1"> USD: ${obj.cost}</p>
                  <div class="col-3">
                      <img src="${obj.image}" alt="${obj.description}" class="img-thumbnail">
                  </div>
                  <div class="col">
                      <div class="d-flex w-100 justify-content-between">
                          <h4 class="mb-1">${obj.name}</h4>
                      </div>
                      <p class="mb-1">${obj.description}</p><p class="mb-1"> Vendidos: ${obj.soldCount} </p>
                      
                  </div>
              </div>
             
          </div>
          
          `;
      });
  
      document.getElementById("productsList").innerHTML = htmlContentToAppend;
      
  }
  else if(!rangoMin.value && rangoMax.value) {
    const listaFiltrada = lista_productos.products.filter((obj) => {
        if (obj.cost <= rangoMax.value) {
          return obj;
        }
      });
      listaFiltrada.map((obj) => {
        htmlContentToAppend += `
          <div onclick="setCatID(${obj.id})" class="list-group-item list-group-item-action cursor-active">
              <div class="row">
               <p class="mb-1"> USD: ${obj.cost}</p>
                  <div class="col-3">
                      <img src="${obj.image}" alt="${obj.description}" class="img-thumbnail">
                  </div>
                  <div class="col">
                      <div class="d-flex w-100 justify-content-between">
                          <h4 class="mb-1">${obj.name}</h4>
                      </div>
                      <p class="mb-1">${obj.description}</p><p class="mb-1"> Vendidos: ${obj.soldCount} </p>
                      
                  </div>
              </div>
             
          </div>
          
          `;
      });
  
      document.getElementById("productsList").innerHTML = htmlContentToAppend;
      console.log(listaFiltrada)

  }
}

function limpiarFiltro(rangoMin, rangoMax){
  rangoMin.value = "" ;
   rangoMax.value = "";
   mostrarProductos()
}

function ordenarCostAsc(a,b){
    return b.cost - a.cost;
}

function ordenarMayorPrecio(){
    mostrarProductos(lista_productos.products.sort(ordenarCostAsc))
}

function ordenarCostDesc(a,b){
    return a.cost - b.cost;
}

function ordenarMenorPrecio(){
    mostrarProductos(lista_productos.products.sort(ordenarCostDesc))
}

function ordenarRelDesc(a,b){
  return b.soldCount - a.soldCount
}
  
function ordenarMayorRel(){
  mostrarProductos(lista_productos.products.sort(ordenarRelDesc));
}

function setCatID(id) {
  localStorage.setItem("catID", id);
  window.location = "product-info.html"
}
