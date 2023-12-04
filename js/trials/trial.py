import math
gruppen = 2
games_pro_runde = 2
teamsprogrippe=[3,3]
games_pro_gruppe = []

gameplan= [[],
           []]

for i in teamsprogrippe:
    games_pro_gruppe.append((i-1)*(i/2))

print(games_pro_gruppe)
games_pro_gruppe.sort()

num_games = 0

for i in games_pro_gruppe:
    num_games += i

num_rounds=num_games/games_pro_runde
n= 0
rows_needed_if_div_by_rounds = []

for i in games_pro_gruppe:
    print(i)
    if i % num_rounds == 0:
        rows_needed_if_div_by_rounds.append([(math.floor(math.log(i)/math.log(num_rounds))),n])
    n+=1

print(rows_needed_if_div_by_rounds)

def if_is_div_by_rounds(list):
    if len(gameplan)==len(list):
        print("termperli algorythmus mit der gegebenen anzahl plätz für die jeweiligen gruppe und wird nach der generierung fpr die einzelnen gruppen zusammengefügt.")

    elif len(gameplan)!=len(list) and len(list)!=0:
        print("termperlialgorythmu mit der gegebenen anzahl plätze für die elemente in der list für den rest wird ein anderer algorythmus gebarucht werden müssen aber auch diese pläne werden hier zusammengefügt werden müssen")

    elif 