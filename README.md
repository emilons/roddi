# Røddi
Røddi er en nettside som skal gjøre fordeling av dødsbo enkelt. For en **komplett beskrivele** av nettsiden og hvordan den brukes, se:

- [Beskrivelse av Røddi](https://gitlab.stud.idi.ntnu.no/tdt4140/landsby-2/gruppe-33/roddi/-/blob/MDdocumentation/RODDI.md) 

For oversikt over nettsidens **arkitektur**, se:

- [Arkitektur](https://gitlab.stud.idi.ntnu.no/tdt4140/landsby-2/gruppe-33/roddi/-/wikis/Arkitekturdiagram-for-R%C3%B8ddi)

# Oppsett og kjøring: #

## Virtual Environment (Første gang man skal kjøre)
Åpne terminalvindu (gjerne i VS Code Terminal -> New Terminal)
Pass på at du er i riktig directory (hoveddirectory, det øverste nivået i prosjektstrukturen. Tilsvarer det som ligger her på GitLab)
- `ls` (for å se at du er i roddi mappen). filene burde være:  README.md    backend     database    frontend    requirements.txt    venv

Kjør så:
- `pip install virtualenv`
- `virtualenv venv`
- `source venv/bin/activate` (Windows: `.\venv\Scripts\activate`)

Nå skal det stå (venv) foran det du skriver i terminalen, da vet du at virituelt environment er aktivert
- `pip install -r requirements.txt`

Da er virtuelt environment satt opp og alt er installert.
Det er viktig at virtual environment er aktivert når det er snakk om å kjøre python-kode i prosjektet.
Det betyr at for hver gang du vil starte opp backend trenger du nå å navigere til den øverste mappen i prosjektet som heter roddi for så å kjøre kommandoen "source venv/bin/activate" (".\venv\Scripts\activate") i terminalen.

## Oppsett av database (Første gang man skal starte opp backend)

Bruk for eksempel MySQLWorkbench for å lage en database for prosjektet. Kall den gjerne "roddi".
Gå tilbake til prosjektet ditt i VS Code.
Åpne settings.py som ligger i backend/roddi/roddi/settings.py og finn objektet som heter "DATABASES".
Fyll inn NAME, USER og PASSWORD for å samsvare med databasen du lagde i MySQLWorkbench (dersom du ikke lagde noen bruker sett USER til 'root' og la PASSWORD være tom '').

Gå så tilbake til terminalen som kjører virtual environmentet.
- `cd backend/roddi`
- `python3 manage.py makemigrations`
- `python3 manage.py migrate`

Da er databasen konfigurert go klar til å brukes av applikasjonen.

For å starte Django og backend er man nødt til å være i virtual environment.

Man trenger én terminal hver som kjører for å bruke både frontend og backend samtidig. I VS Code kan man enkelt åpne flere terminaler ved å trykke på +-tegnet øverst til høyre i terminalvinduet.

## Frontend (I egen terminal)

### Første gang (installering av nødvendige dependencies):
Installer først "node.js" på PC'en. Google node js download.
Gå så til en ny terminal i VS Code, sørg for at du er i øverste mappe i prosjektet.
- `cd frontend/roddi`
- `npm install`

### For å starte nettsiden
- `cd frontend/roddi`
- `npm start`
- Nettsiden kjører nå på http://localhost:3000


## Backend (I egen terminal)

- `source venv/bin/activate` (Windows: `.\venv\Scripts\activate`)
- `cd backend/roddi`
- `python3 manage.py runserver`
- API kjører nå på http://localhost:8000/api

(Hvis det ikke går, prøv å gå tilbake til øverste mappe `cd ../..`, kjør `pip install -r requirements.txt`, kanskje vi har lagt til noe nytt som må installeres)
- `cd backend/roddi` igjen og prøv `python3 manage.py runserver` nå.

