from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

# Connexion à MySQL
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="gestion_enquetes"
    )

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    hashed_password = generate_password_hash(data['password'])
    
    db = get_db_connection()
    cursor = db.cursor()
    try:
        cursor.execute("INSERT INTO utilisateurs (nom, email, password, role) VALUES (%s, %s, %s, %s)",
                       (data['nom'], data['email'], hashed_password, data['role']))
        db.commit()
        return jsonify({"message": "Utilisateur créé !"}), 201
    except:
        return jsonify({"message": "Email déjà utilisé"}), 400
    finally:
        cursor.close()
        db.close()

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        # On cherche l'utilisateur dans la table
        query = "SELECT * FROM utilisateurs WHERE email = %s AND password = %s"
        cursor.execute(query, (email, password))
        user = cursor.fetchone()

        cursor.close()
        conn.close()

        if user:
            # Si trouvé, on renvoie les infos (sauf le mot de passe)
            return jsonify({
                "status": "success", 
                "message": "Connexion réussie",
                "role": user['role'] # 'chef' ou 'superviseur'
            }), 200
        else:
            return jsonify({"status": "error", "message": "Identifiants incorrects"}), 401

    except Exception as e:
        print(f"Erreur lors de l'inscription : {e}") # <--- AJOUTE CETTE LIGNE
        return jsonify({"message": "Erreur lors de l'inscription"}), 400
if __name__ == '__main__':
    app.run(debug=True, port=5000)