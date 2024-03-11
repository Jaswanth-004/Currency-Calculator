import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render("index.ejs");
  });

app.post("/newCurrency", async (req, res) =>{
    try{
        const oldMoney = req.body["oldCurrency"];
        const newMoney = req.body["newCurrency"];
        const result = await axios.get("https://v6.exchangerate-api.com/v6/512cd86ccefadc4a018fb3d7/latest/"+oldMoney);
        const value = result.data.conversion_rates[newMoney];
        const money = value*req.body["amount"];
        res.render("index", { currency: newMoney, newValue: money.toFixed(2) });
      
    }catch (error) {
        if (error.response && error.response.data) {
            console.log(error.response.data);
        } else {
            console.error(error);
        }
        res.status(500).render("index.ejs");
    }
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});