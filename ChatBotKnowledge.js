// --- Knowledge base ---
// Here goes your full database (removed here for brevity)
const knowledge = {

    // ---- 1. POZDRAV / ÚVOD ----
  "ahoj, čau, dobrý den, zdravím, nazdar, hezký den, čus, servus, zdar, čauko": [
    "Dobrý den, jsem MLX AI – asistent pro klienty MLX Media. Mohu vám pomoct s informacemi nebo objednávkou?",
    "Ahoj, vítejte u MLX Media! Rád vám shrnu ceny, služby nebo kontakt.",
    "Zdravím vás! Jsem MLX AI a poradím vám, kde najdete objednávku nebo jak získat kalkulaci."
  ],

  // ---- 2. OBJEDNÁVKA ----
"objednávka, objednat, objednej, rezervace, chci objednat, jak objednat, můžu objednat, objednávku, objednání, rezervovat": [
  "Objednávku provedete jednoduše vyplněním <a href='objednavka.html'>online formuláře</a> . Ihned po odeslání dostanete potvrzovací email. Během téhož nebo následujícího dne vám zavoláme a domluvíme podrobnosti. Pokud by formulář nefungoval, můžete napsat na <a href='mailto:mlx.studio2222@gmail.com'>mlx.studio2222@gmail.com</a> nebo zavolat na <a href='tel:+420123456789'>+420 123 456 789</a>. 😊"
],
"formulář, vyplnit formulář, kde je formulář, formulář objednávka, online formulář, objednávkový formulář, rezervační formulář, kde najdu formulář, formulář na webu, vyplňování formuláře": [
  "Formulář pro objednávku najdete na stránce <a href='objednavka.html'>Objednávka</a>. Po jeho vyplnění se objednávka automaticky zaregistruje a přijde vám ověřovací email."
],
"potvrzení objednávky, potvrzení, ověřovací email, ověření, schválení, potvrdit objednávku, potvrzení termínu, potvrzovací zpráva, ověření objednávky, email potvrzení": [
  "Po vyplnění formuláře vám dorazí ověřovací email. Ten potvrzuje, že systém objednávku správně přijal a že vaše údaje sedí. Následně se vám ozveme telefonicky pro doladění detailů."
],
"po objednávce, co se stane po objednávce, reakce, jak dlouho čekat, ozvete se, kdy zavoláte, co dál, postup po objednávce, co následuje, reakce na objednávku": [
  "Jakmile odešlete formulář, přijde potvrzovací email. Poté vám zavoláme – většinou ten samý den, maximálně následující pracovní den. Domluvíme spolu všechny detaily natáčení či služby."
],
"telefonát, zavoláte mi, kdy zavoláte, budete volat, kdy voláte, ozvete se, voláte, volání, zpětný hovor, čekám na telefon": [
  "Telefonicky se ozýváme po každé objednávce – někdy hned během pár hodin, jindy až následující den (podle času odeslání). Pokud bychom se dlouho neozývali, napište prosím na <a href='mailto:mlx.studio2222@gmail.com'>mlx.studio2222@gmail.com</a>."
],
"ai objednávka, můžeš objednat, udělej objednávku, rezervuj mi termín, objednej to, můžeš to za mě objednat, objednávku za mě, zarezervuj, zkus objednat, objednávka přes AI": [
  "Já jsem MLX AI 😊 – rád vám vysvětlím postup, ale objednávku za vás vytvořit neumím. Vyplňte prosím <a href='objednavka.html'>formulář</a>, nebo napište na <a href='mailto:mlx.studio2222@gmail.com'>mlx.studio2222@gmail.com</a>. Rezervace probíhá vždy ručně."
],
"jak rezervovat, rezervace, rezervovat termín, rezervace služby, rezervace natáčení, rezervovat, rezervace přes web, rezervace přes formulář, rezervace email, rezervace online": [
  "Rezervaci provedete vyplněním <a href='objednavka.html'>formuláře</a>. Pokud by to nešlo, napište mi na <a href='mailto:mlx.studio2222@gmail.com'>mlx.studio2222@gmail.com</a>. Potvrzení rezervace dostanete zpět emailem a následně i telefonicky."
],
"problém s objednávkou, nejde objednat, formulář nefunguje, neodeslalo se, problém formulář, nefunguje objednávka, chyba objednávka, objednávka se nezdařila, neodesláno, nejde vyplnit": [
  "Pokud by formulář nefungoval, napište mi prosím rovnou na <a href='mailto:mlx.studio2222@gmail.com'>mlx.studio2222@gmail.com</a> nebo zavolejte na <a href='tel:+420123456789'>+420 123 456 789</a>. Občas může být krátký výpadek, ale email i telefon fungují vždy."
],
"storno, zrušení objednávky, chci zrušit, zrušit rezervaci, zrušit objednávku, storno objednávky, odhlásit, zrušit termín, ruším objednávku, zrušení": [
  "Pokud potřebujete objednávku zrušit, stačí napsat email na <a href='mailto:mlx.studio2222@gmail.com'>mlx.studio2222@gmail.com</a>. Storno řešíme vždy individuálně a férově. 🙂"
],


// ---- 3. KONTAKT ----
"kontakt, jak kontaktovat, spojení, kde vás najdu, kontaktujte, kontakt na vás, spojit se, spojení s vámi, kontakt info, vaše kontakty": [
  "Najdete mě snadno 😊<br>Email: <a href='mailto:mlx.studio2222@gmail.com'>mlx.studio2222@gmail.com</a><br>Telefon: <a href='tel:+420123456789'>+420 123 456 789</a><br>YouTube: <a href='https://www.youtube.com/@MLX-Media' target='_blank'>MLX YouTube</a><br><button class='mlx-ai-btn' data-dest='#footer' data-target='#footer' data-outline='rounded'><span class='mlx-icon'>👇</span> Zobrazit kontakty dole</button>"
],
"email, napište email, mail, napiš mi, emailová adresa, kontakt email, váš email, email prosím, email info, napište mi email": [
  "Můj email je <a href='mailto:mlx.studio2222@gmail.com'>mlx.studio2222@gmail.com</a>. Nejrychleji se domluvíme právě přes email. ✉️"
],
"telefon, volejte, číslo, mobil, zavolat, volejte mi, vaše číslo, jaké číslo, kontakt číslo, tel": [
  "Můžete mi zavolat na <a href='tel:+420123456789'>+420 123 456 789</a>. 📞 Pokud bych hovor nezvedl, zkuste email."
],
"web, webová stránka, stránky, web link, adresa webu, web prosím, vaše stránky, stránka mlx, odkaz, link": [
  "Oficiální web je <a href='https://www.mlxmedia.cz' target='_blank'>www.mlxmedia.cz</a>. Najdete tam portfolio, ceník i objednávku. 🌐"
],
"youtube, youtube kanál, ukázky videí youtube, odkaz youtube, video youtube, máte youtube, vaše youtube, link youtube, vaše videa, videa youtube": [
  "Ukázky videí jsou na mém YouTube kanále 🎬 👉 <a href='https://www.youtube.com/@MLX-Media' target='_blank'>MLX YouTube</a>."
],
"instagram, instagram profil, vaše ig, máte instagram, odkaz instagram, link ig, vaše insta, ukázky instagram, reels, vaše fotky": [
  "Na Instagramu sdílím krátká videa a fotky ze zákulisí 📸 👉 <a href='https://instagram.com/tvoje-insta' target='_blank'>@tvoje-insta</a>."
],
"portfolio, reference, ukázky, vaše práce, ukázky videí, reference projekty, ukázkové video, ukázka tvorby, ukázky práce, vaše projekty": [
  "Portfolio je dostupné zde: <button class='mlx-ai-btn' data-dest='portfolio.html' data-nav='nav a[href=\"portfolio.html\"]'><span class='mlx-icon'>🖼️</span> Ukázat portfolio</button> Najdete tam filmy, promo videa i firemní projekty. 🎥"
],
"adresa, kde jste, sídlo, vaše adresa, kancelář, kde najdu, odkud jste, místo, kde vás najdu, sídlo firmy, kde působíte": [
  "Jsem z Brna, ale působím po celé ČR. 📍 Hlavní informace jsou v <button onclick=\"scrollToSection('footer')\">kontaktech ve spodní části stránky</button>."
],
"jak se spojit, jak komunikovat, spojení, komunikace, jak vás zastihnu, kdy volat, nejlepší kontakt, spojit se s vámi, dostupnost, kdy vás kontaktovat": [
  "Nejlépe přes email: <a href='mailto:mlx.studio2222@gmail.com'>mlx.studio2222@gmail.com</a> – odpovídám do 24 hodin. 📧"
],
"neodpovídáte, nereagujete, proč neodpovídáte, nereakce, proč nic nepíšete, dlouho čekám, nevoláte, nereaguje nikdo, neodpověděl jste, mlčíte": [
  "Odpovídám co nejrychleji, obvykle do 24 hodin. ⏱️ Někdy jsem na natáčení a nemohu reagovat hned. Pokud se dlouho neozývám, zkuste to znovu emailem: <a href='mailto:mlx.studio2222@gmail.com'>mlx.studio2222@gmail.com</a>."
],


// ---- 4. CENÍK / ORIENTAČNÍ CENA ----
"ceník, ceny, kolik stojí, cena, jaká cena, vaše ceny, orientační cena, ukázkový ceník, ceník služeb, kolik peněz": [
  "Orientační ceník služeb 🎥<br>• Natáčení od 2000 Kč<br>• Střih od 1500 Kč<br>• Kompletní video od 3500 Kč<br>• Promo balíček pro firmu od 6000 Kč<br>• Vertikální video (TikTok/Reels) od 1800 Kč<br>Cestovné je individuální dle vzdálenosti.<br><small>❗ Přesná cena se vždy řeší osobně.</small><br><button class='mlx-ai-btn' data-dest='praicing.html' data-nav='nav a[href=\"praicing.html\"]'><span class='mlx-icon'>💰</span> Zobrazit kompletní ceník</button>"
],
"kolik stojí natáčení, cena natáčení, kolik za natáčení, natáčení cena, půlden natáčení, cena půlden, půl den natáčení, cena půl den, půldenní cena, kolik peněz natáčení": [
  "Půldenní natáčení (do 4 hod) je od 2000 Kč. 🎬 Cena se ale odvíjí od lokace a náročnosti projektu.<br><small>Pro přesnou kalkulaci napište na <a href='mailto:mlx.studio2222@gmail.com'>mlx.studio2222@gmail.com</a>.</small>"
],
"cena střih, střih cena, kolik stojí střih, kolik za střih, střih videa cena, cena střihu videa, střih vlastní záběry, cena střih vlastních, úprava záběrů, cena editace": [
  "Střih z vašich záběrů (do 2 minut) je od 1500 Kč. ✂️ Zahrnuje barvy, hudbu i titulky.<br><small>❗ Cena se liší podle délky a složitosti videa.</small>"
],
"kompletní video, balíček video, cena komplet, kolik stojí komplet video, komplet cena, cena komplet, vše v jednom, kompletní balíček, video komplet, celý balíček": [
  "Kompletní video (natáčení + střih do 3 minut) je od 3500 Kč. 🎞️ Obsahuje záběry, střih, hudbu i základní grafiku.<br><small>Přesná částka se vždy domlouvá individuálně.</small>"
],
"promo balíček, firemní promo, promo cena, kolik promo, promo pro firmu, cena promo, balíček pro firmu, promo balíček cena, firemní video, firemní cena": [
  "Firemní promo balíček je od 6000 Kč. 🏢 Obsahuje 1 den natáčení, střih, logo a hudbu, dodávám i ve více formátech.<br><small>Pro detailní nabídku napište na email.</small>"
],
"vertikální video, tiktok video, instagram video, reels, krátké video cena, vertikální cena, cena krátké video, cena reels, cena insta video, krátká videa": [
  "Vertikální video (do 1 min, trendy střih) je od 1800 Kč. 📱 Perfektní pro TikTok, Reels a Shorts.<br><small>Obsahuje rychlý střih a hudbu.</small>"
],
"individuální nabídka, cena na míru, kalkulace, individuální kalkulace, přesná cena, cena individuálně, individuální cena, nabídka cena, kalkulace cena, domluva cena": [
  "Každý projekt je jiný. Pro individuální nabídku napište na <a href='mailto:mlx.studio2222@gmail.com'>mlx.studio2222@gmail.com</a> nebo zavolejte <a href='tel:+420123456789'>+420 123 456 789</a>. 📧📞"
],
"cestovné, cena cestovné, kolik stojí cesta, cena za cestu, cestovné cena, cestovné poplatek, doplatek cesta, cena dojezdu, kolik stojí dojezd, doprava cena": [
  "Cestovné se účtuje podle vzdálenosti – cena je vždy individuální a předem domluvená. 🚗"
],
"nejste nejdražší, cena férová, férové ceny, férová cena, nejste levní, cena dostupná, ceny dostupné, rozpočet, rozumné ceny, výhodné ceny": [
  "Ceny držím férové a dostupné – chci být nejlepší volba, ne nejdražší. ✅ Kvalita za rozumnou cenu je moje filozofie."
],
"přesná kalkulace, kalkulace, chci kalkulaci, přesná cena, kolik přesně, přesně kolik, kalkulace ceny, cenová nabídka, cenová kalkulace, přesně cena": [
  "Já (MLX AI) umím říct jen orientační ceny. 💡 Přesnou kalkulaci dostanete emailem: <a href='mailto:mlx.studio2222@gmail.com'>mlx.studio2222@gmail.com</a>."
],

  // ---- 5. PŘESNÁ KALKULACE / NABÍDKA NA MÍRU ----
"nabídka na míru, individuální nabídka, balíček na míru, kalkulace na míru, speciální nabídka, individuální cena, cena individuální, cena na míru, přizpůsobená nabídka, osobní kalkulace": [
  "Rád připravím balíček přesně podle vašich potřeb. 💼 Přesná cena se vždy domlouvá individuálně – napište na <a href='mailto:mlx.studio2222@gmail.com'>mlx.studio2222@gmail.com</a>."
],
"speciální požadavek, chci speciální video, jiné služby, speciální nabídka, chci vlastní balíček, nestandardní, extra služby, chci něco jiného, služba navíc, vlastní požadavky": [
  "Každý projekt je originál 🎬 – napište mi email s vaším požadavkem a domluvíme se. <button class='mlx-ai-btn' data-dest='order.html' data-nav='nav a[href=\"order.html\"]'><span class='mlx-icon'>📝</span> Objednat konzultaci</button>"
],
"sleva, slevy, akce, zvýhodněná cena, levnější, studentská sleva, firemní sleva, slevy pro firmy, speciální akce, zvýhodnění": [
  "Občas nabízím slevy nebo zvýhodněné balíčky. 💰 Pro větší zakázky je možná sleva – řešíme individuálně."
],
"balíček služeb, služební balíček, balíčky, kompletní balíček, nabídka balíček, různé balíčky, balíček pro firmy, služba balíček, cena balíček, služební nabídky": [
  "Nabízím různé balíčky podle potřeb klienta. 📦 Například firemní promo od 6000 Kč. Pro detailní info klikněte <button onclick=\"scrollToSection('cenik')\">sem</button>."
],
"konzultace, domluva, konzultace cena, konzultace zdarma, schůzka, domluvit konzultaci, konzultace email, konzultace info, online konzultace, konzultace projekt": [
  "Krátká konzultace (email nebo telefon) je zdarma 📞✉️ – pomůže nám upřesnit cenu."
],
"specifický projekt, jiný projekt, netypická služba, projekt na míru, speciální projekt, jiný druh videa, jiný styl, projekt mimo ceník, unikátní projekt, výjimečný projekt": [
  "Pokud váš projekt není v ceníku, nevadí – rád připravím speciální nabídku. 😊"
],
"kombinace služeb, spojení služeb, mix služeb, kombinovaný balíček, více služeb, kombinace balíčku, spojené služby, kombinovat, kombinace nabídky, mix balíčků": [
  "Můžeme spojit více služeb do jednoho balíčku. 📦 Například natáčení + střih vychází cenově výhodněji."
],
"velká zakázka, firemní zakázka, větší projekt, velký projekt, firemní spolupráce, firemní balíček, firemní video, firemní nabídka, firemní kalkulace, větší práce": [
  "Pro velké zakázky nabízím individuální ceny. 🏢 Cena se domlouvá osobně podle rozsahu."
],
"malá zakázka, malý projekt, drobný projekt, menší projekt, rychlá zakázka, rychlý projekt, drobná práce, malá práce, zakázka malá, mini projekt": [
  "Dělám i menší projekty – třeba krátká videa od 1500 Kč. 🎥 Malé zakázky mají rychlejší dodání a dostupnou cenu."
],
"nejlevnější varianta, levně, nejlevnější cena, levný projekt, levnější nabídka, co nejlevnější, nízká cena, malý rozpočet, levnější varianta, levný balíček": [
  "Nejlevnější varianta je střih z vašich záběrů od 1500 Kč nebo krátké vertikální video od 1800 Kč. 📱"
],


  // ---- 6. DOSTUPNOST A TERMÍNY ----
"volný termín, kdy máte volno, dostupnost, kdy můžete, kdy natáčíte, kdy máte čas, volno, volný čas, termíny, kalendář": [
  "📅 Termíny domlouvám vždy individuálně. Pro aktuální dostupnost se podívejte na kalendář na stránce ceníku. <button class='mlx-ai-btn' data-dest='praicing.html#calendar' data-nav='nav a[href=\"praicing.html\"]'><span class='mlx-icon'>📅</span> Zobrazit kalendář</button>"
],
"jak brzy, nejbližší termín, co nejdříve, kdy nejdřív, nejbližší volno, nejbližší datum, rychlý termín, volno brzy, asap, rychle": [
  "Obvykle mám volné termíny během několika dnů až týdnů. ⏳<br><small>Pro urgentní zakázky napište na email a podíváme se do <button onclick=\"scrollToSection('cenik')\">kalendáře dostupnosti</button>.</small>"
],
"víkend, sobota, neděle, natáčení o víkendu, volno o víkendu, termín víkend, víkendové natáčení, pracujete víkend, víkendová práce, víkend dostupnost": [
  "🎥 Ano, natáčím i o víkendech – dostupnost je vidět v <button onclick=\"scrollToSection('cenik')\">kalendáři dole v ceníku</button>."
],
"večer, natáčení večer, večerní čas, večerní termín, po práci, večerní dostupnost, večerní natáčení, odpoledne, později, noční natáčení": [
  "🌙 Večerní natáčení je možné po domluvě. Koukněte do <button onclick=\"scrollToSection('cenik')\">kalendáře dostupnosti</button> a napište mi email."
],
"jak dlouho čekám, čekání, doba čekání, dlouho čekám, kdy odpovíte, čekám na reakci, dlouhá doba, proč čekám, čekám na odpověď, čekací lhůta": [
  "Na email odpovídám většinou do 24 hodin. 📧 Pokud čekáte déle, jsem pravděpodobně na natáčení – ozvu se hned, jak to půjde."
],
"rezervace termínu, rezervace data, rezervace, zarezervovat, rezervujte, rezervovat termín, zamluvit datum, zamluvit termín, rezervace volno, domluva termínu": [
  "✅ Rezervaci provedeme přes email nebo formulář. Stačí mi napsat datum a službu.<br><small>Můžete se také podívat do <button onclick=\"scrollToSection('cenik')\">kalendáře dostupnosti</button> dole na stránce.</small>"
],
"kolik hodin, délka, doba, jak dlouho, trvání, kolik času, doba natáčení, jak dlouhé, čas natáčení, kolik hodin práce": [
  "Standardně půldenní natáčení trvá do 4 hodin ⏱, celodenní pak okolo 8 hodin. Přesně se domlouváme podle projektu."
],
"rychlý termín, expres, expresní, co nejrychleji, urgentní, spěchám, rychle, expresní termín, spěšně, urgent": [
  "⚡ Pokud spěcháte, napište mi – expresní termíny se snažím řešit co nejrychleji. Koukněte i na <button onclick=\"scrollToSection('cenik')\">kalendář dostupnosti</button>."
],
"dostupnost, kdy jste dostupný, kdy jste k dispozici, kdy můžete, časové možnosti, kdy se dá, kdy se dá natáčet, vaše dostupnost, kdy dostupný, kdy se dá domluvit": [
  "Moje dostupnost se liší podle zakázek. 📅 Nejjednodušší je podívat se do <button onclick=\"scrollToSection('cenik')\">kalendáře v sekci Ceník</button> a pak napsat email."
],
"plánování, plán, jak naplánovat, plán projektu, plánování práce, plán termínu, plán natáčení, rozvrh, časový plán, plán služeb": [
  "📌 Plán projektu připravíme po objednávce. Vždy si projdeme vaše potřeby a domluvíme harmonogram emailem."
],


  // ---- 7. CO NABÍZÍTE / SLUŽBY ----
"služby, co nabízíte, vaše služby, co děláte, jaké služby, nabídka služeb, služby prosím, co umíte, vaše nabídka, děláte": [
  "🎬 Nabízím natáčení, střih, zvuk i nasvícení scény.<br><button class='mlx-ai-btn' data-dest='portfolio.html' data-nav='nav a[href=\"portfolio.html\"]'><span class='mlx-icon'>🖼️</span> Ukázat portfolio</button> <button class='mlx-ai-btn' data-dest='praicing.html' data-nav='nav a[href=\"praicing.html\"]'><span class='mlx-icon'>💰</span> Zobrazit ceník</button>"
],
"reklamní video, firemní video, promo video, reklama, firemní promo, firemní prezentace, firemní natáčení, reklama video, business video, podnik video": [
  "📢 Specializuji se na reklamní a firemní videa.<br><small>Ukázky najdete na <a href='https://youtube.com/'>YouTube</a>.</small>"
],
"krátký film, krátký projekt, krátký snímek, mini film, krátké video, krátký klip, krátká tvorba, krátké natáčení, krátké filmy, film krátký": [
  "🎥 Točím i krátké filmy a studentské projekty.<br><small>Koukněte do <button onclick=\"scrollToSection('portfolio')\">portfolia</button>.</small>"
],
"hudební video, klip, videoklip, hudební klip, hudební spot, klip hudba, hudební natáčení, videoklip hudba, klip pro kapelu, music video": [
  "🎶 Natáčím hudební klipy pro kapely a umělce.<br><small>Najdete je na <a href='https://youtube.com/'>YouTube kanále</a>.</small>"
],
"event, záznam akce, natáčení akce, firemní akce, akce video, natáčení eventu, koncert video, festival video, oslava video, konference video": [
  "🎤 Zajišťuji záznam akcí – koncerty, oslavy i konference.<br><small>Ukázky jsou v <button onclick=\"scrollToSection('portfolio')\">portfoliu</button>.</small>"
],
"produktové video, reklama na produkt, produkt reklama, produkt spot, produkt promo, produktové spoty, produkt natáčení, produkt ukázka, produkt klip, produkt prezentace": [
  "📦 Tvořím produktová videa, která zaujmou zákazníky.<br><small>Kontakt: <a href='mailto:mlx.studio2222@gmail.com'>mlx.studio2222@gmail.com</a></small>"
],
"sociální sítě, reels, tiktok, instagram, facebook video, krátká videa na sítě, sociální video, video na instagram, video na tiktok, video na sítě, video na reels": [
  "📱 Dělám vertikální videa pro TikTok, Instagram i Reels (od 1800 Kč).<br><small>Ukázky jsou na <a href='https://instagram.com/'>Instagramu</a>.</small>"
],
"kompletní balíček, all inclusive, komplet služba, vše v jednom, balíček služeb, celý balíček, vše komplet, celý servis, all in, komplet nabídka": [
  "📦 Kompletní balíček = natáčení, střih a hudba. Firemní od 6000 Kč.<br><small>Mrkněte na <button onclick=\"scrollToSection('cenik')\">ceník</button>.</small>"
],
"jen střih, střih videa, střih, editace, úprava videa, stříhání, edit videa, postprodukce, úpravy, střih záběrů": [
  "✂️ Střih videa z vašich záběrů od 1500 Kč.<br><small>Stříhám v DaVinci Resolve.</small>"
],
"jen kamera, kameraman, natáčení, jen natáčet, kamerová práce, kamera služby, kamerování, kameraman služby, natočíte, natočit": [
  "📸 Nabízím čistě kameramanské služby (Blackmagic 6K).<br><small>Kontakt: <a href='tel:+420123456789'>+420 123 456 789</a></small>"
],

  // ---- 8. TECHNIKA ----
"technika, vybavení, gear, vaše vybavení, čím natáčíte, co používáte, vaše technika, technické vybavení, výbava, gear list": [
  "🎬 Používám profesionální filmovou techniku – kameru **Blackmagic Pocket Cinema Camera 6K**, kvalitní objektivy, zvuk, světla a další.<br><button class='mlx-ai-btn' data-dest='technika.html' data-nav='nav a[href=\"technika.html\"]'><span class='mlx-icon'>📷</span> Zobrazit techniku</button>"
],

"kamera, kamery, vaše kamera, jakou kameru, čím točíte, jak točíte, kamera vybavení, kamera info, natáčíte na co, kamera technika": [
  "📸 Hlavní kamera je **Blackmagic 6K** – nabízí filmový obraz ve vysoké kvalitě.<br><small>Více v sekci <a href='technika.html#kamera'>Kamera</a>.</small>"
],

"objektivy, čočky, vaše objektivy, jaké objektivy, lens, čočka, optika, objektivy kamera, jaká skla, výbava objektivy": [
  "🔭 Používám více **objektivů s velkým rozsahem** – pro detailní portréty i širokoúhlé záběry.<br><small>Seznam objektivů je v <a href='technika.html#kamera'>kameře</a>.</small>"
],

"zvuk, mikrofon, nahrávání, audio, vaše mikrofony, jaký mikrofon, audio záznam, zvuková technika, nahrávací zařízení, čistý zvuk": [
  "🎤 Pro zvuk používám **Zoom F1**, směrové mikrofony (shotgun) a další audio vybavení.<br><small>Podrobnosti v sekci <a href='technika.html#zvuk'>Zvuk</a>.</small>"
],

"světla, osvětlení, nasvícení, vaše světla, čím svítíte, světelná technika, nasvícení scény, osvětlení technika, jak svítíte, světla info": [
  "💡 K dispozici mám **Neewer 80C s Bowens mountem, RGB tube light, panelová světla s nastavitelnou teplotou, 90 cm softbox, kužel na světla a stojany**.<br><small>Více najdete v sekci <a href='technika.html#osvetleni'>Osvětlení</a>.</small>"
],

"softbox, světelný box, rozptyl světla, měkké světlo, světlo na portrét, softbox info, světelný difuzor, světlo rozptýlené, box světlo, světelný doplněk": [
  "📦 Používám **90 cm softbox** pro měkké, přirozené světlo – ideální na portréty i produktové focení."
],

"napájení, baterie, zdroj, energie, napájení kamery, napájení techniky, velké baterie, malé baterie, energie, napájecí systém": [
  "🔋 Mám **velkou powerbanku pro světla i techniku** a dostatek **NPF baterií** pro delší natáčení.<br><small>Více v sekci <a href='technika.html#ostatni'>Ostatní</a>.</small>"
],

"příslušenství, gear, doplňky, držáky, stabilizace, příslušenství kamera, gear navíc, filmové vybavení, ostatní technika, extra gear": [
  "🎒 Kromě hlavní techniky používám **rigy, stabilizátory, držáky, odrazky a kouřostroj**.<br><small>Seznam je v sekci <a href='technika.html#ostatni'>Ostatní</a>.</small>"
],

"dron, dron natáčení, vaše dron, máte dron, dron vybavení, natáčení dronem": [
  "🚁 K dispozici mám i **dron DJI Phantom** (FullHD, neumí 4K).<br><small>Pokud potřebujete dron ve 4K, je lepší se domluvit individuálně.</small>"
],

"střih, editace, edit, editování, jak stříháte, čím stříháte, program střih, software střih, střih program, postprodukce": [
  "✂️ Stříhám v **DaVinci Resolve** – profesionální střih, barvy i hudba."
],

"programy, software, editing software, co používáte, v čem stříháte, software technika, jaký software, editing program, program střih, technika program": [
  "💻 Používám **DaVinci Resolve** – profi color grading a postprodukce."
], 


// ---- 9. PORTFOLIO A UKÁZKY ----
"portfolio, ukázky, reference, vaše práce, ukázkové video, ukázky videí, vaše projekty, reference video, ukázka práce, ukázky projektů": [
  "🎬 Portfolio najdete na samostatné stránce. Mám tam krátké filmy i firemní videa.<br><button class='mlx-ai-btn' data-dest='portfolio.html' data-nav='nav a[href=\"portfolio.html\"]'><span class='mlx-icon'>🖼️</span> Otevřít portfolio</button>"
],
"youtube, youtube kanál, vaše videa, youtube videa, video youtube, ukázky youtube, odkaz youtube, kanál youtube, filmy youtube, vaše ukázky youtube": [
  "▶️ Ukázky jsou i na mém <a href='https://youtube.com/'>YouTube kanále</a>.<br><small>Obsahuje hotové projekty a krátké filmy.</small>"
],
"krátké filmy, filmy, krátký film, vaše filmy, projekty film, ukázky film, filmové ukázky, krátký projekt, krátké snímky, studentský film": [
  "🎥 V portfoliu najdete i krátké filmy (např. *Dva z nás*)."
],
"akční film, thriller, drama, ukázka akční, ukázka thriller, ukázka drama, vaše drama, akční ukázky, thriller projekt, žánr film": [
  "🔥 Točil jsem akční i dramatické projekty (např. *Rázná střela*).<br><small>Ukázky najdete na webu nebo <a href='https://youtube.com/'>YouTube</a>.</small>"
],
"experimentální, art, umělecký film, experiment, experimentální ukázka, art projekt, art video, art ukázky, art film, alternativní film": [
  "🎨 Dělal jsem i experimentální projekt *Eiréné*.<br><small>Ukázky jsou v <button onclick=\"scrollToSection('portfolio')\">portfoliu</button>.</small>"
],
"firemní videa, promo ukázky, ukázky firmy, firemní projekty, firemní promo ukázky, vaše firemní práce, firemní reference, firemní klient, firemní projekt, firemní spoty": [
  "🏢 V portfoliu jsou i firemní promo videa a reklamy."
],
"hudební klipy, klip ukázka, vaše klipy, hudební videa, hudební ukázka, kapela video, klip projekty, klip ukázky, hudba ukázky, klip tvorba": [
  "🎶 Natáčel jsem i hudební klipy.<br><small>Ukázky klipů najdete v <button onclick=\"scrollToSection('portfolio')\">portfoliu</button>.</small>"
],
"pomocník, role, co jste dělal, vaše role, co jste měl na starosti, úkoly, jaká práce, práce ve filmu, pomoc práce, role projekt": [
  "👤 V projektech jsem dělal kameru, střih i herectví.<br><small>Moje role se liší podle projektu.</small>"
],
"města, kde natáčíte, Brno, Praha, místa, lokace, kde jste točil, lokace film, lokace natáčení, kde jste točil, kde filmy, místa natáčení": [
  "📍 Nejčastěji točím v Brně a Praze, ale působím po celé ČR."
],
"ukázky práce, showreel, video ukázky, shrnutí práce, krátké ukázky, nejlepší práce, výběr práce, sestřih práce, sestřih ukázky, showreel video": [
  "✨ Ukázkový sestřih (showreel) najdete v <button onclick=\"scrollToSection('portfolio')\">portfoliu</button>."
],


  // ---- 10. PROČ VYBRAT MLX MEDIA ----
"proč vás, proč vybrat, proč s vámi, proč vy, proč bych vás, vaše výhody, důvod, proč zvolit, proč právě vy, proč spolupracovat": [
  "💡 Jsem mladý a nadšený, pracuji s profi technikou a do každého projektu dávám maximum.<br><small>👉 Napište mi na <a href='mailto:mlx.studio2222@gmail.com'>mlx.studio2222@gmail.com</a> a domluvíme detaily.</small>"
],
"kvalita, profi, profesionální, kvalitní práce, profi práce, kvalita práce, kvalitní video, kvalitní služby, profesionální služby, profesionální video": [
  "🎥 Dbám na precizní obraz i zvuk – kvalita je moje priorita."
],
"cena, férová cena, levněji, cenově dostupné, levnější, rozpočet, rozumná cena, cena kvalita, dostupné ceny, přijatelná cena": [
  "💰 Nabízím férové ceny přizpůsobené rozpočtu.<br><small>Koukněte do <button onclick=\"scrollToSection('cenik')\">ceníku</button>.</small>"
],
"mladý, začínající, nový, mladý kameraman, začátečník, mladá energie, mladý střih, mladý kameraman, mladý tvůrce, mladý umělec": [
  "⚡ Jsem mladý a plný energie – i přes věk pracuji profesionálně."
],
"osobní přístup, spolupráce, individuální, osobní, individuální přístup, spolupráce osobní, spolupráce s vámi, osobní komunikace, přizpůsobení, naslouchání": [
  "🤝 Spolupráce je vždy osobní a projekt přizpůsobím vaší vizi."
],
"kreativní, kreativita, originální, originální přístup, nové nápady, kreativní řešení, originální úhly, kreativní nápad, kreativní tvorba, originální práce": [
  "🎨 Každý projekt dělám kreativně a hledám originální nápady."
],
"rychlost, rychlé dodání, rychle, expresně, rychle hotovo, rychlá práce, rychlá zakázka, expresní dodání, rychle zpracované, rychle vyřízené": [
  "⚡ Zakázky dodávám rychle – malé projekty často do pár dnů."
],
"technika, vybavení, profi technika, technika kvalitní, profi kamera, profi zvuk, profi světla, technické vybavení, špičková technika, profi gear": [
  "📸 Pracuji s Blackmagic 6K a profi vybavením (světla, zvuk, stabilizace)."
],
"spokojenost, reference, spokojení klienti, dobré hodnocení, spokojení zákazníci, reference práce, reference spokojenost, vaše reference, klient spokojený, doporučení": [
  "🌟 Spokojenost klientů je pro mě priorita – mám pozitivní reference."
],
"férovost, férové jednání, fér, upřímně, férová spolupráce, férové ceny, fér přístup, upřímný přístup, férové domluvy, fér dohoda": [
  "✅ Zakládám si na férovém a otevřeném jednání."
],


 // ---- 11. PROBLÉMY / NEDOSTUPNOST ----
"nezvedá, neberete, proč nezvedáte, nezvedáte, nevoláte, nezvedli, neodpovídáte, proč nevoláte, neozýváte, neozvete": [
  "📵 Někdy jsem na natáčení a nemůžu hned zvednout.<br>👉 Zkuste mi napsat na <a href='mailto:mlx.studio2222@gmail.com'>mlx.studio2222@gmail.com</a>."
],
"čekání, dlouho čekám, neozýváte se, čekám na vás, čekám dlouho, proč čekám, čekám odpověď, čekám reakci, dlouhé čekání, žádná reakce": [
  "⏳ Odpovídám obvykle do 24 hodin.<br><small>Pokud to trvá déle, jsem nejspíš na natáčení.</small>"
],
"offline, nejste dostupný, nejste tu, proč offline, offline režim, nefungujete, nejede to, nejde to, nejste online, vypnuto": [
  "🌙 Když jsem offline, napište mi email.<br><small>Email vždy funguje i mimo systém.</small>"
],
"problém, chyba, nefunguje, něco nefunguje, chyba systém, problém stránky, problém web, chyba chatbot, problém objednávka, problém kontakt": [
  "⚠️ Pokud něco nefunguje, dejte mi vědět na <a href='mailto:mlx.studio2222@gmail.com'>mlx.studio2222@gmail.com</a>."
],
"nevíte, nerozumíte, nejste jistý, nechápete, nechápu, nevím, zmatený, nechápu otázku, nejistý, nerozumím": [
  "❓ Tomu nerozumím, zkuste to napsat jinak.<br>👉 Nebo mi napište přímo email."
],
"nepřišel email, žádný email, chybí email, email nepřišel, potvrzení nepřišlo, nepřišlo nic, mail nepřišel, žádný mail, mail chybí, mail potvrzení": [
  "📩 Podívejte se i do složky Spam.<br><small>Pokud potvrzení nedorazí, napište mi rovnou email.</small>"
],
"nefunguje formulář, chyba formulář, formulář nejde, formulář problém, formulář chybí, formulář nefunguje, formulář chyba, nejde vyplnit, formulář neodesílá, formulář neodešle": [
  "📝 Pokud formulář nefunguje, klidně napište rovnou na email.<br><small>Formulář je jen jedna z možností.</small>"
],
"proč tak dlouho, dlouhá doba, kdy to bude, kdy přijde, kdy hotovo, kdy dodáte, kdy dokončíte, kdy pošlete, jak dlouho to trvá, dlouho to trvá": [
  "📦 Doba dodání záleží na projektu.<br><small>Menší zakázky pár dní, větší týdny.</small>"
],
"proč to nebere, proč to nefunguje, nejde to, proč to nejde, systém nejde, služba nejde, proč služba nejde, nebere to, server nejde, stránka nejde": [
  "🔧 Pokud něco nejde, napište mi prosím email.<br><small>Občas má systém výpadek.</small>"
],
"pomalý, pomalu, proč pomalu, pomalu odpovídáte, pomalu reagujete, pomalu dodáváte, proč pomalé, pomalá reakce, pomalé dodání, pomalý systém": [
  "🐢 Odpovídám jak nejrychleji to jde.<br><small>Pomalost může být kvůli natáčení.</small>"
],

// ---- 12. FALLBACK ----
"nevím, nechápu, nerozumím, zmatený, nejasné, neznám, cože, jak, co, pomoc": [
  "🤔 Tomu nerozumím, zkuste to napsat jinak.<br>👉 Nebo napište na <a href='mailto:mlx.studio2222@gmail.com'>mlx.studio2222@gmail.com</a>."
],
"otázka, dotaz, mám dotaz, potřebuji poradit, potřebuji info, otázka prosím, otázka k vám, potřebuji něco, chci vědět, dotaz info": [
  "❓ Dotaz můžete napsat sem nebo emailem.<br><small>Složitější věci řeším přes email.</small>"
],
"hledám, nemůžu najít, kde to je, kde najdu, hledám info, kde je to, nevím kde, nemůžu najít info, hledám stránku, kde najít": [
  "🔎 Mrkněte do horního menu.<br>👉 <button onclick=\"scrollToSection('portfolio')\">Portfolio</button> | <button onclick=\"scrollToSection('cenik')\">Ceník</button>"
],
"kontakt osobně, osobní setkání, setkat se, domluvit osobně, potkat, osobní schůzka, osobně, osobní domluva, schůzka, osobní kontakt": [
  "🤝 Osobní setkání lze domluvit po emailu.<br><small>Schůzky si plánuji podle kalendáře.</small>"
],
"nefunguje, chyba, něco se pokazilo, bug, problém, systém nejde, nefunguje služba, nejde stránka, nejde systém, problém služba": [
  "⚠️ Může to být technická chyba.<br>👉 Pokud něco nejde, napište email."
],
"jak začít, kde začít, chci začít, potřebuji začít, první krok, začínám, jak začnu, od čeho začít, začít spolupráci, začít projekt": [
  "🚀 Začít můžete objednávkou přes <button onclick=\"scrollToSection('objednavka')\">formulář</button>.<br><small>Stačí pár základních informací a domluvíme detaily.</small>"
],
"co nabízíte, co děláte, co umíte, vaše služby, služby info, služby vaše, jaké služby, nabídka služeb, vaše nabídka, nabídka info": [
  "🎬 Nabízím natáčení, střih a kompletní video produkci.<br>👉 Mrkněte na <button onclick=\"scrollToSection('cenik')\">Ceník</button>."
],
"co je mlx media, mlx media, kdo jste, co to je, mlx info, mlx media info, vaše značka, vaše studio, mlx co, mlx media kdo": [
  "🎥 MLX Media je moje značka – kameraman a střihač Matouš Lexa.<br><small>Specializuji se na video produkci.</small>"
],
"pomoc, potřebuji pomoc, help, pomoc prosím, potřebuju pomoc, potřebuju radu, pomoc rada, help me, potřebuji radu, potřebuji podporu": [
  "🆘 Rád vám pomůžu – napište mi víc o problému.<br>👉 Email: <a href='mailto:mlx.studio2222@gmail.com'>mlx.studio2222@gmail.com</a>"
],
"děkuji, díky, díky moc, děkuji vám, dík, děkujeme, děkuji mockrát, dík moc, moc díky, velké díky": [
  "🙏 Já děkuji, jsem rád, že jsem mohl pomoci.<br><small>Rádo se stalo!</small>"
],

// ---- 13. DODÁNÍ / FORMÁTY ----
"dodání, jak dostanu video, formát videa, jak pošlete, posíláte video, video dodání, export, hotové video, v jaké kvalitě, v čem video": [
  "📦 Hotové video posílám přes online odkaz (Drive / YouTube neveřejně).",
  "🎬 Standardně dodávám ve FullHD nebo 4K.",
  "📂 Formáty MP4 (H.264) – další formáty na přání. jsem v celku flexibilní ohledně formátů."
],
"více verzí, kolik verzí, různé formáty, více formátů, export více, export varianty, různé varianty": [
  "📑 Dodávám více verzí (např. horizontální i vertikální).",
  "🎯 Vždy přizpůsobím formáty podle použití (sítě, web, prezentace)."
],
"archivace, uchování, jak dlouho uchováváte, archiv, zůstane video, dostupnost souborů": [
  "💾 Soubory uchovávám minimálně 1 měsíc.",
  "🔄 Doporučuji si je stáhnout a zálohovat pro jistotu."
],

// ---- 14. PLATEBNÍ PODMÍNKY ----
"platba, jak se platí, způsob platby, platební metody, faktura, účet, hotově, převodem": [
  "💳 Platba probíhá převodem na účet (faktura).",
  "🧾 Vystavuji fakturu pro firmy i jednotlivce.",
  "💵 Hotovost je možná jen výjimečně po domluvě."
],
"záloha, předem, platba předem, rezervační platba, platba před, rezervační záloha": [
  "🔒 U větších zakázek beru zálohu (obvykle 30–50%).",
  "💡 Záloha slouží k rezervaci termínu."
],
"splatnost, kdy platit, kdy zaplatit, do kdy zaplatit, splatnost faktury, termín platby": [
  "📅 Standardní splatnost faktur je 14 dní.",
  "⚡ U expresních zakázek je platba ihned po dodání."
],

// ---- 15. REVIZE / ÚPRAVY ----
"revize, změny, úpravy, opravy, opravíte, můžu změnit, dodatečné změny, další úpravy, editace navíc, změna videa": [
  "✏️ V ceně je 1 základní revize zdarma.",
  "🔄 Další úpravy jsou možné po domluvě.",
  "💡 Chci, abyste byli spokojení – proto vítám připomínky."
],
"kolik revizí, počet revizí, kolik oprav, kolik změn, revize zdarma, opravy zdarma": [
  "✅ Standardně nabízím 1 revizi zdarma.",
  "📌 Více revizí je možné dle rozsahu zakázky."
],
"dodatečné náklady, příplatek za změny, cena úprav, kolik za úpravy, úpravy cena": [
  "💰 Dodatečné úpravy nad rámec jsou účtovány podle času.",
  "🕒 Cena závisí na rozsahu změn."
],

// ---- 16. ZTRÁTY A NÁLEZY ----
"ztráta, ztracené, zapomenuté věci, ztracený předmět, něco jsem ztratil": [
  "📦 Pokud jste při natáčení nebo spolupráci něco ztratili, dejte mi prosím vědět co nejdříve. Kontaktujte mě na <a href='mailto:mlx.studio2222@gmail.com'>mlx.studio2222@gmail.com</a> nebo na čísle <a href='tel:+420123456789'>+420 123 456 789</a>.",
  "🔑 Já osobně se snažím všechny ztracené věci uschovat – napište mi na <a href='mailto:mlx.studio2222@gmail.com'>mlx.studio2222@gmail.com</a> nebo zavolejte na <a href='tel:+420123456789'>+420 123 456 789</a>, a zkusíme to dohledat.",
  "📱 Často se věci rychle najdou, když se ozvete hned po natáčení – pište na <a href='mailto:mlx.studio2222@gmail.com'>mlx.studio2222@gmail.com</a> nebo volejte <a href='tel:+420123456789'>+420 123 456 789</a>."
],

"nález, našel jsem, nalezený předmět, našel jsem věc, mám vaši věc": [
  "🙏 Pokud jste našli něco, co by mohlo patřit mně (např. technika, baterie, kabely), budu moc vděčný, když mi dáte vědět. Ozvěte se prosím na <a href='mailto:mlx.studio2222@gmail.com'>mlx.studio2222@gmail.com</a> nebo na číslo <a href='tel:+420123456789'>+420 123 456 789</a>.",
  "✉️ Nejlépe napište na <a href='mailto:mlx.studio2222@gmail.com'>mlx.studio2222@gmail.com</a>, případně zavolejte na <a href='tel:+420123456789'>+420 123 456 789</a> – vše si domluvíme.",
  "Děkuji předem za poctivost a ochotu! Prosím dejde mi prosím vědět přes telefon nebo email. 🙂 Kontakt: <a href='mailto:mlx.studio2222@gmail.com'>mlx.studio2222@gmail.com</a> | <a href='tel:+420123456789'>+420 123 456 789</a>."
],

"ztráty a nálezy, něco se ztratilo, hledám věci, hledám předmět": [
  "📦 Pokud jde o moje vybavení, vždy je možnost, že se něco zapomnělo na place. Ozvěte se prosím na <a href='mailto:mlx.studio2222@gmail.com'>mlx.studio2222@gmail.com</a> nebo zavolejte na <a href='tel:+420123456789'>+420 123 456 789</a>.",
  "✉️ Děkuji moc za snahu vrácení, Nejlepší je napsat mi na <a href='mailto:mlx.studio2222@gmail.com'>mlx.studio2222@gmail.com</a> nebo zavolat na <a href='tel:+420123456789'>+420 123 456 789</a> – probereme detaily a ověříme, jestli věc patří mně.",
  "🙏 Děkuji moc za ochotu pomoci! Nejlépe mi zavolejte nebo napište. Kontakt: <a href='mailto:mlx.studio2222@gmail.com'>mlx.studio2222@gmail.com</a> | <a href='tel:+420123456789'>+420 123 456 789</a>."
]
};

