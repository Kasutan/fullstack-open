const http = require('http') //importe le module "CommonJS" http natif de node
//la syntaxe est différente des modules ES6 utilisés en front (import/export) mais pour notre besoin fonctionne pareil
//En fait on va rapidement utiliser express à la place du http natif de node

let notes = [{
	id: 1,
	content: "HTML is easy",
	date: "2019-05-30T17:30:31.098Z",
	important: true
}, {
	id: 2,
	content: "Browser can execute only Javascript",
	date: "2019-05-30T18:39:34.091Z",
	important: false
}, {
	id: 3,
	content: "GET and POST are the most important methods of HTTP protocol",
	date: "2019-05-30T19:20:14.298Z",
	important: true
}]

const app = http.createServer((request, response) => {
	//lie un event handler au serveur
	//ponse = réponse renvoyée à chaque requête HTTP faite au serveur

	response.writeHead(200, {
		'Content-Type': 'application/json'
	})
	response.end(JSON.stringify(notes))
})

const port = 3001
app.listen(port)
//lie le serveur à un port - pour savoir quelles requêtes HTTP écouter
console.log(`Server running on port ${port}`)