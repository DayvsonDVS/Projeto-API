const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var DB = {

    games: [
        {
            id: 1,
            title: "call of duty",
            year: 2010,
            price: 60
        },
        {
            id: 2,
            title: "starcraft",
            year: 2010,
            price: 25
        },

        {
            id: 3,
            title: "halo",
            year: 2008,
            price: 15
        }


    ]

}

app.get("/games", (req, res) => {
    res.statusCode = 200;
    res.json(DB.games);
})

function findAll(year) {
    var result = [];
    DB.games.forEach(item => {
        if (item.year == year) {
            result.push(item)
        }
    })
    return result;
}


app.get("/games/:title", (req, res) => {
    var title = req.params.title;
    if (!isNaN(title)) {
        res.sendStatus(400);
    } else {
        var game = DB.games.find(x =>
            x.title == title
        );

        if (game != undefined) {
            res.statusCode = 200;
            res.json(game);
        }
        else {
            res.sendStatus(404);
            res.json(game);
        }

    }

})

app.get("/games/filter/:year", (req, res) => {
    var year = req.params.year;
    res.json(findAll(year));
})

app.post("/games", (req, res) => {
    var { title, price, year } = req.body;

    DB.games.push({
        id: 21,
        title,
        price,
        year
    });
    res.sendStatus(200);
})

app.delete("/games/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);

    } else {
        var id = parseInt(req.params.id);
        var index = DB.games.findIndex(x => x.id == id);

        if (index == -1) {
            res.sendStatus(404);

        } else {
            DB.games.splice(index, 1);
            res.sendStatus(200);
        }
    }

})

app.put("/games/:id", (req, res) => {

    if (isNaN(req.params.id)) {
        res.sendStatus(400);

    } else {
        var id = parseInt(req.params.id);
        var game = DB.games.find(x => x.id == id);

        if (game != undefined) {
            var { title, price, year } = req.body;

            if(title != undefined){
                game.title = title;

            }
            if(price != undefined){
                game.price = price;
            }
            if(year != undefined){
                game.year = year;
            }

            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    }
})



app.listen(4000, () => {
    console.log("API Online!")
})