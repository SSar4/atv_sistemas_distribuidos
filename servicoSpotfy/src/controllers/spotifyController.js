require('dotenv').config()
var request = require('request');
var axios = require('axios').default;

var client_id = process.env.Client_ID;
var client_secret = process.env.Client_Secret;
var redirect_uri = process.env.Redirect_URI;

  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      redirect_uri: redirect_uri,
      grant_type: 'client_credentials'
    },
    headers: {
      'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
    },
    json: true
  };
  

module.exports = {

  async SearchArtist(req, res) {
    const {name} = req.params

    request.post(authOptions,function (error, response, body) {
      if(!error && response.statusCode === 200){
        console.log(body.access_token)
        axios({
          method:'get',
          url:`https://api.spotify.com/v1/search?query=${name}&offset=0&limit=20&type=artist`,
          headers:{
            'Authorization': 'Bearer '+body.access_token
          }
        }).then((data)=>{
         
          res.json(data.data.artists.items)
        }).catch((e)=> res.json([]))
        
      }else{
        res.send([])
      }
      
    });
  },

  async Recomend(req,res){
    const {id} = req.params

    request.post(authOptions,function (error, response, body) {
      if(!error && response.statusCode === 200){
        console.log(body.access_token)
        axios({
          method:'get',
          url:`https://open.spotify.com/artist/${id}`,
          headers:{
            'Authorization': 'Bearer '+body.access_token
          }
        }).then((data)=>{
          console.log(data)
          res.send(data.data)
        }).catch((e)=>console.log(e))
        
      }else{
        res.send('erro')
      }
      
    });
  }

};