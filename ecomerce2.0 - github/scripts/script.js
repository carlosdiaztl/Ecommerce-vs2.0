//Declaración de todas las funciones

//Get de la data en el JSON server
const getData = async (url) => {
    try {
        const resp = await fetch(url);
        const data = await resp.json();
        return data;

    } catch (error) {
        console.log(error);
        return null;
    }
}



//Función para imprimir cards

const printCards = (arreglo, contenedor) => {
    contenedor.innerHTML = '';
    arreglo.forEach(element => {
        const { id, image_product: image, name, type, price } = element;
        contenedor.innerHTML += `
        <article class="card">
                    <button class="delete">X</button>
                    <img src="${image}" alt="${name}">
                    <div class="textCard">
                        <h6>${type}</h6>
                        <h5>${name}</h5>
                        <span>$${price.toLocaleString()}</span>
                        <div class="cantidad">
                            <button class="decremento" name="${id}">-</button>
                            <span id="${id}">1</span>
                            <button class="incremento" name="${id}">+</button>
                        </div>
                    </div>
                </article>
        `
    });
}

//Función de filtrado

const filter = (arreglo, parametroDeFiltrado) => {
    const filtrar = arreglo.filter(item => item.type === parametroDeFiltrado);
    return filtrar;
}

//Extraer las categorías o types de la data: 1. Obtener un arreglo con las categorías (Recordemos que mombramos los id de los botones de filtrado con el mismo nombre del type category)
const extraerCategorías = (arreglo) => {
    const arregloConTodasCategorías = arreglo.map(item => item.type);
    const arregloCategorías = [...new Set(arregloConTodasCategorías)];
    return arregloCategorías;
}


//Declaración de constantes y variables globales
const URL = 'http://localhost:3000/products';


//Escuchar los eventos
document.addEventListener('DOMContentLoaded', async () => {
    const containerCards = document.getElementById('containerCards');
    const products = await getData(URL);
    printCards(products, containerCards);

    const categorias = extraerCategorías(products);

    //Escuchar el evento click de los botones de filtrado
    categorias.forEach(idBotones => {
        //Capturamos todos los botones del filtrado
        const botonesFiltrado = document.getElementById(idBotones);
        botonesFiltrado.addEventListener('click', () => {
            Swal.fire(
                'Has filtrado!',
                'Dentro de poco se mostrará el resultado del filtro',
                'success'
            );
            const filteredProducts = filter(products, idBotones);
            printCards(filteredProducts, containerCards);
        })

    });

});





