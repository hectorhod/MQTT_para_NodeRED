[
  {
    "id": "mqtt_broker",
    "type": "mqtt-broker",
    "name": "Broker MQTT",
    "broker": "192.168.0.100",
    "port": "1883",
    "clientid": "",
    "usetls": false,
    "protocolVersion": "4",
    "keepalive": "60",
    "cleansession": true
  },
  {
    "id": "mqtt_in",
    "type": "mqtt in",
    "z": "flow1",
    "name": "DHT11 MQTT",
    "topic": "casa/sensor/dht",
    "qos": "0",
    "datatype": "auto",
    "broker": "mqtt_broker",
    "x": 120,
    "y": 100,
    "wires": [["json_node"]]
  },
  {
    "id": "json_node",
    "type": "json",
    "z": "flow1",
    "name": "Converter JSON",
    "property": "payload",
    "action": "",
    "pretty": false,
    "x": 320,
    "y": 100,
    "wires": [["debug_node", "temp_func", "hum_func"]]
  },
  {
    "id": "debug_node",
    "type": "debug",
    "z": "flow1",
    "name": "Debug completo",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "payload",
    "x": 550,
    "y": 60,
    "wires": []
  },
  {
    "id": "temp_func",
    "type": "function",
    "z": "flow1",
    "name": "Temperatura",
    "func": "msg.payload = msg.payload.temperatura;\nreturn msg;",
    "x": 520,
    "y": 120,
    "wires": [["debug_temp"]]
  },
  {
    "id": "debug_temp",
    "type": "debug",
    "z": "flow1",
    "name": "Temp (°C)",
    "active": true,
    "tosidebar": true,
    "complete": "payload",
    "x": 730,
    "y": 120,
    "wires": []
  },
  {
    "id": "hum_func",
    "type": "function",
    "z": "flow1",
    "name": "Umidade",
    "func": "msg.payload = msg.payload.umidade;\nreturn msg;",
    "x": 510,
    "y": 180,
    "wires": [["debug_hum"]]
  },
  {
    "id": "debug_hum",
    "type": "debug",
    "z": "flow1",
    "name": "Umidade (%)",
    "active": true,
    "tosidebar": true,
    "complete": "payload",
    "x": 730,
    "y": 180,
    "wires": []
  }
]