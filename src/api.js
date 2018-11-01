import axios from 'axios';

export default axios.create({
    "baseURL": 'https://api.dmxweb.com.br/api/v1',
    "headers": {
        "Content-Type": "application/json",
        "Authorization": "BearereyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjE2LCJpc3MiOiJodHRwczovL2FwaS5kbXh3ZWIuY29tLmJyL2FwaS92MS9sb2dpbiIsImlhdCI6MTU0MDk5NDUxNiwiZXhwIjoxNTQxMDIzMzE2LCJuYmYiOjE1NDA5OTQ1MTYsImp0aSI6ImRaSUN4MmRuRkEyUWl6c00ifQ.RpMpWD6EUYkrmgnGGCfb0Dyvu1BSyGuD2m-LyErsqu4"
    }
})