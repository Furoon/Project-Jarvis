const Influx = require("influx");
const log = require("../log/log")("influx");
const os = require("os");
const dotenv = require("dotenv");
const { env } = require('process');

const influx = new Influx.InfluxDB({
    host: "192.168.178.73",
    database: "sensordata",
    schema: [
        {
            measurement: "roomsensors",
            fields: {
                temperature: Influx.FieldType.FLOAT,
                humidity: Influx.FieldType.FLOAT,
                pressure: Influx.FieldType.INTEGER,
                lightlevel: Influx.FieldType.INTEGER
            },
            tags: ["room"],
        },
    ],
});

//INFO - Sensordaten eingeben
async function influxRoomsensorWrite(data) {
    influx.writePoints([{
        measurement: "roomsensors",
        tags: { room: data.room},
        fields: {
            temperature: data.temperature,
            humidity: data.humidity,
            lightlevel: data.lightlevel,
            pressure: data.pressure
        },
    },])
    .catch((err) => {
        log.error(err.stack);
    });
};

//INFO - Sensordaten abrufen
async function queryByRoom(room, limit) {
    try {
        const data = influx.query(`SELECT * from roomsensors WHERE room = '${room}' ORDER by time desc limit ${limit}`)
        return data
    } catch (error) {
        log.error(error)
    }
};


//INFO - Neue Datenbank erstellen
async function createDB(newDB) {
    influx.getDatabaseNames().then((names) => {
    if (!names.includes(newDB)) {
        log.info("Neue Datenbank wird erstellt")
        return influx.createDatabase(newDB);
    }
    log.info("Datenbank bereits vorhanden")
})};


//TODO - Sensordaten finden und löschen



module.exports = { influxRoomsensorWrite,  queryByRoom, createDB };
log.debug("module was loaded");