# prototype1
Mine sweeper type game written in Javascript

###############
## TODO Fix
- använd inte CTX som global variabel i grafikobjekten, ta den som input. "ful-kodat" nu
- gör canvas utan kanter
- förbättra klick funktion om möjligt, nu klickas när musknappen släpps, inte trycks


###############
## Plan
*- skapa dokument
*- rita en fyrkant
*- använd animationFrame
*- gör canvas klickbar och spara läge
*- refaktorering till objekt som sparas i en matris
*- ändra färg på rektangel när man klickar på canvas, svart till rött till svart...
*- la till fpsOverlay
*- begränsa klickområde för rektangel till endast rektangel
*- dela upp applikation på flera filer
*- rita hela canvas med fyrkanter
*- ge spelrutor status, o-klickad som default
*- ändra status på fyrkanterna när klick sker, o-klickad, klickad-ej-mina, klickad-blockerad-mina, klickad-mina
*- visa spelrutor med olika färger beroende på status
*- gör så rutorna kan ha egenskaperna bomb eller inte bomb
*- randomisera minor
- Lägg in övre rad med:
	- spelnamn (3 rutor bred)
	- knapp för "starta om" (1 ruta bred)
	- i-infoknapp (1 ruta bred)
- gör starta-om funktion
- visa antal närliggande minor på klickad-ej-mina rutor
	- skapa array med minor
	- skapa spelrutor utifrån array
	- skicka med värde för angränsande minor till min-objekten
- gör minor blockerbara (håll in eller höger-klick?)
	- ny event listener?
- skapa pop-up för i-infoknapp.
	- blocka klick på annat än info-rutan
	- klick utanför ruta är samma som "stäng och fortsätt spela"

- ha bilder istället för enfärgade rutor:
	- default visa grå bild med relief
	- vid klick på ej bomb: visa gräs, samt siffra för angränsande minor
	- vid klick på bomb: visa tistel och avsluta med cool animation

- lägg in ljud (loopa, skapa eget eller kopiera från EverydayAstronaut)
- lägg in konfig för ljud av/på

- lägg upp spel på Google Play som FreeToPlay (v.1.0)



##########
## nästa spel
- öka upplösning

- definiera en spelplan att utgå ifrån med annat än bara minor (hus, träd, etc.)
	(background + spelarray med genomskinliga rutor och aktiva spelrutor + randomisera minor på de aktiva rutorna)
- gör sex nivåer

- skapa sex banor till
- ta betalt för de nya banorna med in game payment

- gör fler banor i skov om sex banor...
- lägg upp spelet på Apple Store

- Gör nytt spel...