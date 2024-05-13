const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const con = mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    port:process.env.DB_PORT
})

con.connect((err)=>{
    if(err){
        console.log(err.message);
    }

    console.log('db ' + con.state);

});

class Dbservice{
    static getDBServiceInstance(){

        
        return instance ? instance : new Dbservice();
    }

    async getAllGames(){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "select * FROM games;";

                con.query(query, (err, results) =>{
                    if(err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            console.log(response);
            return response;

        } catch(error){
            console.log(error);
        }
    }

    async getAllliveGames(){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "select * FROM games where gamestatus='live'";

                con.query(query, (err, results) =>{
                    if(err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            console.log(response);
            return response;

        } catch(error){
            console.log(error);
        }
    }

    async newGame(sport, team1name, team2name, team1score, team2score, m, s, tournamentname, id, gamestatus){
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "INSERT INTO games (sport, teamnameone, teamnametwo, teamscoreone, teamscoretwo, tournamentname, timem, times, id, gamestatus) VALUES (?,?,?,?,?,?,?,?,?,?) ";

                con.query(query, [sport, team1name, team2name, team1score, team2score, tournamentname, m, s, id, gamestatus], (err, results) =>{
                    if(err) reject(new Error(err.message));
                    console.log(results);
                    resolve(results);
                })
            });

            console.log(response);
            return response;
            
        } catch (error) {
            console.log(error);
        }
    }

    async updateGame(id, team1score, team2score, m, s, gamestatus){
        try {
            
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE games SET teamscoreone = ?, teamscoretwo = ?, timem = ?, times = ?, gamestatus = ? WHERE id = ?";

                con.query(query, [ team1score, team2score, m, s, gamestatus, id], (err, results) =>{
                    if(err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;
            
        } catch (error) {
            console.log(error);
        }
    }

    async getAllId(){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "select id FROM games;";

                con.query(query, (err, results) =>{
                    if(err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            console.log(response);
            return response;

        } catch(error){
            console.log(error);
        }
    }
}

module.exports = Dbservice;

