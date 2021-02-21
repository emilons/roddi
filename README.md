# roddi

## Virtual Environment (Første gang man skal kjøre)
Åpne terminalvindu (gjerne i VS Code Terminal -> New Terminal)
Naviger deg fram til riktig directory (hoveddirectory, det øverste nivået som ligger her på GitLab)
- `ls` (for å se at du er i roddi mappen). filene burde være:  README.md       backend         frontend
- `pip install virtualenv`
- `virtualenv venv`
- `source venv/bin/activate`

Nå skal det stå (venv) foran det du skriver i terminalen, da vet du at virituelt environment er aktivert
- `pip install -r requirements.txt`
- `cd backend/roddi`
- `python3 manage.py migrate`

Da er virtuelt environment satt opp og alt er installert. For å starte Django og backend er man nødt til å være i dette virtual environmentet.
Det betyr at for hver gang du vil starte opp backend trenger du nå å navigere til den øverste mappen i prosjektet som heter roddi for så å kjøre kommandoen "source venv/bin/activate" i terminalen.

Man trenger én terminal hver som kjører for å bruke både frontend og backend samtidig. I VS Code kan man enkelt åpne flere terminaler ved å trykke på +-tegnet øverst til høyre i terminalvinduet.

## Frontend (I egen terminal)

### Første gang (installering av nødvendige dependencies):
Installer først "node.js" på PC'en, bare google node js download.
Gå så til en ny terminal i VS Code, sørg for at du er i øverste mappe i prosjektet.
- `cd frontend/roddi`
- `npm install`

### For å starte nettsiden
- `npm start`
- Nettsiden kjører nå på http://localhost:3000

(Går det ikke kjør `npm install` først, kanskje vi har lagt til noe nytt som må installeres)

## Backend (I egen terminal)

- `source venv/bin/activate`
- `cd backend/roddi`
- `python3 manage.py runserver`
- API kjører nå på http://localhost:8000/login/api


## Database

Først pass på at MySQL på enheten din har en database med navn som korresponderer til navnet satt
i DbConnector ("roddi" er default men kan hete hva som helst). Deretter pass på at bruker og passord i DbConnector tilsvarer ditt eget når du logger på en MySQL instans ("root" og intet passord er satt som default).

Dersom du ikke benytter requirements.txt må følgende lastes ned fra terminalen (WINDOWS):
- `pip install mysql-connector-python`
- `pip install tabulate`

Deretter, for å sette opp alle tables, kjører man de 5 "create table" funksjonene som er kommentert ut i
main() under DbQueries.

Ved å benytte program.fetch_data(table_name) vil tabellen fra MySQL bli printet pent ut i terminalen. Bruker man alle vedlagte funksjoner behøver man aldri gå inn på MySQL etter å ha opprettet databasen!


