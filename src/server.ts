import express from 'express'
import fs from 'fs'
import jsonBody from "body/json.js"
import { Estates, SearchFormData } from "./interfases.js"
const port = process.env.PORT || 3000;
const app = express();
app.use('/', express.static('public'));
app.post('/estates', (req, res) => {
    fs.readFile('src/estates.json', "utf-8", (err, data) => {
        if (!err) {
            const estates: Estates[] = JSON.parse(data);
            const find: Estates[] = [];
            jsonBody(req, res, function (err: Error, formData: SearchFormData) {
                for (const estate of estates) {
                    if (estate.city == formData.inputCity && estate.free && estate.price <= formData.inputMaxPrice) {
                        find.push(estate)
                    }
                }
                res.send(JSON.stringify(find))
            })
        }
    })

})
app.listen(port, () => console.log(`Listen on port ${port}...`));