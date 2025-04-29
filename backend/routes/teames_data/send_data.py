from flask import Blueprint, jsonify, request
from importnb import Notebook
import sys
import os
global_league_df = None
global_league_name = None
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

with Notebook():
    from get_stats import get_teams_by_league, create_league_table, get_fixture_by_league, get_last_five_results, get_team_form
data_routes = Blueprint('data', __name__)


@data_routes.route('/api/league', methods=['GET'])
def get_teams():
    global global_league_df, global_league_name

    league = request.args.get('league')
    if not league:
        return jsonify({"error": "Missing league parameter"}), 400

    teams, df = get_teams_by_league(league)

    global_league_df = df
    global_league_name = league

    next_games = get_fixture_by_league(league)
    reason_games = get_last_five_results(df)

    try:
        table_df = create_league_table(league, df)
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

    return jsonify({
        "teams": teams,
        "league_table": table_df.set_index('Team').to_dict(orient='index'),
        "next_games": next_games,
        "recent_games": reason_games
    })


@data_routes.route('/api/team', methods=['GET'])
def compare_teams():
    global global_league_df, global_league_name

    home_team = request.args.get('homeTeam')
    away_team = request.args.get('awayTeam')
    league = request.args.get('league')

    if not home_team or not away_team or not league:
        return jsonify({"error": "Missing parameters"}), 400

    print(f"🔍 Jämför: {home_team} vs {away_team} i {league}")

    try:
        if global_league_name != league or global_league_df is None:
            return jsonify({"error": "League data not loaded. Fetch league data first."}), 400

        df = global_league_df  # Hämta cachad dataframe
        next_games = get_fixture_by_league(league)

        # Form för båda lagen
        home_form = get_team_form(df, home_team)
        away_form = get_team_form(df, away_team)
        print(home_form)

        return jsonify({
            "homeTeam": home_team,
            "awayTeam": away_team,
            "league": league,
            "next_games": next_games,
            "team_form": {
                home_team: home_form,
                away_team: away_form
            }
        })

    except Exception as e:
        print("❌ Fel i jämförelse:", e)
        return jsonify({"error": "Något gick fel vid statistikberäkningen"}), 500


if __name__ == "__main__":
    pass