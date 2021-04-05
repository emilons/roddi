import "../App.css"


/*
 * This is the page the user arrives at when the page loads, as well as the landing page after you log in.
 * Only regular HTML on this page. 
 */

function StartPage(){

    return (
        <div className="startPage">
            <h1>Velkommen til Røddi</h1>
            <h5>Nettsiden som gjør oppgjør av dødsbo enkelt og sømløst</h5>
            <div id="introParagraph">
                <p> Røddi-teamet tar seg av alt av administrering, og legger inn alle boets eiendeler. Alt du trenger å gjøre
                    er å velge om du ønsker at en eiendel skal fordeles mellom alle deltakerene, kastes, eller å beholde den selv.
                    Når alle eiendelene har blitt kategorisert, og deltakerene har fylt inn sine ønsker, vil Røddi-teamet ta seg 
                    av fordelingen. Slik legger vi til rette for en mest mulig behagelig og enkel prosess med fordeling av dødsboet.
                </p>
            </div>
        </div>
    );
}
export default StartPage;
