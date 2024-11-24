from flask import Flask, render_template, request, jsonify, redirect, url_for
import json
import sqlite3

app = Flask(__name__)

# Carregar a Bíblia em JSON (certifique-se de que acf.json está na mesma pasta)
with open('acf.json', 'r', encoding='utf-8-sig') as f:
    biblia = json.load(f)

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

# Rotas
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/biblia")
def biblia():
    return render_template("biblia.html")

@app.route("/quiz")
def quiz():
    return render_template("quiz.html")


# Rotas da API
@app.route("/api/biblia")
def biblia_completa():
    return jsonify(biblia)

@app.route("/api/biblia/<livro>/<int:capitulo>")
def capitulo_biblico(livro, capitulo):
    livro_encontrado = next((b for b in biblia if b["book"].lower() == livro.lower()), None)
    if not livro_encontrado:
        return jsonify({"error": "Livro não encontrado"}), 404
    if capitulo <= 0 or capitulo > len(livro_encontrado["chapters"]):
        return jsonify({"error": "Capítulo não encontrado"}), 404
    versiculos = livro_encontrado["chapters"][capitulo - 1]
    return jsonify({"livro": livro, "capitulo": capitulo, "versiculos": versiculos})

@app.route("/api/biblia/<livro>/<int:capitulo>/<int:versiculo>")
def versiculo_biblico(livro, capitulo, versiculo):
    livro_encontrado = next((b for b in biblia if b["book"].lower() == livro.lower()), None)
    if not livro_encontrado:
        return jsonify({"error": "Livro não encontrado"}), 404
    if capitulo <= 0 or capitulo > len(livro_encontrado["chapters"]):
        return jsonify({"error": "Capítulo não encontrado"}), 404
    capitulo_encontrado = livro_encontrado["chapters"][capitulo - 1]
    if versiculo <= 0 or versiculo > len(capitulo_encontrado):
        return jsonify({"error": "Versículo não encontrado"}), 404
    versiculo_texto = capitulo_encontrado[versiculo - 1]
    return jsonify({"livro": livro, "capitulo": capitulo, "versiculo": versiculo, "texto": versiculo_texto})

@app.route("/salvar_resultado", methods=["POST"])
def salvar_resultado():
    nome = request.form['nome']
    email = request.form['email']
    pontuacao = int(request.form['pontuacao'])

    conn = get_db_connection()
    conn.execute('INSERT INTO rankings (nome, email, pontuacao) VALUES (?, ?, ?)', (nome, email, pontuacao))
    conn.commit()
    conn.close()

    return redirect(url_for('ranking'))

@app.route("/ranking")
def ranking():
    conn = get_db_connection()
    rankings = conn.execute('SELECT nome, pontuacao FROM rankings ORDER BY pontuacao DESC').fetchall()
    conn.close()
    return render_template("ranking.html", rankings=rankings)


if __name__ == "__main__":
    app.run(debug=True)