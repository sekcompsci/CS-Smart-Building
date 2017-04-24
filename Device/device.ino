// Coding with Sumlime Text 3 & Stino
#include <ESP8266WiFi.h>
#include <MicroGear.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <EEPROM.h>

const char* ssid     = "MrNiranam-iPad";
const char* password = "a1b2c3d4";

#define APPID   "CSSmartBuilding"
#define KEY     "xCj34oZJAAhl1aE"
#define SECRET  "qHUBQH8mMUoBjQg6Tzur55aq0"
#define ALIAS   "Device"

/*  1. Declare a client as WiFiClientSecure instead of WiFiClient. */
WiFiClientSecure client;

int timer = 0;
MicroGear microgear(client);

// Config DHT Sensor
#define DHTTYPE DHT11
#define DHTPIN 12
DHT dht(DHTPIN, DHTTYPE);

// Config LED & LDR Pin
#define LED 2
#define Switch 15
#define LDR A0
int Switch_value, ldr_value;

// Initial time & delay for millis()
long timeSwitch = 0;
long timeSensor = 0;
long DelaySwitch = 1000;
long DelaySensor = 5000;

char data[32]; // temp string with char array

void onMsghandler(char *topic, uint8_t* msg, unsigned int msglen) {
  Serial.print("Incoming message --> ");
  msg[msglen] = '\0';
  Serial.println((char *)msg);
}

void onFoundgear(char *attribute, uint8_t* msg, unsigned int msglen) {
  Serial.print("Found new member --> ");
  for (int i = 0; i < msglen; i++)
    Serial.print((char)msg[i]);
  Serial.println();
}

void onLostgear(char *attribute, uint8_t* msg, unsigned int msglen) {
  Serial.print("Lost member --> ");
  for (int i = 0; i < msglen; i++)
    Serial.print((char)msg[i]);
  Serial.println();
}

void onConnected(char *attribute, uint8_t* msg, unsigned int msglen) {
  Serial.println("Securely connected to NETPIE...");
  microgear.setAlias(ALIAS);
}

void setup() {
  Serial.begin(115200);
  dht.begin();

  pinMode(Switch, INPUT); // Switch Pin
  pinMode(LDR, INPUT); // LDR Pin
  pinMode(LED, OUTPUT); // LED Pin

  /* Event listener */
  microgear.on(MESSAGE, onMsghandler);
  microgear.on(PRESENT, onFoundgear);
  microgear.on(ABSENT, onLostgear);
  microgear.on(CONNECTED, onConnected);

  Serial.print("\nStarting...");
  if (WiFi.begin(ssid, password)) {

    while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print(".");
    }
  }

  Serial.println("\nWiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  /* 2. Call microgear.useTLS(true) before initial */
  microgear.useTLS(true);
  microgear.init(KEY, SECRET, ALIAS);
  microgear.connect(APPID);
}

void loop() {
  if (microgear.connected()) {
    Serial.println("connected");
    microgear.loop();
    if ((millis() - timeSensor) > DelaySensor) {
      // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
      float h = dht.readHumidity();
      // Read temperature as Celsius (the default)
      float t = dht.readTemperature();

      // Check if any reads failed and exit early (to try again).
      if (isnan(h) || isnan(t)) {
        Serial.println("Failed to read from DHT sensor!");
        return;
      }

      // Compute heat index in Celsius (isFahreheit = false)
      float hic = dht.computeHeatIndex(t, h, false);

      ldr_value = analogRead(LDR); //reads the LDR values

      Serial.print("Switch value = ");
      Serial.println(Switch_value);
      Serial.print("LDR value = ");
      Serial.println(ldr_value);

      Serial.print("Humidity: ");
      Serial.print(h);
      Serial.print(" %\t");
      Serial.print("Temperature: ");
      Serial.println(t);
      Serial.println("-------------------------------");

      int h2 = (h - (int)h) * 100;
      int t2 = (t - (int)t) * 100;

      sprintf(data, "%d:%d.%d:%d.%d", ldr_value, (int)h, h2, (int)t, t2);

      microgear.publish("/device01/sensor", data, true);

      timeSensor = millis();
    }
    else if ((millis() - timeSwitch) > DelaySwitch) {
      Switch_value = digitalRead(Switch); //reads the Switch values
      if (Switch_value == HIGH) {
        digitalWrite(LED, HIGH);   // turn the LED on
      }
      else if (Switch_value == LOW) {
        digitalWrite(LED, LOW);   // turn the LED off
      }

      microgear.publish("/device01/switch", Switch_value, true);
      timeSwitch = millis();
    }
  }
  else {
    Serial.println("connection lost, reconnect...");
    if (timer >= 5000) {
      microgear.connect(APPID);
      timer = 0;
    }
    else timer += 100;
  }

  delay(100);
}
