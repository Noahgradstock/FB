import os

def read_text_file(filename):
    """ Läser innehållet i en textfil och returnerar det. """
    base_dir = os.path.dirname(os.path.abspath(__file__)) 
    path = os.path.join(base_dir, "..", filename)  # Gå upp en nivå till backend/

    print(f"Försöker läsa fil: {path}")  # Debugging - logga sökvägen

    if not os.path.exists(path):
        return "Fel: Filen hittades inte."

    try:
        with open(path, "r", encoding="utf-8") as file:
            return file.read()
    except Exception as e:
        return f"Fel vid läsning: {str(e)}"