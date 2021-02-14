# roddi

## Virtual Environment (Første gang man skal kjøre)
Åpne terminalvindu (gjerne i VS Code Terminal -> New Terminal)
Naviger deg fram til riktig directory (hoveddirectory, det øverste nivået som ligger her på GitLab)
- `ls` (for å se at du er i roddi mappen). filene burde være:  README.md       backend         frontend
- `pip install virtualenv`
- `virtualenv venv`
- `source venv/bin/activate`

Nå skal det stå (venv) foran det du skriver i terminalen, da vet du at virituelt environment er aktivert
- `pip install django`
- `pip install django-rest-framework`
- `pip install django-cors-headers`
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

### For å starte Nettsiden
- `npm start`

(Går det ikke kjør `npm install` først, kanskje vi har lagt til noe nytt som må installeres)

## Backend (I egen terminal)

- `source venv/bin/activate`
- `cd backend/roddi`
- `python3 manage.py runserver`

