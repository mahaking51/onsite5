const express=require('express');
const bodyParser=require('body-parser');
const app=express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
const axios = require('axios');
var tkn = "Bearer BQAowA-N-XrpgVxExyK4Rt2aLGHXlB6cEq6DCj3vVhyLPXxeB9vNg_T4W24gUhjvezakLHtssOsImvwidlG4H3h0Ce7Ppjvy3R0b2Ze04B4rjMd0K7A4GAQDIXxFC7i-JKY8IXvWoLdq9-VtFCGtiXp8cDy8OufJSKjQzs7xeDkNFwjEQ4lv1NhSbQkmzYSa_Wc4bo9IfepYiJ2RDvRTqqV-TXqM5beA7qsM6eFeyN_RRzDktW8"
var request = require("request");
let sec=[]

app.get('/',async function(req,res){
    sec=[]
    res.render('home',{});
})

id='7zFBW2JxM4bgTTKxCRcS8Q';

app.get('/result',async function(req,res){
    imgLink=[];
    name=[];

    for(var i=0;i<sec.length;i++){
        let {error,data} =await axios.get('https://api.spotify.com/v1/artists/'+sec[i],{headers:{Authorization:tkn}});
        imgLink.push(data.images[0].url);
        name.push(data.name);
    }
    console.log(imgLink,name);
    res.render('result',{imgLink:imgLink,name:name})
})

app.post('/',async function(req,res){
    artistInfo=[]
    id1=req.body.a1;
    id2=req.body.a2;
    id='7zFBW2JxM4bgTTKxCRcS8Q';
    count=0;
    related=[];
    sec=[];

    // await main();
    // await request({url:'https://api.spotify.com/v1/artists/'+id+'/related-artists',headers:{Authorization:tkn}},async function(req,res){
    //     artistInfo=JSON.parse(res.body).artists;
    //     // for(var i=0;i<20;i++){
    //     //     related.push(artistInfo[i].id)
    //     // }
    // }) 
    // console.log(artistInfo);

    // let {error,data} =await axios.get('https://api.spotify.com/v1/artists/'+id+'/related-artists',{headers:{Authorization:tkn}});
    // response =data;

    // console.log(response.artists.length)
    while(1){
            if(count==0){
                let {error,data} =await axios.get('https://api.spotify.com/v1/artists/'+id1+'/related-artists',{headers:{Authorization:tkn}});
                for(var i=0;i<data.artists.length;i++){
                    artistInfo.push(data.artists[i].id);
                }
                if(artistInfo.includes(id2)){
                    sec.push(id1);
                    sec.push(id2);
                    count++;
                    break;
                }
                sec.push(id1);
                count++
            }
            else{
                flag=0;
                    for(var i=0;i<artistInfo.length;i++){
                        let {error,data} =await axios.get('https://api.spotify.com/v1/artists/'+artistInfo[i]+'/related-artists',{headers:{Authorization:tkn}});
                        for(var j=0;j<data.artists.length;j++){
                            related.push(data.artists[j].id);
                        }
                        if(related.includes(id2)){
                            sec.push(artistInfo[i])
                            sec.push(id2);
                            count++;
                            flag=1
                            break;
                        }
                        if(i==(artistInfo.length-1)){
                            count++;
                            i=0;
                            artistInfo=[]
                            for(var k=0;k<related.length;k++){
                                artistInfo.push(related[k]);
                            }
                            related=[];
                            console.log(artistInfo)

                        }
                    }

                if(flag==1){
                    break;
                }


            }
        
    }
   console.log(sec);
   res.redirect('/result')
})  

app.listen(3000,function(){
    console.log("server started in port 3000");
    
})


