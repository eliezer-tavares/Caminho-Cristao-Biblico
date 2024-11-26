from flask import Flask, render_template, request, redirect, url_for, jsonify
import sqlite3

app = Flask(__name__)

# Conexão com o banco de dados
def get_db_connection():
    conn = sqlite3.connect('ranking.db')
    conn.row_factory = sqlite3.Row
    return conn

# Inicialização do banco de dados
def init_db():
    conn = get_db_connection()
    conn.execute(''' 
        CREATE TABLE IF NOT EXISTS rankings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL,
            pontuacao INTEGER NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

init_db()

# Função para salvar o resultado no banco de dados
def salvar_resultado(nome, email, pontuacao):
    conn = get_db_connection()
    conn.execute('INSERT INTO rankings (nome, email, pontuacao) VALUES (?, ?, ?)', (nome, email, pontuacao))
    conn.commit()
    conn.close()

# Função para obter o ranking
def obter_ranking():
    conn = get_db_connection()
    rankings = conn.execute('SELECT nome, pontuacao FROM rankings ORDER BY pontuacao DESC').fetchall()
    conn.close()
    return rankings

# Rotas
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/biblia")
def biblia():
    return render_template("biblia.html")

@app.route("/sobre")
def sobre():
    return render_template("sobre.html")

@app.route("/reflexoes")
def reflexoes():
    return render_template("reflexoes.html")

@app.route("/cristianismo")
def cristianismo():
    return render_template("cristianismo.html")

@app.route("/quiz")
def quiz():
    return render_template("quiz.html")

@app.route("/salvar_pontuacao", methods=["POST"])
def salvar_pontuacao():
    dados = request.get_json()
    nome = dados.get("nome")
    email = dados.get("email")
    pontuacao = dados.get("pontuacao")

    if nome and email and pontuacao is not None:
        salvar_resultado(nome, email, pontuacao)
        return jsonify({"message": "Pontuação salva com sucesso!"}), 200
    else:
        return jsonify({"error": "Dados inválidos"}), 400

@app.route("/ranking")
def ranking():
    rankings = obter_ranking()
    return render_template("ranking.html", rankings=rankings)

if __name__ == "__main__":
    app.run(debug=True)