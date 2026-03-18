#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>

// ===== WIFI =====
const char* ssid = "SEU_WIFI";
const char* password = "SUA_SENHA";

// ===== MQTT =====
const char* mqtt_server = "192.168.0.100"; // IP do broker
const int mqtt_port = 1883;
const char* mqtt_topic = "casa/sensor/dht";

// ===== DHT =====
#define DHTPIN D5
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

// ===== CLIENTES =====
WiFiClient espClient;
PubSubClient client(espClient);

// ===== CONECTAR WIFI =====
void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Conectando no WiFi...");

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nWiFi conectado!");
}

// ===== CONECTAR MQTT =====
void reconnect() {
  while (!client.connected()) {
    Serial.print("Conectando ao MQTT...");

    if (client.connect("NodeMCU_DHT11")) {
      Serial.println("conectado!");
    } else {
      Serial.print("falhou, rc=");
      Serial.print(client.state());
      Serial.println(" tentando novamente em 5s");
      delay(5000);
    }
  }
}

// ===== SETUP =====
void setup() {
  Serial.begin(115200);
  dht.begin();
  setup_wifi();

  client.setServer(mqtt_server, mqtt_port);
}

// ===== LOOP =====
void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  float t = dht.readTemperature();
  float h = dht.readHumidity();

  if (isnan(t) || isnan(h)) {
    Serial.println("Erro ao ler DHT!");
    return;
  }

  // JSON
  String payload = "{";
  payload += "\"temperatura\":" + String(t) + ",";
  payload += "\"umidade\":" + String(h);
  payload += "}";

  Serial.println(payload);

  client.publish(mqtt_topic, payload.c_str());

  delay(5000);
}