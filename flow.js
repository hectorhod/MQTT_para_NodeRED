[
  {
    "id": "mqtt_in",
    "type": "mqtt in",
    "z": "flow1",
    "name": "DHT11",
    "topic": "casa/sensor/dht",
    "broker": "mqtt_broker",
    "x": 120,
    "y": 140,
    "wires": [["json"]]
  },
  {
    "id": "json",
    "type": "json",
    "z": "flow1",
    "name": "Parse JSON",
    "property": "payload",
    "action": "",
    "pretty": false,
    "x": 290,
    "y": 140,
    "wires": [["insert_db"]]
  },
  {
    "id": "insert_db",
    "type": "function",
    "z": "flow1",
    "name": "Insert SQLite",
    "func": "const t = msg.payload.temperatura || 0;\nconst h = msg.payload.umidade || 0;\nmsg.topic = `INSERT INTO leituras (temperatura, umidade) VALUES (${t}, ${h})`;\nreturn msg;",
    "x": 470,
    "y": 140,
    "wires": [["sqlite_exec"]]
  },
  {
    "id": "sqlite_exec",
    "type": "sqlite",
    "z": "flow1",
    "mydb": "db",
    "sqlcmd": "str",
    "name": "DB Exec",
    "x": 640,
    "y": 140,
    "wires": [["select_db"]]
  },
  {
    "id": "select_db",
    "type": "function",
    "z": "flow1",
    "name": "Select últimos",
    "func": "msg.topic = \"SELECT * FROM leituras ORDER BY id DESC LIMIT 20\";\nreturn msg;",
    "x": 810,
    "y": 140,
    "wires": [["sqlite_query"]]
  },
  {
    "id": "sqlite_query",
    "type": "sqlite",
    "z": "flow1",
    "mydb": "db",
    "sqlcmd": "str",
    "name": "DB Query",
    "x": 980,
    "y": 140,
    "wires": [["formatar"]]
  },
  {
    "id": "formatar",
    "type": "function",
    "z": "flow1",
    "name": "Formatar",
    "func": "if (!Array.isArray(msg.payload)) return null;\n\nmsg.payload = msg.payload.map(row => ({\n    id: row.id,\n    temperatura: row.temperatura,\n    umidade: row.umidade,\n    data: row.timestamp || new Date().toLocaleString()\n}));\n\nreturn msg;",
    "x": 1150,
    "y": 140,
    "wires": [["ui_table"]]
  },
  {
    "id": "ui_table",
    "type": "ui-table",
    "z": "flow1",
    "group": "ui_group_sensors",
    "name": "Tabela Sensores",
    "order": 1,
    "width": "12",
    "height": "8",
    "columns": [
      { "key": "id", "label": "ID", "width": "50px" },
      { "key": "temperatura", "label": "Temp (°C)" },
      { "key": "umidade", "label": "Umid (%)" },
      { "key": "data", "label": "Data/Hora" }
    ],
    "x": 1340,
    "y": 140,
    "wires": []
  },
  {
    "id": "mqtt_broker",
    "type": "mqtt-broker",
    "name": "Broker Local",
    "broker": "localhost",
    "port": "1883"
  },
  {
    "id": "db",
    "type": "sqlitedb",
    "db": "/home/hector/Arduino/MQTT_para_NodeRED/database/sensores.db",
    "mode": "RWC"
  },
  {
    "id": "ui_group_sensors",
    "type": "ui-group",
    "name": "Dados em Tempo Real",
    "page": "ui_page_monitor",
    "width": "12"
  },
  {
    "id": "ui_page_monitor",
    "type": "ui-page",
    "name": "Monitoramento",
    "path": "/dashboard",
    "layout": "grid"
  }
]
