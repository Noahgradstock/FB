from flask import Blueprint, jsonify, request
from importnb import Notebook
import sys
import os
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

with Notebook():
    from clean_data import get_team_form, df, get_team_league, get_home_vs_away_summary

data_routes = Blueprint('data', __name__)

@data_routes.route('/api/graph', methods=['GET'])
def get_chart_data():
    data = [
        {"name": "Jan", "value": 300},
        {"name": "Feb", "value": 200},
        {"name": "Mar", "value": 200},
        {"name": "Apr", "value": 300}
    ]
    return jsonify(data)

@data_routes.route('/api/histogram', methods=['GET'])
def get_chart_histogram():
    data = [
        {"name": "Jan", "value": 100},
        {"name": "Feb", "value": 200},
        {"name": "Mar", "value": 200},
        {"name": "Apr", "value": 30}
    ]
    return jsonify(data)



@data_routes.route('/api/team_data/', methods=['GET'])
def get_team_data():
    league = request.args.get('league')
    home_team = request.args.get('home_team')
    away_team = request.args.get('away_team')

    print("🔎 Mottaget från frontend:")
    print(f"Liga: {league}")
    print(f"Hemmalag: {home_team}")
    print(f"Bortalag: {away_team}")

    if not league or not home_team or not away_team:
        return jsonify({"error": "league, home_team, and away_team are required"}), 400

    try:
        league_df = df[df['Div'] == league]

        # Statistik mellan lagen
        home_vs_away_stats = get_home_vs_away_summary(league_df, home_team, away_team)

        # Formkurvor
        home_team_form = get_team_form(league_df, home_team)
        away_team_form = get_team_form(league_df, away_team)

        print("📊 Uträknad statistik:")
        print(f"{home_team} vs {away_team}: {home_vs_away_stats}")

        return jsonify({
            "head_to_head": {
                f"{home_team}_vs_{away_team}": home_vs_away_stats
            },
            "team_form": {
                home_team: home_team_form,
                away_team: away_team_form
            }
        })

    except Exception as e:
        print("❌ Fel i backend:", e)
        return jsonify({"error": "Internt serverfel"}), 500




@data_routes.route('/api/teams', methods=['GET'])
def get_teams():
    selected_league = request.args.get('league')
    teams_by_league, leagues = get_team_league()

    # Om en liga är specificerad, returnera endast lagen i den ligan
    if selected_league:
        if selected_league in leagues:
            index = leagues.index(selected_league)
            return jsonify({"teams": teams_by_league[index]})
        else:
            return jsonify({"error": "Ligan hittades inte"}), 404

    # Om ingen liga är vald, returnera alla ligor
    return jsonify({
        "leagues": leagues
    })

"""""
@data_routes.route('/api/league_table', methods=['GET'])
def get_league_table():
    league = request.args.get("league")
    league_df = df[df["Div"] == league]

    table = build_league_table(league_df)  # Du implementerar denna
    return jsonify({"table": table})
"""

if __name__ == "__main__":
    pass