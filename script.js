const btnCargar = document.getElementById("btnCargar");
const inicio = document.getElementById("inicio");
const loader = document.getElementById("loader");
const contenedor = document.getElementById("productos");

// URL de la API (Punto 6)
const API_URL = "https://api.escuelajs.co/api/v1/products";

btnCargar.addEventListener("click", () => {
    // Punto 8: Flujo de interacción
    inicio.classList.add("oculto");
    loader.classList.remove("oculto");
    document.body.style.backgroundColor = "#050505"; 

    // Punto 6: Consumo de API con fetch
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            // Simulamos un pequeño retraso para que el loader sea visible (Punto 8)
            setTimeout(() => {
                loader.classList.add("oculto");
                contenedor.classList.remove("oculto");
                mostrarProductos(data);
            }, 800);
        })
        .catch(err => {
            console.error("Error Andy:", err);
            loader.innerHTML = "<p style='color:red'>Error al conectar con el servidor.</p>";
        });
});

function mostrarProductos(productos) {
    contenedor.innerHTML = "";

    // Punto 7: Renderizado dinámico
    productos.slice(0, 12).forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");

        // Limpieza de URL de imagen
        let imgUrl = item.images[0];
        if (imgUrl && imgUrl.includes('["')) {
            imgUrl = imgUrl.replace('["', '').replace('"]', '');
        }

        // Punto 3: Diseño de la tarjeta con todos los campos
        card.innerHTML = `
            <img src="${imgUrl}" alt="${item.title}" onerror="this.src='https://placehold.co/150x150?text=Sin+Imagen'">
            <div class="card-content">
                <h3>${item.title}</h3>
                <p>${item.description.substring(0, 85)}...</p>
                <small style="color: #52525b; display: block; margin-top: 10px;">Categoría: ${item.category.name}</small>
            </div>
            <div class="precio">
                $${item.price}
            </div>
        `;
        contenedor.appendChild(card);
    });
}