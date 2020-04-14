//npm install express
const express = require('express') //plus agréable que le module http natif de node
const app = express()
//express est une fonction utilisée pour créer une application express stockée dans la variable app

//on va utiliser le parser json de express pour accéder aux données envoyées avec une requête POST
app.use(express.json())

//Notre propre fonction middle ware
const requestLogger = (request, response, next) => {
	console.log('Method:', request.method)
	console.log('Path:  ', request.path)
	console.log('Body:  ', request.body)
	console.log('---')
	next() // passe la main à la fonction middleware suivante
}
app.use(requestLogger) // doit être appelée après json sinon request.body est vide

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

//on définit une route (un event handler) qui répond aux requêtes HTTP GET adressées à la racine
app.get('/', (req, res) => {
	res.send('<h1>Hello World!</h1>')
	//à noter : utilisation de la méthode send de l'objet réponse
	//cette méthode identifie qu'on envoie une chaine, et envoie les en-têtes appropriées (cf. F12 / onglet réseau)
})

//on définit une autre route (un event handler) qui répond aux requêtes HTTP GET adressées au chemin /api/notes
app.get('/api/notes', (req, res) => {
	res.json(notes)
	//ici, on utilise la méthode json, express adapte l'en-tête Content-Type, et "stringify" notre objet JS
})

//on peut ajouter des paramètres dans les routes avec ":" (syntaxe express)
app.get('/api/notes/:id', (request, response) => {
	//l'id de la note demandée se trouve en paramètre de la requête
	const id = Number(request.params.id)
	//attention le paramètre est de type string ! Il faut le convertir en nombre sinon le test de find renverra toujours false
	const note = notes.find(note => note.id === id)//on retrouve la note avec l'id demandé - on est côté serveur, on a accès à l'objet notes ! 
	if(note) {
		//la note est renvoyée au demandeur au format json, si elle existe ! (si elle n'existe pas, note est undefined)
		response.json(note) 
	} else {
		//sinon on renvoit une réponse avec un statut 404
		// la méthode end() permet de répondre à la requête sans donnée
		response.status(404).end()
	}
})

//création d'une route pour effacer une ressource
app.delete('/api/notes/:id', (request, response) => {
	const id= Number(request.params.id)
	//on retire la note dont l'id correspond au paramètre de la requête de l'objet note
	//on est toujours côté serveur, on peut agir directement sur l'objet note
	notes = notes.filter(note => note.id !== id)
	//statut 204 : "pas de contenu" + end() pour répondre sans données
	response.status(204).end()
})

const generateId = () => {
	const maxId = notes.length > 0
		? Math.max(...notes.map(n => n.id)) //l'opérateur ... permet de convertir l'objet renvoyé par map en un tableau simple que Math.max accepte
		: 0
	return maxId + 1
}

//route pour ajouter des ressources
app.post('/api/notes', (request, response) => {
	//utile pour le débug : console.log(request.headers)

	//la propriété body est accessible parce qu'on utilise le parseur json de express. Il prend les données de la requête au format json, les convertit en objet JS, place cet objet dans body PUIS exécute la fonction gestionnaire de route
	const body = request.body

	//vérifier qu'il y a un contenu
	if(!body.content) {
		//ne pas oublier return, sinon le reste du code est exécuté
		return response.status(400).json({
			error : 'content missing'
		})
	}

	//on construit la nouvelle note en ne gardant que les propriétés qui nous intéressent de la requête, et en attribuant des valeurs par défaut selon le besoin
	const note = {
		content: body.content,
		important : body.important || false, // si important est undefined -> false
		date: new Date(),
		id : generateId(),
	}
	
	

	notes = notes.concat(note)
	response.json(note)
})

//cas particulier d'une fonction middleware appelée après les routes : permet d'attraper les requêtes vers des routes qui n'existent pas
const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}
	
app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})