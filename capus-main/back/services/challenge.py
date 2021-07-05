from sqlalchemy.orm import sessionmaker
from sql_app.model.models import Consulter
from random import randrange

class Challenge:
    def getReward(challenge, user):

        total: int = 0
        rank: str = 'mini-capus'
        wording: str = "Menez à bien ce défi et obtenez le rang de mini-capus"

        if user is not None:
            total = len(user.consulter)

        if total == 1:
            rank = 'apprenti-capus'
            wording = "Menez à bien un nouveau défi et obtenez le rang d'apprenti-capus"
        elif (total > 1 and total < 5):
            rank = 'sergent-capus'
            wording = "Menez à bien encore " + str(5 - total) + " défis et obtenez le rang de sergent-capus"

        

        reward = {
          "rank": rank,
          "wording": wording,
          "icon": "rewards/" + str(randrange(1, 20)) + ".png"
        }

        return reward 
