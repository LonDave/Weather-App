const menuButton = document.querySelector('.menu');
const navLinks = document.querySelector('.nav-links');
const bottone = document.querySelector('.btn-ricerca');
const input = document.querySelector('.input-citta');


// Menù burger
menuButton.addEventListener('click', () =>{
    navLinks.classList.toggle('open');
});


// Bottone 
bottone.addEventListener('click', ()=>{

    // Prende il valore e lo assegna ad una variabile
    const cittaScritta = input.value; 

    // 1. Coordinate per la città inserita richieste al server. fetch richiede i dati grezzi, then li trasforma in un 
    // oggetto manipolabile e con il secondo then da un nome per usare l'oggetto
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cittaScritta}&count=1`).then(response=>response.json()).then(datiGeografici=>{

        // Controllo esistenza e dimensione, se la città non esiste l'array risultati sarà vuoto
        if (!datiGeografici.results || datiGeografici.results.length === 0){
            alert("Città non trovata");
            return;
        }

        // Estrazione latitudine, longitudine e nome
        const lat = datiGeografici.results[0].latitude;
        const lon = datiGeografici.results[0].longitude;
        const nomeCorretto = datiGeografici.results[0].name;

        // 2. Uso delle coordinate per chiedere il meteo reale
        return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`).then(response => response.json()).then(datiMeteo =>{

            // 3. Aggiornamento HTML
            document.querySelector('#citta').innerText = nomeCorretto;
            document.querySelector('#tempepratura').innerText = `${datiMeteo.current_weather.temperature}°C`;

            console.log("Dati completi del meteo: ", datiMeteo.current_weather);
        });
    })

    .catch(errore =>{
        console.error("Si è verificato un errore di rete:", errore);
    })

});

