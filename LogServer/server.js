#!/usr/bin/env node

const MicroGear = require('microgear');
const mysql     = require('mysql');

const APPID  = process.env.MAPPID;
const KEY    = process.env.MKEY;
const SECRET = process.env.MSECRET;
const HOST   = process.env.DB_HOST;
const USER   = process.env.DB_USER;
const PASS   = process.env.DB_PASS;
const DB     = 'senior';

const sql = mysql.createConnection({
  host     : HOST,
  user     : USER,
  password : PASS,
  database : DB
});

const microgear = MicroGear.create({
    key    : KEY,
    secret : SECRET
});

sql.connect();
microgear.connect(APPID);

microgear.on('connected', function() {
    console.log('Connected...');
    microgear.setAlias('LogServer');
    microgear.subscribe('/#');
    microgear.useTLS(true);
});

microgear.on('message', function(topic,body) {
    console.log('incoming : ' + topic + ' : ' + body);

    var msg = topic.split('/');
    var deviceName = msg[2];

    if(msg[3] == 'switch') {
        var dataType = '1';
    } else if(msg[3] == 'sensor') {
        var dataType = '2';
    }

    var command = "SELECT did FROM devices WHERE name = '" + deviceName + "' LIMIT 1;";

    // get device id
    sql.query(command, function (error, results, fields) {
        if (error) throw error;
        if (results[0].did == null) return;

        // insert database
        var did = results[0].did;
        command = "INSERT INTO devicelog (type, value, did) VALUES ('" + dataType + "', '" + body + "', '" + did + "');";

        sql.query(command, function (error, results, fields) {
            if (error) throw error;
        });
    });
});