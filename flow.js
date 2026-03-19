[
    {
        "id": "insert_db",
        "type": "function",
        "z": "df833b2739c0bbf8",
        "name": "Insert SQLite",
        "func": "const t = msg.payload.temperatura || 0;\nconst h = msg.payload.umidade || 0;\nmsg.topic = `INSERT INTO leituras (temperatura, umidade) VALUES (${t}, ${h})`;\nreturn msg;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 400,
        "y": 100,
        "wires": [
            [
                "sqlite_exec"
            ]
        ]
    }
]