// --- Synonym map (optional to separate too) ---
const synonymMap = {
    pozdrav: [
    "ahoj","cau","čau","nazdar","zdar","dobrý den","dobry den","zdravim","hezký den",
    "čauko","cus","čus","čauky","čest","hello","hi","servus","zdarec"
  ],

  objednavka: [
    "objednat","objednavka","objednavku","objednam","objednám","objednávám","objednávat",
    "chci objednat","chci objednať","udělat objednávku","jak objednat","jak si objednat",
    "potřebuju objednat","potřeboval bych objednat",
    "rezervace","rezervovat","rezervuji","rezervuju","rezervoval bych","chci rezervovat",
    "zarezervovat","zarezervuji","zarezervuju",
    "zabookovat","booknout","bookni","zabookuj","zabookoval bych",
    "můžu objednat","můžu rezervovat","objednávám si"
  ],

  kontakt: [
    "kontakt","kontaktujte","kontaktovat","kontaktni udaje","kontaktni email",
    "napište mi","můžu vám napsat","email","e-mail","mail","pošlu mail","pošlu email",
    "gmail","adresa","kontakt na vás","kontaktujte mě",
    "telefon","mobil","číslo","telefonní číslo","zavolat vám","můžu zavolat",
    "jak vás kontaktovat"
  ],

  cena: [
    "cena","ceník","kolik to stojí","kolik stojí","kolik zaplatím","kolik platím",
    "kolik peněz","kolik za to","jaká cena","kolik to bude stát","kolik stojí služba",
    "jaká je cena","jaký je ceník","cenová nabídka","cenova kalkulace",
    "cena projektu","cena videa","kolik účtujete","kolik chcete","kolik vyjde",
    "kolik by to stálo","cena služby","cenové info"
  ],

  termin: [
    "termín","termíny","kdy","kdy máte čas","kdy máte volno","dostupnost",
    "volné termíny","rezervace termínu","nejbližší termín","kdy natáčíte",
    "můžu si rezervovat","kdy byste mohl","kdy je volno","čas natáčení",
    "rezerva","dny volné","máte čas"
  ],

  sluzby: [
    "služby","co nabízíte","co děláte","jaké služby","jaké máte služby",
    "nabídka služeb","vaše služby","co umíte","v čem pomůžete","jak můžete pomoct",
    "co poskytujete","jaké poskytujete služby","vaše nabídka","nabízíte","nabízíte služby",
    "jaké máte nabídky"
  ],

  svetla: [
    "svetlo","světlo","svetla","světla","osvetleni","osvětlení","nasviceni","nasvícení",
    "lampy","reflektor","světelná technika","light","lights","jaké světla máte",
    "můžete mi nasvítit scénu"
  ],

  technika: [
    "technika","vybavení","kamera","kamery","kamerka","blackmagic","bm6k",
    "blackmagic kamera","střih","stříhání","střihat","davinci","resolve",
    "zvuk","mikrofon","mikrák","nahrávání zvuku","audio"
  ],

  portfolio: [
    "portfolio","ukázky","ukázka","reference","projekty","hotové práce",
    "dokončené projekty","video ukázky","videoukázky","youtube","kanál",
    "kanál youtube","videa","moje práce","tvoje práce","vaše práce","filmografie"
  ],

  proc: [
    "proč vás vybrat","proč vy","proč právě vás","proč s vámi","vaše výhody",
    "proč spolupracovat","proč mlx","proč studio","proč bych měl","čím jste lepší",
    "proč lepší","proč jste dobří","proč si vás vybrat"
  ],

  problem: [
    "nefunguje","nejde","chyba","error","systém nefunguje","nezvedáte","proč nezvedáte",
    "nezvedá telefon","neodpovídáte","čekám dlouho","proč čekám","čekám odpověď",
    "offline","nejste online","proč nejste dostupní","kde jste","proč neodpovídáte"
  ],

  fallback: [
    "nevím","nechápu","nerozeznám","cože","jak to","pomoc","help","zmatený",
    "nejasné","co","jak","dotaz","mám otázku","otázka"
  ],

    dodani: [
    "dodání","dodani","dostat video","jak dostanu","jak obdržím","obdrzet",
    "obdržím video","pošlete video","poslete video","jak pošlete","pošlete odkaz",
    "formát","format","v jakém formátu","formát videa","kvalita videa","rozlišení",
    "export","exportovat","jaký export","fullhd","4k","mp4","soubor","soubory",
    "archiv","uložení","ulozit","jak dlouho uchováváte","jak dlouho bude dostupné",
    "drive","google drive","odkaz","link","stažení","download","stáhnout"
  ],

  platba: [
    "platba","platit","zaplatit","platím","zaplatím","úhrada","uhrada","jak se platí",
    "způsob platby","jak zaplatit","platba převodem","bankovní převod","na účet",
    "číslo účtu","iban","faktura","účtenka","paragon","doklad","hotově","hotovost",
    "platební metoda","splatnost","termín platby","kdy platit","kdy zaplatit",
    "záloha","platba předem","předem","rezervační platba","rezervacni zaloha",
    "doplatek","doplatit","doplatek faktura"
  ],

  revize: [
    "revize","revizi","opravit","opravy","opravíte","udělat změny","změny",
    "změnit video","můžu změnit","upravit","úprava","úpravy","dodatečné úpravy",
    "úpravy navíc","další úpravy","další verze","oprava","revizní verze",
    "kolik revizí","počet revizí","kolik změn","kolik oprav","revize zdarma",
    "opravy zdarma","více verzí","víc verzí","jiná verze","jiný střih","verze navíc",
    "dodatečné náklady","příplatek","příplatek za změny","cena úprav",
    "kolik stojí úpravy","úpravy cena"
  ],

 ztraty: [
    // Ztráta
    "ztratil jsem","ztraceno","ztráta","ztracené","ztracený předmět",
    "ztracená věc","zapomněl jsem","zapomněl věc","nechal jsem tam",
    "ztratil věc","něco jsem ztratil","zapomenutá věc","ztratil batoh",
    "ztratil telefon","ztratil klíče","ztratil peněženku",

    // Nález
    "našel jsem","našel jsem věc","nalezené","nalezený předmět",
    "mám vaši věc","nalezeno","našel jsem něco","našel předmět",
    "našel batoh","našel klíče","našel telefon","našel peněženku",

    // Obecně
    "ztráty a nálezy","ztracené věci","nalezené věci",
    "ztratil předmět","našel předmět","něco se ztratilo","něco jsem našel"
  ]
};
