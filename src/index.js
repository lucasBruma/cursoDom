/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const baseURL = 'https://platzi-avo.vercel.app';

const appNode = document.querySelector('#app');

const formatPrice = (price) => {
  //instancia de la api de internacionalizacion
  const newPrice = new window.Intl.NumberFormat('es',{
    style: "currency",
    currency: "ars",
  }).format(price)

  return newPrice
}


// web api
// conectarnos al server

window
    .fetch(`${baseURL}/api/avo`)
    //procesar la respuesta, y convertirla en JSON
    .then(respuesta => respuesta.json())
    // JSON --> Data --> renderizar info browser
    .then((respuestaJson)=> {
        const todosLosItems = [];
        respuestaJson.data.forEach(item => {
          // crear imagen
          const imagen = document.createElement('img');
          imagen.src = `${baseURL}${item.image}`;
          
          // crear titulo
          const titulo = document.createElement('h2');
          titulo.textContent = item.name;
          titulo.className = "text-2xl text-red-600";
          // crear precio
          const precio = document.createElement('div'); 
          precio.textContent = formatPrice(item.price);

          const contenedor = document.createElement('div');
          contenedor.className = "container-style p-5 flex flex-col items-center text-center rounded-3xl "
          contenedor.append(imagen,titulo,precio);

          todosLosItems.push(contenedor);
        });

        appNode.append(...todosLosItems);
    })