// --- Knowledge base ---
// MLX Media ChatBot Knowledge  v3.2
// Changes from v3.1:
//  - Email updated everywhere: info@mlxmedia.cz
//  - Lost & Found: added Ztrata-Nalez.html button
//  - Delivery time fallback: clarified 4-10 days
//  - New sections: identity (Matouš / Lexa / mlxmedia), wedding (svadba/wedding),
//    casual/off-topic bridging, greetings expansion
const knowledge = {

  // ---- 1. POZDRAV / ÚVOD ----
  "ahoj, čau, dobrý den, zdravím, nazdar, hezký den, čus, servus, zdar, čauko, dobré ráno, dobrý večer, good morning, hello, hi, hey, greetings, čauky, čest, zdarec, čaues, hoj, salut": [
    "Dobrý den, jsem MLX AI – asistent pro klienty MLX Media. Mohu vám pomoct s informacemi nebo objednávkou?",
    "Ahoj, vítejte u MLX Media! Rád vám shrnu ceny, služby nebo kontakt.",
    "Zdravím vás! Jsem MLX AI a poradím vám, kde najdete objednávku nebo jak získat kalkulaci."
  ],

  // ---- 1b. KDO JSI / IDENTITA BOTA ----
  "kdo jsi, kdo jste, co jsi za AI, co jsi, jak se jmenuješ, jsi robot, jsi AI, co jsi zač, jsi člověk, mluvím s robotem": [
    "Jsem MLX AI – virtuální asistent MLX Media. 🤖 Nejsem reálný člověk, ale poradím vám se vším ohledně videí, cen nebo objednávek. Pokud potřebujete něco složitějšího, přepnu vás na Matouše. 😊",
    "Jsem chatbot MLX Media – umím odpovídat na otázky o službách, cenách, objednávkách i technice. Jsem AI, takže mám limity, ale snažím se pomoct co nejlíp!"
  ],

  // ---- 1c. KDO JE MATOUŠ / LEXA / MLX MEDIA ----
  "matouš, matous, lexa, matouš lexa, kdo je matouš, kdo je lexa, kdo je za mlx, kdo stojí za mlx, kdo vás provozuje, kdo to točí, kdo točí videa, majitel mlx, kdo natáčí, mlxmedia, mlx_media, mlx media kdo, kdo je kameraman, kdo jste vy": [
    "👋 Matouš Lexa je kameraman, střihač a tvůrce za značkou MLX Media. Točí svatby, firemní videa, krátké filmy, reklamy i eventy – s kamerou Blackmagic 6K a důrazem na kvalitu. Kontakt: <a href='mailto:info@mlxmedia.cz'>info@mlxmedia.cz</a> nebo <a href='tel:+420777413600'>+420 777 413 600</a>.",
    "🎬 MLX Media = Matouš Lexa – mladý profesionální kameraman z Berounska. Specializuje se na video produkci: svatby, promo videa, krátké filmy i firemní obsah. <br><button class='mlx-ai-btn' data-dest='Portfolio.html' data-nav='nav a[href=\"Portfolio.html\"]'><span class='mlx-icon'>🖼️</span> Ukázat portfolio</button>"
  ],

  // ---- 2. OBJEDNÁVKA ----
  "objednávka, objednat, objednej, rezervace, chci objednat, jak objednat, můžu objednat, objednávku, objednání, rezervovat": [
    "Objednávku provedete jednoduše vyplněním online formuláře. Ihned po odeslání dostanete potvrzovací email. Během téhož nebo následujícího dne vám zavoláme a domluvíme podrobnosti. Pokud by formulář nefungoval, můžete napsat na email nebo zavolat.<br><button class='mlx-ai-btn' data-dest='Objednávka.html' data-nav='nav a[href=\"Objednávka.html\"]'><span class='mlx-icon'>📝</span> Vyplnit formulář</button><br><button class='mlx-ai-btn' data-dest='mailto:info@mlxmedia.cz' data-nav='nav a[href=\"mailto:info@mlxmedia.cz\"]'><span class='mlx-icon'>✉️</span> Napsat email</button><br><button class='mlx-ai-btn' data-dest='tel:+420777413600' data-nav='nav a[href=\"tel:+420777413600\"]'><span class='mlx-icon'>📞</span> Zavolat</button> 😊"
  ],
  "formulář, vyplnit formulář, kde je formulář, formulář objednávka, online formulář, objednávkový formulář, rezervační formulář, kde najdu formulář, formulář na webu, vyplňování formuláře": [
    "Formulář pro objednávku najdete na stránce Objednávka. Po jeho vyplnění se objednávka automaticky zaregistruje a přijde vám ověřovací email.<br><button class='mlx-ai-btn' data-dest='Objednávka.html' data-nav='nav a[href=\"Objednávka.html\"]'><span class='mlx-icon'>📝</span> Otevřít formulář</button>"
  ],
  "potvrzení objednávky, potvrzení, ověřovací email, ověření, schválení, potvrdit objednávku, potvrzení termínu, potvrzovací zpráva, ověření objednávky, email potvrzení": [
    "Po vyplnění formuláře vám dorazí ověřovací email. Ten potvrzuje, že systém objednávku správně přijal a že vaše údaje sedí. Následně se vám ozveme telefonicky pro doladění detailů.<br><button class='mlx-ai-btn' data-dest='Objednávka.html' data-nav='nav a[href=\"Objednávka.html\"]'><span class='mlx-icon'>📝</span> Vyplnit formulář</button>"
  ],
  "po objednávce, co se stane po objednávce, reakce, jak dlouho čekat, ozvete se, kdy zavoláte, co dál, postup po objednávce, co následuje, reakce na objednávku": [
    "Jakmile odešlete formulář, přijde potvrzovací email. Poté vám zavoláme – většinou ten samý den, maximálně následující pracovní den. Domluvíme spolu všechny detaily natáčení či služby.<br><button class='mlx-ai-btn' data-dest='tel:+420777413600' data-nav='nav a[href=\"tel:+420777413600\"]'><span class='mlx-icon'>📞</span> Čekat na hovor</button>"
  ],
  "telefonát, zavoláte mi, kdy zavoláte, budete volat, kdy voláte, ozvete se, voláte, volání, zpětný hovor, čekám na telefon": [
    "Telefonicky se ozýváme po každé objednávce – někdy hned během pár hodin, jindy až následující den (podle času odeslání). Pokud bychom se dlouho neozývali, napište prosím na email.<br><button class='mlx-ai-btn' data-dest='mailto:info@mlxmedia.cz' data-nav='nav a[href=\"mailto:info@mlxmedia.cz\"]'><span class='mlx-icon'>✉️</span> Napsat email</button>"
  ],
  "ai objednávka, můžeš objednat, udělej objednávku, rezervuj mi termín, objednej to, můžeš to za mě objednat, objednávku za mě, zarezervuj, zkus objednat, objednávka přes AI": [
    "Já jsem MLX AI 😊 – rád vám vysvětlím postup, ale objednávku za vás vytvořit neumím. Vyplňte prosím formulář, nebo napište na email. Rezervace probíhá vždy ručně.<br><button class='mlx-ai-btn' data-dest='Objednávka.html' data-nav='nav a[href=\"Objednávka.html\"]'><span class='mlx-icon'>📝</span> Vyplnit formulář</button><br><button class='mlx-ai-btn' data-dest='mailto:info@mlxmedia.cz' data-nav='nav a[href=\"mailto:info@mlxmedia.cz\"]'><span class='mlx-icon'>✉️</span> Napsat email</button>"
  ],
  "jak rezervovat, rezervace, rezervovat termín, rezervace služby, rezervace natáčení, rezervovat, rezervace přes web, rezervace přes formulář, rezervace email, rezervace online": [
    "Rezervaci provedete vyplněním formuláře. Pokud by to nešlo, napište mi na email. Potvrzení rezervace dostanete zpět emailem a následně i telefonicky.<br><button class='mlx-ai-btn' data-dest='Objednávka.html' data-nav='nav a[href=\"Objednávka.html\"]'><span class='mlx-icon'>📝</span> Rezervovat přes formulář</button><br><button class='mlx-ai-btn' data-dest='mailto:info@mlxmedia.cz' data-nav='nav a[href=\"mailto:info@mlxmedia.cz\"]'><span class='mlx-icon'>✉️</span> Rezervovat emailem</button>"
  ],
  "problém s objednávkou, nejde objednat, formulář nefunguje, neodeslalo se, problém formulář, nefunguje objednávka, chyba objednávka, objednávka se nezdařila, neodesláno, nejde vyplnit": [
    "Pokud by formulář nefungoval, napište mi prosím rovnou na email nebo zavolejte. Občas může být krátký výpadek, ale email i telefon fungují vždy.<br><button class='mlx-ai-btn' data-dest='mailto:info@mlxmedia.cz' data-nav='nav a[href=\"mailto:info@mlxmedia.cz\"]'><span class='mlx-icon'>✉️</span> Napsat email</button><br><button class='mlx-ai-btn' data-dest='tel:+420777413600' data-nav='nav a[href=\"tel:+420777413600\"]'><span class='mlx-icon'>📞</span> Zavolat</button>"
  ],
  "storno, zrušení objednávky, chci zrušit, zrušit rezervaci, zrušit objednávku, storno objednávky, odhlásit, zrušit termín, ruším objednávku, zrušení": [
    "Pokud potřebujete objednávku zrušit, stačí napsat email. Storno řešíme vždy individuálně a férově. 🙂<br><button class='mlx-ai-btn' data-dest='mailto:info@mlxmedia.cz' data-nav='nav a[href=\"mailto:info@mlxmedia.cz\"]'><span class='mlx-icon'>✉️</span> Zrušit emailem</button>"
  ],


  // ---- 3. KONTAKT ----
  "kontakt, jak kontaktovat, spojení, kde vás najdu, kontaktujte, kontakt na vás, spojit se, spojení s vámi, kontakt info, vaše kontakty": [
    "Najdete mě snadno 😊<br>Email: <a href='mailto:info@mlxmedia.cz'>info@mlxmedia.cz</a><br>Telefon: <a href='tel:+420777413600'>+420 777 413 600</a><br>YouTube: <a href='https://www.youtube.com/@MLX-Media' target='_blank'>MLX YouTube</a><br><button class='mlx-ai-btn' data-dest='#footer' data-target='#footer' data-outline='rounded'><span class='mlx-icon'>👇</span> Zobrazit kontakty dole</button>"
  ],
  "email, napište email, mail, napiš mi, emailová adresa, kontakt email, váš email, email prosím, email info, napište mi email": [
    "Můj email je <a href='mailto:info@mlxmedia.cz'>info@mlxmedia.cz</a>. Nejrychleji se domluvíme právě přes email. ✉️"
  ],
  "telefon, volejte, číslo, mobil, zavolat, volejte mi, vaše číslo, jaké číslo, kontakt číslo, tel": [
    "Můžete mi zavolat na <a href='tel:+420777413600'>+420 777 413 600</a>. 📞 Pokud bych hovor nezvedl, zkuste email."
  ],
  "web, webová stránka, stránky, web link, adresa webu, web prosím, vaše stránky, stránka mlx, odkaz, link": [
    "Oficiální web je <a href='https://www.mlxmedia.cz' target='_blank'>www.mlxmedia.cz</a>. Najdete tam portfolio, ceník i objednávku. 🌐"
  ],
  "youtube, youtube kanál, ukázky videí youtube, odkaz youtube, video youtube, máte youtube, vaše youtube, link youtube, vaše videa, videa youtube": [
    "Ukázky videí jsou na mém YouTube kanále 🎬 👉 <a href='https://www.youtube.com/@MLX-Media' target='_blank'>MLX YouTube</a>."
  ],
  "instagram, instagram profil, vaše ig, máte instagram, odkaz instagram, link ig, vaše insta, ukázky instagram, reels, vaše fotky": [
    "Na Instagramu sdílím krátká videa a fotky ze zákulisí 📸 👉 <a href='https://instagram.com/mlx_media_' target='_blank'>@mlx_media_</a>."
  ],
  "portfolio, reference, ukázky, vaše práce, ukázky videí, reference projekty, ukázkové video, ukázka tvorby, ukázky práce, vaše projekty": [
    "Portfolio je dostupné zde: <button class='mlx-ai-btn' data-dest='Portfolio.html' data-nav='nav a[href=\"Portfolio.html\"]'><span class='mlx-icon'>🖼️</span> Ukázat portfolio</button> Najdete tam filmy, promo videa i firemní projekty. 🎥"
  ],
  "adresa, kde jste, sídlo, vaše adresa, kancelář, kde najdu, odkud jste, místo, kde vás najdu, sídlo firmy, kde působíte": [
    "Primárně působím v Berouně a Praze. 📍 Více o lokacích najdete v sekci Mapa na ceníku.<br><button class='mlx-ai-btn' data-dest='Ceník.html#mapa' data-nav='nav a[href=\"Ceník.html\"]'><span class='mlx-icon'>🗺️</span> Zobrazit Mapu</button>"
  ],
  "jak se spojit, jak komunikovat, spojení, komunikace, jak vás zastihnu, kdy volat, nejlepší kontakt, spojit se s vámi, dostupnost, kdy vás kontaktovat": [
    "Nejlépe přes email: <a href='mailto:info@mlxmedia.cz'>info@mlxmedia.cz</a> – odpovídám do 24 hodin. 📧"
  ],
  "neodpovídáte, nereagujete, proč neodpovídáte, nereakce, proč nic nepíšete, dlouho čekám, nevoláte, nereaguje nikdo, neodpověděl jste, mlčíte": [
    "Odpovídám co nejrychleji, obvykle do 24 hodin. ⏱️ Někdy jsem na natáčení a nemohu reagovat hned. Pokud se dlouho neozývám, zkuste to znovu emailem: <a href='mailto:info@mlxmedia.cz'>info@mlxmedia.cz</a>."
  ],


  // ---- 4. CENÍK / ORIENTAČNÍ CENA ----
  "ceník, ceny, kolik stojí, cena, jaká cena, vaše ceny, orientační cena, ukázkový ceník, ceník služeb, kolik peněz": [
    "🎥 Orientační ceník služeb:<br>• Natáčení od 2000 Kč<br>• Střih od 1500 Kč<br>• Kompletní video od 3500 Kč<br>• Promo balíček od 6000 Kč<br>• Vertikální video (TikTok/Reels) od 1800 Kč<br><small>❗ Přesná cena se vždy řeší osobně.</small><br><button class='mlx-ai-btn' data-dest='Ceník.html#cenik-intro' data-nav='nav a[href=\"Ceník.html\"]' data-target='#cenik-intro'><span class='mlx-icon'>💰</span> Zobrazit kompletní ceník</button> <button class='mlx-ai-btn' data-dest='Ceník.html#pro-calculator' data-nav='nav a[href=\"Ceník.html\"]' data-target='#pro-calculator'><span class='mlx-icon'>🧮</span> Otevřít kalkulačku</button>"
  ],

  "kolik stojí natáčení, cena natáčení, půlden natáčení": [
    "🎬 Půldenní natáčení (do 4 hod) je od 2000 Kč.<br><small>Cena záleží na lokaci a náročnosti projektu.</small><br><button class='mlx-ai-btn' data-dest='Ceník.html#pro-calculator' data-nav='nav a[href=\"Ceník.html\"]' data-target='#pro-calculator'><span class='mlx-icon'>🧮</span> Spočítat cenu v kalkulačce</button>"
  ],

  "cena střih, střih cena, cena střihu videa": [
    "✂️ Střih z vašich záběrů (do 2 minut) je od 1500 Kč.<br>Zahrnuje barvy, hudbu i titulky.<br><small>Cena se liší podle délky a složitosti videa.</small><br><button class='mlx-ai-btn' data-dest='Ceník.html#calculator' data-nav='nav a[href=\"Ceník.html\"]' data-target='#calculator'><span class='mlx-icon'>🧮</span> Spočítat cenu v kalkulačce</button>"
  ],

  "kompletní video, balíček video, cena komplet": [
    "🎞️ Kompletní video (natáčení + střih do 3 minut) je od 3500 Kč.<br>Obsahuje záběry, střih, hudbu i základní grafiku.<br><button class='mlx-ai-btn' data-dest='Ceník.html#pro-calculator' data-nav='nav a[href=\"Ceník.html\"]' data-target='#pro-calculator'><span class='mlx-icon'>🧮</span> Spočítat cenu v kalkulačce</button>"
  ],

  "promo balíček, firemní promo, promo cena": [
    "🏢 Firemní promo balíček je od 6000 Kč.<br>Obsahuje 1 den natáčení, střih, logo a hudbu, dodávám i ve více formátech.<br><button class='mlx-ai-btn' data-dest='Ceník.html#pro-calculator' data-nav='nav a[href=\"Ceník.html\"]' data-target='#pro-calculator'><span class='mlx-icon'>🧮</span> Spočítat promo balíček</button>"
  ],

  "vertikální video, tiktok video, reels, krátké video cena": [
    "📱 Vertikální video (do 1 min, trendy střih) je od 1800 Kč.<br>Perfektní pro TikTok, Reels a Shorts.<br><button class='mlx-ai-btn' data-dest='Ceník.html#pro-calculator' data-nav='nav a[href=\"Ceník.html\"]' data-target='#pro-calculator'><span class='mlx-icon'>🧮</span> Spočítat cenu v kalkulačce</button>"
  ],

  "individuální nabídka, cena na míru, kalkulace": [
    "💼 Každý projekt je jiný – rád připravím nabídku na míru.<br><button class='mlx-ai-btn' data-dest='Objednávka.html' data-nav='nav a[href=\"Objednávka.html\"]' data-target='.order-btn'><span class='mlx-icon'>📝</span> Objednat nabídku na míru</button> <button class='mlx-ai-btn' data-dest='Ceník.html#pro-calculator' data-nav='nav a[href=\"Ceník.html\"]' data-target='#pro-calculator'><span class='mlx-icon'>🧮</span> Vyzkoušet kalkulačku</button>"
  ],

  "cestovné, cena cestovné, kolik stojí cesta": [
    "🚗 Cestovné se účtuje podle vzdálenosti – cena je vždy domluvená předem.<br><button class='mlx-ai-btn' data-dest='Ceník.html#cenik-intro' data-nav='nav a[href=\"Ceník.html\"]' data-target='#cenik-intro'><span class='mlx-icon'>💰</span> Podívat se na ceník</button>"
  ],

  "nejste nejdražší, cena férová, férové ceny": [
    "✅ Ceny držím férové a dostupné – chci být nejlepší volba, ne nejdražší.<br><button class='mlx-ai-btn' data-dest='index.html#why-me' data-nav='nav a[href=\"index.html\"]' data-target='.why-me'><span class='mlx-icon'>⏳</span> Jak probíhá spolupráce</button>"
  ],

  "přesná kalkulace, kalkulace ceny, cenová nabídka": [
    "💡 Já (MLX AI) umím ukázat jen orientační ceny.<br>Přesnou kalkulaci si můžete rovnou <b>spočítat v kalkulačce</b>.<br><button class='mlx-ai-btn' data-dest='Ceník.html#pro-calculator' data-nav='nav a[href=\"Ceník.html\"]' data-target='#pro-calculator'><span class='mlx-icon'>🧮</span> Otevřít kalkulačku</button>"
  ],


  // ---- 5. PŘESNÁ KALKULACE / NABÍDKA NA MÍRU ----
  "nabídka na míru, balíček na míru, kalkulace na míru": [
    "💼 Rád připravím balíček přesně podle vašich potřeb.<br><button class='mlx-ai-btn' data-dest='Objednávka.html' data-nav='nav a[href=\"Objednávka.html\"]' data-target='.order-btn'><span class='mlx-icon'>📝</span> Objednat nabídku</button> <button class='mlx-ai-btn' data-dest='Ceník.html#pro-calculator' data-nav='nav a[href=\"Ceník.html\"]' data-target='#pro-calculator'><span class='mlx-icon'>🧮</span> Spočítat orientační cenu</button>"
  ],

  "speciální požadavek, chci speciální video, jiné služby": [
    "🎬 Každý projekt je originál – napište mi email s vaším požadavkem a domluvíme se.<br><button class='mlx-ai-btn' data-dest='Portfolio.html' data-nav='nav a[href=\"Portfolio.html\"]' data-target='.portfolio-grid'><span class='mlx-icon'>🎥</span> Prohlédnout portfolio</button> <button class='mlx-ai-btn' data-dest='Ceník.html#pro-calculator' data-nav='nav a[href=\"Ceník.html\"]' data-target='#pro-calculator'><span class='mlx-icon'>🧮</span> Spočítat orientačně</button>"
  ],

  "sleva, slevy, akce, zvýhodněná cena": [
    "💰 Občas nabízím slevy nebo zvýhodněné balíčky – hlavně pro větší zakázky.<br><button class='mlx-ai-btn' data-dest='Ceník.html#cenik-intro' data-nav='nav a[href=\"Ceník.html\"]' data-target='#cenik-intro'><span class='mlx-icon'>💰</span> Podívat se na ceník</button>"
  ],

  "balíček služeb, různé balíčky": [
    "📦 Nabízím různé balíčky podle potřeb klienta – třeba firemní promo od 6000 Kč.<br><button class='mlx-ai-btn' data-dest='Ceník.html#cenik-intro' data-nav='nav a[href=\"Ceník.html\"]' data-target='#cenik-intro'><span class='mlx-icon'>💰</span> Ukázkový ceník</button> <button class='mlx-ai-btn' data-dest='Ceník.html#pro-calculator' data-nav='nav a[href=\"Ceník.html\"]' data-target='#pro-calculator'><span class='mlx-icon'>🧮</span> Vyzkoušet kalkulačku</button>"
  ],

  "konzultace, domluva, konzultace zdarma": [
    "📞 Krátká konzultace (email nebo telefon) je zdarma – pomůže nám upřesnit cenu.<br><button class='mlx-ai-btn' data-dest='#footer' data-target='#footer'><span class='mlx-icon'>📧</span> Kontaktujte mě</button>"
  ],

  "specifický projekt, jiný projekt, netypická služba": [
    "😊 Pokud váš projekt není v ceníku, nevadí – rád připravím speciální nabídku.<br><button class='mlx-ai-btn' data-dest='Portfolio.html' data-nav='nav a[href=\"Portfolio.html\"]' data-target='.portfolio-grid'><span class='mlx-icon'>🎥</span> Podívat se na portfolio</button>"
  ],

  "kombinace služeb, spojení služeb, mix služeb": [
    "📦 Můžeme spojit více služeb do jednoho balíčku – např. natáčení + střih vychází cenově výhodněji.<br><button class='mlx-ai-btn' data-dest='Ceník.html#pro-calculator' data-nav='nav a[href=\"Ceník.html\"]' data-target='#pro-calculator'><span class='mlx-icon'>🧮</span> Spočítat kombinaci v kalkulačce</button>"
  ],

  "velká zakázka, firemní zakázka, větší projekt": [
    "🏢 Pro velké zakázky nabízím individuální ceny – domlouváme osobně podle rozsahu.<br><button class='mlx-ai-btn' data-dest='Objednávka.html' data-nav='nav a[href=\"Objednávka.html\"]' data-target='.order-btn'><span class='mlx-icon'>📝</span> Domluvit spolupráci</button>"
  ],

  "malá zakázka, malý projekt, drobný projekt": [
    "🎥 Dělám i menší projekty – třeba krátká videa od 1500 Kč.<br><button class='mlx-ai-btn' data-dest='Portfolio.html' data-nav='nav a[href=\"Portfolio.html\"]' data-target='.portfolio-grid'><span class='mlx-icon'>🎥</span> Podívat se na ukázky</button>"
  ],

  "nejlevnější varianta, levně, levnější nabídka": [
    "📱 Nejlevnější varianta je střih z vašich záběrů od 1500 Kč nebo krátké vertikální video od 1800 Kč.<br><button class='mlx-ai-btn' data-dest='Ceník.html#cenik-intro' data-nav='nav a[href=\"Ceník.html\"]' data-target='#cenik-intro'><span class='mlx-icon'>💰</span> Podívat se na ceník</button> <button class='mlx-ai-btn' data-dest='Ceník.html#pro-calculator' data-nav='nav a[href=\"Ceník.html\"]' data-target='#pro-calculator'><span class='mlx-icon'>🧮</span> Vyzkoušet kalkulačku</button>"
  ],


  // ---- 6. DOSTUPNOST A TERMÍNY ----
  "volný termín, kdy máte volno, dostupnost, kdy můžete, kdy natáčíte, kdy máte čas, volno, volný čas, termíny, kalendář": [
    "📅 Termíny domlouvám vždy individuálně. Pro aktuální dostupnost se podívejte na kalendář.<br><button class='mlx-ai-btn' data-dest='Ceník.html#calendar' data-nav='nav a[href=\"Ceník.html\"]' data-target='#calendar'><span class='mlx-icon'>📅</span> Zobrazit kalendář</button>"
  ],

  "jak brzy, nejbližší termín, co nejdříve, kdy nejdřív, nejbližší volno, nejbližší datum, rychlý termín, volno brzy, asap, rychle": [
    "⏳ Obvykle mám volné termíny během několika dnů až týdnů.<br><small>Pro urgentní zakázky napište na email a podívejte se do <button class='mlx-ai-btn' data-dest='Ceník.html#calendar' data-nav='nav a[href=\"Ceník.html\"]' data-target='#calendar'><span class='mlx-icon'>⚡</span> Kalendáře dostupnosti</button>.</small>"
  ],

  "víkend, sobota, neděle, natáčení o víkendu, volno o víkendu, termín víkend, víkendové natáčení, pracujete víkend, víkendová práce, víkend dostupnost": [
    "🎥 Ano, natáčím i o víkendech – dostupnost je vidět v <button class='mlx-ai-btn' data-dest='Ceník.html#calendar' data-nav='nav a[href=\"Ceník.html\"]' data-target='#calendar'><span class='mlx-icon'>📅</span> Kalendáři dole v ceníku</button>."
  ],

  "večer, natáčení večer, večerní čas, večerní termín, po práci, večerní dostupnost, večerní natáčení, odpoledne, později, noční natáčení": [
    "🌙 Večerní natáčení je možné po domluvě.<br>Koukněte do <button class='mlx-ai-btn' data-dest='Ceník.html#calendar' data-nav='nav a[href=\"Ceník.html\"]' data-target='#calendar'><span class='mlx-icon'>🌙</span> Kalendáře dostupnosti</button> a napište mi email."
  ],

  "jak dlouho čekám, čekání, doba čekání, dlouho čekám, kdy odpovíte, čekám na reakci, dlouhá doba, proč čekám, čekám na odpověď, čekací lhůta": [
    "📧 Na email odpovídám většinou do 24 hodin.<br>Pokud čekáte déle, jsem pravděpodobně na natáčení – ozvu se hned, jak to půjde.<br><button class='mlx-ai-btn' data-dest='#footer' data-target='#footer'><span class='mlx-icon'>📧</span> Kontaktujte mě</button>"
  ],

  "rezervace termínu, rezervace data, rezervace, zarezervovat, rezervujte, rezervovat termín, zamluvit datum, zamluvit termín, rezervace volno, domluva termínu": [
    "✅ Rezervaci provedeme přes email nebo objednávkový formulář.<br><button class='mlx-ai-btn' data-dest='Objednávka.html' data-nav='nav a[href=\"Objednávka.html\"]' data-target='.order-btn'><span class='mlx-icon'>📝</span> Otevřít objednávku</button><br><small>A podívejte se také do <button class='mlx-ai-btn' data-dest='Ceník.html#calendar' data-nav='nav a[href=\"Ceník.html\"]' data-target='#calendar'><span class='mlx-icon'>📅</span> Kalendáře dostupnosti</button>.</small>"
  ],

  "kolik hodin, délka, doba, jak dlouho, trvání, kolik času, doba natáčení, jak dlouhé, čas natáčení, kolik hodin práce": [
    "⏱️ Standardně půldenní natáčení trvá do 4 hodin, celodenní okolo 8 hodin.<br>Přesně se domlouváme podle projektu.<br><button class='mlx-ai-btn' data-dest='Ceník.html#cenik-intro' data-nav='nav a[href=\"Ceník.html\"]' data-target='#cenik-intro'><span class='mlx-icon'>💰</span> Podívat se na ceník</button>"
  ],

  "rychlý termín, expres, expresní, co nejrychleji, urgentní, spěchám, rychle, expresní termín, spěšně, urgent": [
    "⚡ Pokud spěcháte, napište mi – expresní termíny se snažím řešit co nejrychleji.<br>Koukněte i na <button class='mlx-ai-btn' data-dest='Ceník.html#calendar' data-nav='nav a[href=\"Ceník.html\"]' data-target='#calendar'><span class='mlx-icon'>📅</span> Kalendář dostupnosti</button>."
  ],

  "dostupnost, kdy jste dostupný, kdy jste k dispozici, kdy můžete, časové možnosti, kdy se dá, kdy se dá natáčet, vaše dostupnost, kdy dostupný, kdy se dá domluvit": [
    "📅 Moje dostupnost se liší podle zakázek.<br>Nejjednodušší je podívat se do <button class='mlx-ai-btn' data-dest='Ceník.html#calendar' data-nav='nav a[href=\"Ceník.html\"]' data-target='#calendar'><span class='mlx-icon'>📅</span> Kalendáře dostupnosti</button> a pak mi napsat."
  ],

  "plánování, plán, jak naplánovat, plán projektu, plánování práce, plán termínu, plán natáčení, rozvrh, časový plán, plán služeb": [
    "📌 Plán projektu připravíme po objednávce.<br>Domluvíme harmonogram podle vašich potřeb.<br><button class='mlx-ai-btn' data-dest='Objednávka.html' data-nav='nav a[href=\"Objednávka.html\"]' data-target='.order-btn'><span class='mlx-icon'>📝</span> Otevřít objednávku</button>"
  ],


  // ---- 7. CO NABÍZÍTE / SLUŽBY ----
  "služby, co nabízíte, vaše služby, co děláte, jaké služby, nabídka služeb, služby prosím, co umíte, vaše nabídka, děláte": [
    "🎬 Nabízím natáčení, střih, zvuk i nasvícení scény.<br><button class='mlx-ai-btn' data-dest='Portfolio.html' data-nav='nav a[href=\"Portfolio.html\"]'><span class='mlx-icon'>🖼️</span> Ukázat portfolio</button> <button class='mlx-ai-btn' data-dest='Ceník.html' data-nav='nav a[href=\"Ceník.html\"]'><span class='mlx-icon'>💰</span> Zobrazit ceník</button>"
  ],
  "reklamní video, firemní video, promo video, reklama, firemní promo, firemní prezentace, firemní natáčení, reklama video, business video, podnik video": [
    "📢 Specializuji se na reklamní a firemní videa.<br><small>Ukázky najdete na <a href='https://youtube.com/'>YouTube</a>.</small>"
  ],
  "krátký film, krátký projekt, krátký snímek, mini film, krátké video, krátký klip, krátká tvorba, krátké natáčení, krátké filmy, film krátký": [
    "🎥 Točím i krátké filmy a studentské projekty.<br><button class='mlx-ai-btn' data-dest='Portfolio.html' data-nav='nav a[href=\"Portfolio.html\"]'><span class='mlx-icon'>🖼️</span> Ukázat portfolio</button>"
  ],
  "hudební video, klip, videoklip, hudební klip, hudební spot, klip hudba, hudební natáčení, videoklip hudba, klip pro kapelu, music video": [
    "🎶 Natáčím hudební klipy pro kapely a umělce.<br><small>Najdete je na <a href='https://www.youtube.com/@MLX-Media' target='_blank'>YouTube kanále</a>.</small>"
  ],
  "event, záznam akce, natáčení akce, firemní akce, akce video, natáčení eventu, koncert video, festival video, oslava video, konference video": [
    "🎤 Zajišťuji záznam akcí – koncerty, oslavy i konference.<br><button class='mlx-ai-btn' data-dest='Portfolio.html' data-nav='nav a[href=\"Portfolio.html\"]'><span class='mlx-icon'>🖼️</span> Ukázat portfolio</button>"
  ],
  "produktové video, reklama na produkt, produkt reklama, produkt spot, produkt promo, produktové spoty, produkt natáčení, produkt ukázka, produkt klip, produkt prezentace": [
    "📦 Tvořím produktová videa, která zaujmou zákazníky.<br><small>Kontakt: <a href='mailto:info@mlxmedia.cz'>info@mlxmedia.cz</a></small>"
  ],
  "sociální sítě, reels, tiktok, instagram, facebook video, krátká videa na sítě, sociální video, video na instagram, video na tiktok, video na sítě, video na reels": [
    "📱 Dělám vertikální videa pro TikTok, Instagram i Reels (od 1800 Kč).<br><small>Ukázky jsou na <a href='https://instagram.com/mlx_media_' target='_blank'>Instagramu</a>.</small>"
  ],
  "kompletní balíček, all inclusive, komplet služba, vše v jednom, balíček služeb, celý balíček, vše komplet, celý servis, all in, komplet nabídka": [
    "📦 Kompletní balíček = natáčení, střih a hudba. Firemní od 6000 Kč.<br><button class='mlx-ai-btn' data-dest='Ceník.html#cenik-intro' data-nav='nav a[href=\"Ceník.html\"]' data-target='#cenik-intro'><span class='mlx-icon'>💰</span> Zobrazit ceník</button>"
  ],
  "jen střih, střih videa, střih, editace, úprava videa, stříhání, edit videa, postprodukce, úpravy, střih záběrů": [
    "✂️ Střih videa z vašich záběrů od 1500 Kč.<br><small>Stříhám v DaVinci Resolve.</small>"
  ],
  "jen kamera, kameraman, natáčení, jen natáčet, kamerová práce, kamera služby, kamerování, kameraman služby, natočíte, natočit": [
    "📸 Nabízím čistě kameramanské služby (Blackmagic 6K).<br><small>Kontakt: <a href='tel:+420777413600'>+420 777 413 600</a></small>"
  ],

  // ---- 7b. SVATBY / WEDDING ----
  "svatba, svatební video, svatební film, svatba natáčení, svadba, svadobné video, wedding, wedding video, wedding film, natáčení svatby, video ze svatby, video ze svadby, svadobný kameraman, svatební kameraman, svatební střih, videograf na svatbu, videograf": [
    "💍 Natáčím svatební filmy s důrazem na emoce a příběh vašeho dne. Ceny jsou individuální – záleží na délce natáčení a rozsahu. Napište mi na email a domluvíme detaily!<br><button class='mlx-ai-btn' data-dest='Objednávka.html' data-nav='nav a[href=\"Objednávka.html\"]'><span class='mlx-icon'>📝</span> Objednat svatební video</button><br><button class='mlx-ai-btn' data-dest='mailto:info@mlxmedia.cz'><span class='mlx-icon'>✉️</span> Napsat o svatbě</button>",
    "🎊 Svatební videa jsou jednou z mých oblíbených zakázek – zachytím momenty, které chcete mít navždy. Kontaktujte mě co nejdřív kvůli dostupnosti termínu!<br><button class='mlx-ai-btn' data-dest='Ceník.html#calendar' data-nav='nav a[href=\"Ceník.html\"]' data-target='#calendar'><span class='mlx-icon'>📅</span> Zkontrolovat termín</button> <button class='mlx-ai-btn' data-dest='Portfolio.html' data-nav='nav a[href=\"Portfolio.html\"]'><span class='mlx-icon'>🖼️</span> Ukázat portfolio</button>"
  ],


  // ---- 8. TECHNIKA ----
  "technika, vybavení, gear, vaše vybavení, čím natáčíte, co používáte, vaše technika, technické vybavení, výbava, gear list": [
    "🎬 Používám profesionální filmovou techniku – kameru **Blackmagic Pocket Cinema Camera 6K**, kvalitní objektivy, zvuk, světla a další.<br><button class='mlx-ai-btn' data-dest='Aspekty.html' data-nav='nav a[href=\"Aspekty.html\"]'><span class='mlx-icon'>📷</span> Zobrazit techniku</button>"
  ],

  "kamera, kamery, vaše kamera, jakou kameru, čím točíte, jak točíte, kamera vybavení, kamera info, natáčíte na co, kamera technika": [
    "📸 Hlavní kamera je **Blackmagic 6K** – nabízí filmový obraz ve vysoké kvalitě.<br><small>Více v sekci <a href='Aspekty.html#kamera'>Kamera</a>.</small>"
  ],

  "objektivy, čočky, vaše objektivy, jaké objektivy, lens, čočka, optika, objektivy kamera, jaká skla, výbava objektivy": [
    "🔭 Používám více **objektivů s velkým rozsahem** – pro detailní portréty i širokoúhlé záběry.<br><small>Seznam objektivů je v <a href='Aspekty.html#kamera'>kameře</a>.</small>"
  ],

  "zvuk, mikrofon, nahrávání, audio, vaše mikrofony, jaký mikrofon, audio záznam, zvuková technika, nahrávací zařízení, čistý zvuk": [
    "🎤 Pro zvuk používám **Zoom F1**, směrové mikrofony (shotgun) a další audio vybavení.<br><small>Podrobnosti v sekci <a href='Aspekty.html#zvuk'>Zvuk</a>.</small>"
  ],

  "světla, osvětlení, nasvícení, vaše světla, čím svítíte, světelná technika, nasvícení scény, osvětlení technika, jak svítíte, světla info": [
    "💡 K dispozici mám **Neewer 80C s Bowens mountem, RGB tube light, panelová světla s nastavitelnou teplotou, 90 cm softbox, kužel na světla a stojany**.<br><small>Více najdete v sekci <a href='Aspekty.html#osvetleni'>Osvětlení</a>.</small>"
  ],

  "softbox, světelný box, rozptyl světla, měkké světlo, světlo na portrét, softbox info, světelný difuzor, světlo rozptýlené, box světlo, světelný doplněk": [
    "📦 Používám **90 cm softbox** pro měkké, přirozené světlo – ideální na portréty i produktové focení."
  ],

  "napájení, baterie, zdroj, energie, napájení kamery, napájení techniky, velké baterie, malé baterie, energie, napájecí systém": [
    "🔋 Mám **velkou powerbanku pro světla i techniku** a dostatek **NPF baterií** pro delší natáčení.<br><small>Více v sekci <a href='Aspekty.html#ostatni'>Ostatní</a>.</small>"
  ],

  "příslušenství, gear, doplňky, držáky, stabilizace, příslušenství kamera, gear navíc, filmové vybavení, ostatní technika, extra gear": [
    "🎒 Kromě hlavní techniky používám **rigy, stabilizátory, držáky, odrazky a kouřostroj**.<br><small>Seznam je v sekci <a href='Aspekty.html#ostatni'>Ostatní</a>.</small>"
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
    "🎬 Portfolio najdete na samostatné stránce. Mám tam krátké filmy i firemní videa.<br><button class='mlx-ai-btn' data-dest='Portfolio.html' data-nav='nav a[href=\"Portfolio.html\"]'><span class='mlx-icon'>🖼️</span> Otevřít portfolio</button>"
  ],
  "youtube, youtube kanál, vaše videa, youtube videa, video youtube, ukázky youtube, odkaz youtube, kanál youtube, filmy youtube, vaše ukázky youtube": [
    "▶️ Ukázky jsou i na mém <a href='https://www.youtube.com/@MLX-Media' target='_blank'>YouTube kanále</a>.<br><small>Obsahuje hotové projekty a krátké filmy.</small>"
  ],
  "krátké filmy, filmy, krátký film, vaše filmy, projekty film, ukázky film, filmové ukázky, krátký projekt, krátké snímky, studentský film": [
    "🎥 V portfoliu najdete i krátké filmy (např. *Dva z nás*)."
  ],
  "akční film, thriller, drama, ukázka akční, ukázka thriller, ukázka drama, vaše drama, akční ukázky, thriller projekt, žánr film": [
    "🔥 Točil jsem akční i dramatické projekty (např. *Rázná střela*).<br><button class='mlx-ai-btn' data-dest='Portfolio.html' data-nav='nav a[href=\"Portfolio.html\"]'><span class='mlx-icon'>🖼️</span> Ukázat portfolio</button>"
  ],
  "experimentální, art, umělecký film, experiment, experimentální ukázka, art projekt, art video, art ukázky, art film, alternativní film": [
    "🎨 Dělal jsem i experimentální projekt *Eiréné*.<br><button class='mlx-ai-btn' data-dest='Portfolio.html' data-nav='nav a[href=\"Portfolio.html\"]'><span class='mlx-icon'>🖼️</span> Ukázat portfolio</button>"
  ],
  "firemní videa, promo ukázky, ukázky firmy, firemní projekty, firemní promo ukázky, vaše firemní práce, firemní reference, firemní klient, firemní projekt, firemní spoty": [
    "🏢 V portfoliu jsou i firemní promo videa a reklamy."
  ],
  "hudební klipy, klip ukázka, vaše klipy, hudební videa, hudební ukázka, kapela video, klip projekty, klip ukázky, hudba ukázky, klip tvorba": [
    "🎶 Natáčel jsem i hudební klipy.<br><button class='mlx-ai-btn' data-dest='Portfolio.html' data-nav='nav a[href=\"Portfolio.html\"]'><span class='mlx-icon'>🖼️</span> Ukázat portfolio</button>"
  ],
  "pomocník, role, co jste dělal, vaše role, co jste měl na starosti, úkoly, jaká práce, práce ve filmu, pomoc práce, role projekt": [
    "👤 V projektech jsem dělal kameru, střih i herectví.<br><small>Moje role se liší podle projektu.</small>"
  ],
  "města, kde natáčíte, Brno, Praha, místa, lokace, kde jste točil, lokace film, lokace natáčení, kde jste točil, kde filmy, místa natáčení": [
    "📍 Primárně natáčím v Berouně a Praze – ideální lokace pro všechny typy projektů. Více o lokacích najdete v sekci Mapa na ceníku.<br><button class='mlx-ai-btn' data-dest='Ceník.html#mapa' data-nav='nav a[href=\"Ceník.html\"]'><span class='mlx-icon'>🗺️</span> Zobrazit Mapu</button>"
  ],
  "ukázky práce, showreel, video ukázky, shrnutí práce, krátké ukázky, nejlepší práce, výběr práce, sestřih práce, sestřih ukázky, showreel video": [
    "✨ Ukázkový sestřih (showreel) najdete v portfoliu.<br><button class='mlx-ai-btn' data-dest='Portfolio.html' data-nav='nav a[href=\"Portfolio.html\"]'><span class='mlx-icon'>🖼️</span> Otevřít portfolio</button>"
  ],


  // ---- 10. PROČ VYBRAT MLX MEDIA ----
  "proč vás, proč vybrat, proč s vámi, proč vy, proč bych vás, vaše výhody, důvod, proč zvolit, proč právě vy, proč spolupracovat": [
    "💡 Jsem mladý a nadšený, pracuji s profi technikou a do každého projektu dávám maximum.<br><small>👉 Napište mi na <a href='mailto:info@mlxmedia.cz'>info@mlxmedia.cz</a> a domluvíme detaily.</small>"
  ],
  "kvalita, profi, profesionální, kvalitní práce, profi práce, kvalita práce, kvalitní video, kvalitní služby, profesionální služby, profesionální video": [
    "🎥 Dbám na precizní obraz i zvuk – kvalita je moje priorita."
  ],
  "cena, férová cena, levněji, cenově dostupné, levnější, rozpočet, rozumná cena, cena kvalita, dostupné ceny, přijatelná cena": [
    "💰 Nabízím férové ceny přizpůsobené rozpočtu.<br><button class='mlx-ai-btn' data-dest='Ceník.html#cenik-intro' data-nav='nav a[href=\"Ceník.html\"]' data-target='#cenik-intro'><span class='mlx-icon'>💰</span> Podívat se na ceník</button> <button class='mlx-ai-btn' data-dest='Ceník.html#pro-calculator' data-nav='nav a[href=\"Ceník.html\"]' data-target='#pro-calculator'><span class='mlx-icon'>🧮</span> Vyzkoušet kalkulačku</button>"
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
    "⚡ Zakázky dodávám rychle – menší projekty obvykle do 4–10 dní od natáčení."
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
    "📵 Někdy jsem na natáčení a nemůžu hned zvednout.<br>👉 Zkuste mi napsat na <a href='mailto:info@mlxmedia.cz'>info@mlxmedia.cz</a>."
  ],
  "čekání, dlouho čekám, neozýváte se, čekám na vás, čekám dlouho, proč čekám, čekám odpověď, čekám reakci, dlouhé čekání, žádná reakce": [
    "⏳ Odpovídám obvykle do 24 hodin.<br><small>Pokud to trvá déle, jsem nejspíš na natáčení.</small>"
  ],
  "offline, nejste dostupný, nejste tu, proč offline, offline režim, nefungujete, nejede to, nejde to, nejste online, vypnuto": [
    "🌙 Když jsem offline, napište mi email.<br><small>Email vždy funguje i mimo systém.</small>"
  ],
  "problém, chyba, nefunguje, něco nefunguje, chyba systém, problém stránky, problém web, chyba chatbot, problém objednávka, problém kontakt": [
    "⚠️ Pokud něco nefunguje, dejte mi vědět na <a href='mailto:info@mlxmedia.cz'>info@mlxmedia.cz</a>."
  ],
  "nevíte, nerozumíte, nejste jistý, nechápete, nechápu, nevím, zmatený, nechápu otázku, nejistý, nerozumím": [
    "❓ Tomu nerozumím, zkuste to napsat jinak.<br>👉 Nebo mi napište přímo email na <a href='mailto:info@mlxmedia.cz'>info@mlxmedia.cz</a>."
  ],
  "nepřišel email, žádný email, chybí email, email nepřišel, potvrzení nepřišlo, nepřišlo nic, mail nepřišel, žádný mail, mail chybí, mail potvrzení": [
    "📩 Podívejte se i do složky Spam.<br><small>Pokud potvrzení nedorazí, napište mi rovnou email: <a href='mailto:info@mlxmedia.cz'>info@mlxmedia.cz</a>.</small>"
  ],
  "nefunguje formulář, chyba formulář, formulář nejde, formulář problém, formulář chybí, formulář nefunguje, formulář chyba, nejde vyplnit, formulář neodesílá, formulář neodešle": [
    "📝 Pokud formulář nefunguje, klidně napište rovnou na email.<br><small>Formulář je jen jedna z možností. Email: <a href='mailto:info@mlxmedia.cz'>info@mlxmedia.cz</a></small>"
  ],
  "proč tak dlouho, dlouhá doba, kdy to bude, kdy přijde, kdy hotovo, kdy dodáte, kdy dokončíte, kdy pošlete, jak dlouho to trvá, dlouho to trvá": [
    "📦 Menší videa (do 2 min) dodávám za <b>4–10 dní</b> po natáčení. Větší projekty mohou trvat 2–4 týdny – záleží na rozsahu a složitosti."
  ],
  "proč to nebere, proč to nefunguje, nejde to, proč to nejde, systém nejde, služba nejde, proč služba nejde, nebere to, server nejde, stránka nejde": [
    "🔧 Pokud něco nejde, napište mi prosím email.<br><small>Občas má systém výpadek.</small>"
  ],
  "pomalý, pomalu, proč pomalu, pomalu odpovídáte, pomalu reagujete, pomalu dodáváte, proč pomalé, pomalá reakce, pomalé dodání, pomalý systém": [
    "🐢 Odpovídám jak nejrychleji to jde.<br><small>Pomalost může být kvůli natáčení.</small>"
  ],


  // ---- 12. FALLBACK ----
  "nevím, nechápu, nerozumím, zmatený, nejasné, neznám, cože, jak, pomoc": [
    "🤔 Tomu nerozumím, zkuste to napsat jinak.<br>👉 Nebo napište na <a href='mailto:info@mlxmedia.cz'>info@mlxmedia.cz</a>."
  ],
  "otázka, dotaz, mám dotaz, potřebuji poradit, potřebuji info, otázka prosím, otázka k vám, potřebuji něco, chci vědět, dotaz info": [
    "❓ Dotaz můžete napsat sem nebo emailem.<br><small>Složitější věci řeším přes email: <a href='mailto:info@mlxmedia.cz'>info@mlxmedia.cz</a></small>"
  ],
  "hledám, nemůžu najít, kde to je, kde najdu, hledám info, kde je to, nevím kde, nemůžu najít info, hledám stránku, kde najít": [
    "🔎 Mrkněte do horního menu nebo mi napište – pomůžu vám najít co hledáte. 😊"
  ],
  "kontakt osobně, osobní setkání, setkat se, domluvit osobně, potkat, osobní schůzka, osobně, osobní domluva, schůzka, osobní kontakt": [
    "🤝 Osobní setkání lze domluvit po emailu.<br><small>Email: <a href='mailto:info@mlxmedia.cz'>info@mlxmedia.cz</a></small>"
  ],
  "nefunguje, chyba, něco se pokazilo, bug, problém, systém nejde, nefunguje služba, nejde stránka, nejde systém, problém služba": [
    "⚠️ Může to být technická chyba.<br>👉 Pokud něco nejde, napište email na <a href='mailto:info@mlxmedia.cz'>info@mlxmedia.cz</a>."
  ],
  "jak začít, kde začít, chci začít, potřebuji začít, první krok, začínám, jak začnu, od čeho začít, začít spolupráci, začít projekt": [
    "🚀 Začít můžete vyplněním objednávkového formuláře.<br><button class='mlx-ai-btn' data-dest='Objednávka.html' data-nav='nav a[href=\"Objednávka.html\"]'><span class='mlx-icon'>📝</span> Otevřít formulář</button>"
  ],
  "co nabízíte, co děláte, co umíte, vaše služby, služby info, služby vaše, jaké služby, nabídka služeb, vaše nabídka, nabídka info": [
    "🎬 Nabízím natáčení, střih a kompletní video produkci.<br><button class='mlx-ai-btn' data-dest='Ceník.html' data-nav='nav a[href=\"Ceník.html\"]'><span class='mlx-icon'>💰</span> Zobrazit ceník</button>"
  ],
  "co je mlx media, mlx media, kdo jste, co to je, mlx info, mlx media info, vaše značka, vaše studio, mlx co, mlx media kdo": [
    "🎥 MLX Media je značka kameramana a střihače Matouše Lexy.<br>Specializuji se na video produkci – svatby, firemní videa, krátké filmy i reklamy.<br><button class='mlx-ai-btn' data-dest='Portfolio.html' data-nav='nav a[href=\"Portfolio.html\"]'><span class='mlx-icon'>🖼️</span> Ukázat portfolio</button>"
  ],
  "pomoc, potřebuji pomoc, help, pomoc prosím, potřebuju pomoc, potřebuju radu, pomoc rada, help me, potřebuji radu, potřebuji podporu": [
    "🆘 Rád vám pomůžu – napište mi víc o problému.<br>👉 Email: <a href='mailto:info@mlxmedia.cz'>info@mlxmedia.cz</a>"
  ],
  "děkuji, díky, díky moc, děkuji vám, dík, děkujeme, děkuji mockrát, dík moc, moc díky, velké díky": [
    "🙏 Já děkuji, jsem rád, že jsem mohl pomoci! Rádo se stalo. 😊"
  ],


  // ---- 13. DODÁNÍ / FORMÁTY ----
  "dodání, jak dostanu video, formát videa, jak pošlete, posíláte video, video dodání, export, hotové video, v jaké kvalitě, v čem video": [
    "📦 Hotové video posílám přes online odkaz (Drive / YouTube neveřejně).",
    "🎬 Standardně dodávám ve FullHD nebo 4K.",
    "📂 Formáty MP4 (H.264) – další formáty na přání. Jsem v celku flexibilní ohledně formátů."
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
    "📦 Pokud jste při natáčení nebo spolupráci něco ztratili, dejte mi prosím vědět co nejdříve. Máme speciální formulář pro ztráty a nálezy!<br><button class='mlx-ai-btn' data-dest='Ztrata-Nalez.html'><span class='mlx-icon'>📦</span> Formulář Ztráta/Nález</button><br><button class='mlx-ai-btn' data-dest='mailto:info@mlxmedia.cz'><span class='mlx-icon'>✉️</span> Napsat email</button><br><button class='mlx-ai-btn' data-dest='tel:+420777413600'><span class='mlx-icon'>📞</span> Zavolat</button>",
    "🔑 Já osobně se snažím všechny ztracené věci uschovat. Nejrychlejší cesta je náš formulář pro ztráty a nálezy:<br><button class='mlx-ai-btn' data-dest='Ztrata-Nalez.html'><span class='mlx-icon'>📦</span> Otevřít Ztráta/Nález</button> nebo napište na <a href='mailto:info@mlxmedia.cz'>info@mlxmedia.cz</a>.",
    "📱 Věci se rychle najdou, když se ozvete hned po natáčení. Vyplňte prosím formulář Ztráta/Nález:<br><button class='mlx-ai-btn' data-dest='Ztrata-Nalez.html'><span class='mlx-icon'>📦</span> Formulář Ztráta/Nález</button>"
  ],

  "nález, našel jsem, nalezený předmět, našel jsem věc, mám vaši věc": [
    "🙏 Pokud jste našli něco, co by mohlo patřit mně (např. technika, baterie, kabely), budu moc vděčný! Vyplňte prosím formulář:<br><button class='mlx-ai-btn' data-dest='Ztrata-Nalez.html'><span class='mlx-icon'>📦</span> Formulář Ztráta/Nález</button><br>Nebo pište na <a href='mailto:info@mlxmedia.cz'>info@mlxmedia.cz</a> | <a href='tel:+420777413600'>+420 777 413 600</a>.",
    "✉️ Nejlépe vyplňte formulář Ztráta/Nález nebo napište na email – vše si domluvíme.<br><button class='mlx-ai-btn' data-dest='Ztrata-Nalez.html'><span class='mlx-icon'>📦</span> Otevřít formulář</button>",
    "Děkuji předem za poctivost a ochotu! Prosím dejte mi vědět přes formulář, telefon nebo email. 🙂<br><button class='mlx-ai-btn' data-dest='Ztrata-Nalez.html'><span class='mlx-icon'>📦</span> Formulář Ztráta/Nález</button>"
  ],

  "ztráty a nálezy, něco se ztratilo, hledám věci, hledám předmět, ztráta nález": [
    "📦 Pro hlášení ztracených nebo nalezených věcí máme speciální stránku:<br><button class='mlx-ai-btn' data-dest='Ztrata-Nalez.html'><span class='mlx-icon'>📦</span> Ztráta/Nález – formulář</button><br>Nebo pište rovnou na <a href='mailto:info@mlxmedia.cz'>info@mlxmedia.cz</a>.",
    "✉️ Děkuji moc za snahu vrácení! Nejlepší je vyplnit formulář nebo napsat email. Kontakt: <a href='mailto:info@mlxmedia.cz'>info@mlxmedia.cz</a> | <a href='tel:+420777413600'>+420 777 413 600</a>.<br><button class='mlx-ai-btn' data-dest='Ztrata-Nalez.html'><span class='mlx-icon'>📦</span> Otevřít formulář</button>"
  ],


  // ---- 17. LOKACE A CESTOVÁNÍ ----
  "lokace, místo natáčení, kde natáčíte, vaše lokace, kde působíte, kde jste dostupný, kde točíte, lokace natáčení, místo projektu, kde se dá natáčet, lokace info, kde vás najdu, vaše oblast, působnost, kde jste aktivní": [
    "📍 Hlavně působím v Berouně a Praze – tam je natáčení nejjednodušší a bez příplatku za cestu. Jinde v ČR je možné, ale s cestovným navíc. Pro vzdálené projekty (např. Brno) se domluvíme individuálně.<br><button class='mlx-ai-btn' data-dest='Objednávka.html' data-nav='nav a[href=\"Objednávka.html\"]'><span class='mlx-icon'>📍</span> Zobrazit kontakty</button>",
    "🌍 Pokud máte specifickou lokaci, napište mi na <a href='mailto:info@mlxmedia.cz'>info@mlxmedia.cz</a> a probereme možnosti. V Berouně a Praze mám lokace ozkoušené!"
  ],
  "beroun, beroun natáčení, v berouně, beroun oblast, beroun působnost, beroun projekty, natáčení beroun, video beroun, beroun cena, beroun lokace": [
    "🏞️ Beroun je moje domovská základna! Natáčení tady je rychlé, bez cestovného a s krásnými lokacemi (řeka, Karlštejn). Ceny standardní dle ceníku.<br><button class='mlx-ai-btn' data-dest='Ceník.html' data-nav='nav a[href=\"Ceník.html\"]'><span class='mlx-icon'>💰</span> Zobrazit ceník</button>",
    "📸 V Berouně točím filmy, promo i eventy. Napište na <a href='mailto:info@mlxmedia.cz'>info@mlxmedia.cz</a> pro rychlou domluvu."
  ],
  "praha, praha natáčení, v praze, praha oblast, praha působnost, praha projekty, natáčení praha, video praha, praha cena, praha lokace": [
    "🌆 Praha je ideální pro natáčení – mosty, uličky, moderní kanceláře. Žádné příplatky za dojezd, vše dle ceníku. Podívejte se na ukázky!<br><button class='mlx-ai-btn' data-dest='Portfolio.html' data-nav='nav a[href=\"Portfolio.html\"]'><span class='mlx-icon'>🖼️</span> Ukázat portfolio</button>",
    "🎥 V Praze točím často – od firemních videí po klipy. Kontaktujte mě na <a href='mailto:info@mlxmedia.cz'>info@mlxmedia.cz</a> pro plán."
  ],
  "cestovné, dojezd, cena dojezdu, kolik za cestu, cestovné poplatek, doprava, cesta cena, dojezd mimo, mimo oblast, cestovné mimo prahu, cestovné mimo beroun": [
    "🚗 V Berouně a Praze je cestovné zdarma. Jinde účtuji od 5 Kč/km (např. Brno cca 2000 Kč navíc). Přesnou cenu pošlu emailem po domluvě lokace.<br><small>Napište na <a href='mailto:info@mlxmedia.cz'>info@mlxmedia.cz</a>.</small>",
    "🛣️ Pro vzdálené lokace (např. Ostrava) může být cena vyšší a někdy nemusí být možné kvůli času. Domluvíme se individuálně."
  ],
  "mimo čr, mimo česko, zahraničí, natáčení zahraničí, evropa natáčení, mimo hranice, internacional, zahraniční projekty, natáčení v zahraničí, mimo českou republiku": [
    "🌍 Projekty mimo ČR jsou možné, ale dražší kvůli dopravě a logistice (např. +5000 Kč). Záleží na projektu – napište na <a href='mailto:info@mlxmedia.cz'>info@mlxmedia.cz</a> pro nabídku.",
    "✈️ Zahraniční natáčení řeším jen u velkých projektů. Kontaktujte mě pro detaily."
  ],
  "lokace venku, venkovní natáčení, outdoor, outdoor lokace, natáčení venku, venkovní projekty, příroda natáčení, venkovní video, outdoor cena, venkovní lokace": [
    "🌳 Venkovní natáčení v Berouně (např. řeka Berounka) nebo Praze (parky, náměstí) je skvělé! Cena stejná jako indoor, jen zohledním počasí.<br><button class='mlx-ai-btn' data-dest='Portfolio.html' data-nav='nav a[href=\"Portfolio.html\"]'><span class='mlx-icon'>🖼️</span> Ukázat venkovní ukázky</button>",
    "🏕️ Plánuji flexibilně kvůli světlu a počasí. Napište na <a href='mailto:info@mlxmedia.cz'>info@mlxmedia.cz</a> pro tipy na lokace."
  ],
  "lokace uvnitř, indoor natáčení, studio natáčení, indoor lokace, natáčení uvnitř, interiér, interiérové natáčení, studio cena, indoor projekty, uvnitř video": [
    "🏠 Indoor natáčení (kanceláře, studia) v Praze/Berouně je jednoduché. Pokud nemáte prostor, najdu studio za příplatek.<br><button class='mlx-ai-btn' data-dest='Ceník.html' data-nav='nav a[href=\"Ceník.html\"]'><span class='mlx-icon'>💰</span> Zobrazit ceník</button>",
    "💡 Mám světla a techniku pro perfektní indoor záběry. Domluvíme se na <a href='mailto:info@mlxmedia.cz'>info@mlxmedia.cz</a>."
  ],
  "daleké projekty, daleko, daleká lokace, mimo prahu beroun, daleko natáčení, daleká cesta, daleko cena, dojezd, daleké natáčení, mimo oblast cena": [
    "🛣️ Pro lokace mimo Prahu/Beroun (např. Brno, Olomouc) přidávám cestovné od 2000 Kč. Moc daleko (např. Slovensko) nemusí být možné kvůli času.<br><small>Napište na <a href='mailto:info@mlxmedia.cz'>info@mlxmedia.cz</a>.</small>",
    "📍 Daleké projekty řeším individuálně – cena závisí na vzdálenosti a rozsahu."
  ],
  "lokace navrhnout, navrhněte lokaci, nápady lokace, kde natáčet, lokace tipy, tipy na lokace, kde točit, lokace pro video, lokace nápady, navrhnout místo": [
    "💡 Rád navrhnu lokace: v Berouně třeba hrad Karlštejn, v Praze Karlův most nebo moderní kanceláře. Napište typ videa na <a href='mailto:info@mlxmedia.cz'>info@mlxmedia.cz</a>.",
    "🗺️ Lokace vybírám podle projektu – napište mi váš nápad a pošlu tipy!"
  ],
  "lokace povolení, povolení natáčení, licence lokace, povolení místo, natáčení povolení, lokace schválení, povolení venku, povolení indoor, lokace pravidla, povolení info": [
    "📜 Pro veřejné lokace (např. Praha centrum) zařídím povolení zdarma, pokud není složité. Soukromé prostory řeší klient.<br><small>Kontakt: <a href='mailto:info@mlxmedia.cz'>info@mlxmedia.cz</a>.</small>",
    "🔒 Povolení zajišťuji v Berouně/Praze hladce. Napište mi detaily projektu."
  ],


  // ---- 18. SPECIÁLNÍ NABÍDKY A ZÁBAVA ----
  "speciální nabídka, akce, speciální akce, slevy speciální, nabídka speciální, speciální balíček, akční nabídka, speciální ceny, nabídka na míru, speciální projekty": [
    "💼 Speciální akce nemám, ale pro větší projekty v Praze/Berouně můžu nabídnout lepší cenu – domluvíme individuálně na <a href='mailto:info@mlxmedia.cz'>info@mlxmedia.cz</a>.",
    "📽️ Pro nové klienty můžu mírně upravit cenu na první projekt – napište mi detaily a probereme možnosti."
  ],
  "hra, secret hra, hra přes ai, skrytá hra, hra mlx, hra video, zábava, hra na webu, secret game, hra html": [
    "🕹️ Objev exkluzivní skrytou hru o video produkci – dostupnou jen přes mě! Zábava pro fanoušky filmu i klienty.<br><button class='mlx-ai-btn' data-dest='hra.html' data-nav='nav a[href=\"hra.html\"]'><span class='mlx-icon'>🎮</span> Spustit skrytou hru</button>",
    "🎬 Hra je speciální bonus – odemkneš ji tady nebo po objednávce! <br><button class='mlx-ai-btn' data-dest='hra.html' data-nav='nav a[href=\"hra.html\"]'><span class='mlx-icon'>🎮</span> Hrát teď</button>",
    "🎲 Zkuste naši skrytou hru, která vás provede světem videa! Exkluzivní přístup jen přes AI.<br><button class='mlx-ai-btn' data-dest='hra.html' data-nav='nav a[href=\"hra.html\"]'><span class='mlx-icon'>🎮</span> Vyzkoušet hru</button>"
  ],
  "zábava, bonus, speciální zábava, hry a videa, zábavné projekty, bonus nabídka, zábavný balíček, speciální zábava, hry mlx, zábava pro klienty": [
    "😄 Jako bonus mám skrytou hru o video produkci – perfektní zábava pro klienty! Zkuste ji hned.<br><button class='mlx-ai-btn' data-dest='hra.html' data-nav='nav a[href=\"hra.html\"]'><span class='mlx-icon'>🎮</span> Spustit hru</button>",
    "🎥 Pro klienty přidávám zábavné detaily, např. krátké behind-the-scenes video k projektu zdarma na vyžádání."
  ],
  "větší projekty, velké projekty, větší zakázka, velká zakázka, hromadné projekty, velký projekt cena, větší projekt sleva, velké natáčení, větší video, velký projekt": [
    "📽️ Pro větší projekty (např. série videí) můžu nabídnout výhodnější cenu – ideální pro firmy v Praze/Berouně. Napište na <a href='mailto:info@mlxmedia.cz'>info@mlxmedia.cz</a>.",
    "💼 Velké zakázky řeším individuálně – pošlete mi rozsah a domluvíme lepší cenu."
  ],
  "noví klienti, nový klient, nový zákazník, první projekt, nový klient cena, první zakázka, nový klient sleva, první video, nový klient nabídka, první spolupráce": [
    "👋 Novým klientům v Praze/Berouně můžu dát mírně nižší cenu na první projekt. Kontaktujte mě na <a href='mailto:info@mlxmedia.cz'>info@mlxmedia.cz</a> pro detaily.",
    "📸 První spolupráce může být levnější – napište mi o svém projektu a domluvíme se."
  ],
  "firemní projekty, firmy projekty, firemní video, business video, firemní natáčení, firmy cena, firemní balíček, firmy nabídka, business projekty, firemní zakázka": [
    "🏢 Firmám v Praze/Berouně nabízím přizpůsobené ceny pro větší projekty – např. promo videa. Napište na <a href='mailto:info@mlxmedia.cz'>info@mlxmedia.cz</a>.<br><button class='mlx-ai-btn' data-dest='Portfolio.html' data-nav='nav a[href=\"Portfolio.html\"]'><span class='mlx-icon'>🖼️</span> Ukázat firemní ukázky</button>",
    "📈 Firemní videa dělám s důrazem na kvalitu – kontaktujte mě pro nabídku."
  ],
  "eventy, natáčení eventů, svatby natáčení, oslavy video, event video, eventy cena, svatba video, oslavy natáčení, eventy projekty, event nabídka": [
    "🎉 Natáčení eventů (svatby, oslavy) v Praze/Berouně – ceny dle rozsahu. Možná výhodnější cena pro větší zakázku.<br><button class='mlx-ai-btn' data-dest='Portfolio.html' data-nav='nav a[href=\"Portfolio.html\"]'><span class='mlx-icon'>🖼️</span> Ukázat event ukázky</button>",
    "🎊 Eventy točím s důrazem na emoce – napište na <a href='mailto:info@mlxmedia.cz'>info@mlxmedia.cz</a> pro podrobnosti."
  ],
  "spolupráce, partnerství, agentura spolupráce, spolupráce projekty, partner nabídka, spolupráce cena, partner video, spolupráce nabídka, agentura projekty, partner info": [
    "🤝 Pro agentury nebo partnery v Praze/Berouně můžu nabídnout lepší cenu u větších projektů. Napište na <a href='mailto:info@mlxmedia.cz'>info@mlxmedia.cz</a>.",
    "🌟 Spolupráce na větších zakázkách – domluvíme individuální podmínky."
  ],
  "behind the scenes, zákulisí, zákulisní video, behind the scenes video, zákulisí natáčení, bts, bts video, zákulisí zdarma, behind the scenes nabídka, zákulisí info": [
    "🎥 Jako bonus můžu dodat krátké zákulisní video z natáčení zdarma – stačí říct předem! Kontakt: <a href='mailto:info@mlxmedia.cz'>info@mlxmedia.cz</a>.",
    "📽️ Zákulisí je skvělý doplněk k projektu – ideální pro sociální sítě."
  ],
  "hra bonus, hra jako bonus, zábava bonus, hra pro klienty, bonus hra, hra nabídka, zábava hra, hra přístup, bonus video hra, hra info": [
    "🎲 Skrytá hra je zábavný bonus pro klienty – o video produkci, exkluzivně přes AI! Zkuste ji hned.<br><button class='mlx-ai-btn' data-dest='hra.html' data-nav='nav a[href=\"hra.html\"]'><span class='mlx-icon'>🎮</span> Spustit hru</button>",
    "🕹️ Po objednávce dostanete přístup k naší skryté hře – zábava navíc k vašemu videu!"
  ],


  // ---- 19. DOBA DODÁNÍ / TURNAROUND ----
  "jak dlouho trvá střih, jak dlouho střih, jak dlouho zpracování, kdy hotové video, kdy dodáte, kdy video bude, délka střihu, jak rychle hotové, jak rychle střih, turnaround": [
    "⏱️ Orientačně: menší videa (do 2 min) dodávám za <b>4–10 dní</b> po natáčení. Větší projekty mohou trvat <b>2–4 týdny</b>. Záleží na délce a složitosti projektu – přesný odhad pošlu po briefu.<br><button class='mlx-ai-btn' data-dest='mailto:info@mlxmedia.cz'><span class='mlx-icon'>✉️</span> Napsat pro přesný odhad</button>"
  ],
  "expresní střih, rychlý střih, rychle zpracovat, rush zakázka, urgentní střih, asap střih, spěchám se střihem, rychle potřebuji video, video rychle, dodání expres": [
    "⚡ Expresní zpracování je možné po domluvě – napište mi co nejdřív a zkusíme to vyřešit.<br><small>Expresní zakázky mohou mít příplatek podle náročnosti.</small><br><button class='mlx-ai-btn' data-dest='mailto:info@mlxmedia.cz'><span class='mlx-icon'>✉️</span> Napsat o expresní zakázce</button>"
  ],


  // ---- 20. HUDBA A ZVUK ----
  "hudba ve videu, soundtrack, jakou hudbu, hudba projekt, hudba k videu, podkresová hudba, bg hudba, background music, royalty free, hudební podkres": [
    "🎵 Hudbu vybírám z <b>royalty-free knihovny</b> – je součástí ceny, bez příplatku.<br><small>Žádné problémy s autorskými právy na YouTube ani jiných sítích.</small>"
  ],
  "vlastní hudba, moje hudba, přinesu si hudbu, mám svoji hudbu, chci konkrétní skladbu, konkrétní song, vlastní song, hudba od klienta, nahrát vlastní hudbu, použít svoji hudbu": [
    "🎶 Pokud máte vlastní hudbu nebo konkrétní přání, klidně ji přinesete – použijeme ji. Jen si pohlídejte licenci (autorská práva), aby video mohlo jít na sítě. 😊"
  ],
  "autorská práva, copyright hudba, licencovaná hudba, licencovat hudbu, copyright video, copyright, ip hudba, práva k hudbě, smí se použít hudba, youtube copyright": [
    "⚠️ <b>Pozor na autorská práva!</b> Proto standardně používám royalty-free hudbu – video pak může bez problémů na YouTube, Instagram i jinde.<br><small>Pokud chcete konkrétní komerční skladbu, domluvíme to předem.</small>"
  ],


  // ---- 21. ŠPATNÉ POČASÍ ----
  "špatné počasí, déšť, dešťový den, co se stane při dešti, prší, špatné podmínky, nepřízeň počasí, sníh, bouřka, mlha, nenatáčíte v dešti, déšť natáčení, počasí problém": [
    "🌧️ Při špatném počasí termín přesuneme – <b>ve většině případů bez příplatku</b>. Domluvíme nový datum tak, aby nám oba vyhovovalo.<br><small>Napište hned jak zjistíte předpověď, ať to naplánujeme včas.</small>"
  ],
  "počasí záloha, přesun termínu, zrušení kvůli počasí, odložit natáčení, přeplánovat natáčení, posunout termín, termín přesun, přesun datum, datum přeložit, přeložit natáčení": [
    "📅 Pokud je potřeba přeložit termín (třeba kvůli počasí nebo neočekávané situaci), ozve se co nejdřív a najdeme náhradní datum. <b>Žádné zbytečné storno poplatky</b> – vždy to řeším férovně. 🙂"
  ],


  // ---- 22. STUDENTSKÁ SLEVA / ŠKOLY / NEZISKOVKY ----
  "studentská sleva, sleva pro studenty, student sleva, jsem student, školní projekt, škola projekt, studentský projekt, nezisková organizace, neziskovka, charita sleva": [
    "🎓 Slevy pro studenty nebo neziskovky řeším <b>individuálně po domluvě</b> – záleží na projektu a rozsahu.<br>Napište mi email s popisem projektu a podíváme se na to.<br><button class='mlx-ai-btn' data-dest='mailto:info@mlxmedia.cz'><span class='mlx-icon'>✉️</span> Napsat o slevě</button>"
  ],


  // ---- 23. SCÉNÁŘ, PŘÍPRAVA, KONCEPT ----
  "scénář, pomoc se scénářem, napsat scénář, mám napsat scénář, script, nápad na video, nemám nápad, nevím co chci, co natáčet, co točit": [
    "🎬 Pokud přijdete <b>s vlastním konceptem</b>, výborně – práce bude rychlejší a levnější.<br>Pokud si nejste jistí, pomůžu s nápadem – ale záleží na míře zapojení. Větší kreativní příprava může být za příplatek, domluvíme se.<br><button class='mlx-ai-btn' data-dest='mailto:info@mlxmedia.cz'><span class='mlx-icon'>✉️</span> Prodiskutovat projekt emailem</button>"
  ],
  "příprava natáčení, briefing, co si připravit, příprava, co mít hotové, co dodat, jak se připravit, příprava projektu, předprodukce, co dát k dispozici": [
    "📋 Před natáčením si domluvíme <b>brief</b> – co chcete natočit, kde, kdy a proč. Čím víc víte předem, tím lépe pro výsledek.<br><small>Nemusíte mít hotový scénář – stačí základní představa a rozvineme to spolu.</small>"
  ],
  "mám vlastní nápad, mám scénář, přinesu scénář, mám napsaný scénář, připravil jsem scénář, já vymyslel, přijdu s konceptem, mám příběh, mám nápad, přijdu s nápadem": [
    "🤩 Skvělé! S vaším vlastním scénářem nebo konceptem je práce snazší a výsledek přesnější. Pošlete mi detaily a probereme postup.<br><button class='mlx-ai-btn' data-dest='mailto:info@mlxmedia.cz'><span class='mlx-icon'>✉️</span> Poslat nápad emailem</button>"
  ],


  // ---- 24. FOTOGRAFIE ----
  "fotografie, fotky, focení, fotonabídka, foto služba, foto projekt, foto cena, fotografujete, děláte fotky, foto na web": [
    "📷 Fotografie není moje hlavní zaměření – specializuji se primárně na video produkci. Pokud je to součást většího projektu, domluvíme se individuálně.<br><button class='mlx-ai-btn' data-dest='mailto:info@mlxmedia.cz'><span class='mlx-icon'>✉️</span> Napsat o focení</button>"
  ],


  // ---- 25. CASUAL / OFF-TOPIC BRIDGING ----
  "jak se máš, jak to jde, jak se daří, jak to funguje, jak jsi, all good, co je nového, co děláš, jak probíhá": [
    "Díky za dotaz! 😄 Jsem MLX AI, takže nemám nálady ani dny – ale vždy jsem připravený pomoct. Co pro vás mohu udělat?",
    "Vše běží perfektně! 🤖 Jsem tady, když potřebujete poradit s videoprodukcí, cenami nebo objednávkou – směle se ptejte."
  ],

  "co je filmování, co je video produkce, jak funguje natáčení, co obnáší natáčení videa, jak se točí film, jak vzniká video": [
    "🎬 Video produkce má tři fáze: <b>předprodukce</b> (plánování, scénář), <b>produkce</b> (samotné natáčení) a <b>postprodukce</b> (střih, zvuk, barvy). MLX Media vám pomůže s každou z nich!<br><button class='mlx-ai-btn' data-dest='Aspekty.html' data-nav='nav a[href=\"Aspekty.html\"]'><span class='mlx-icon'>🎥</span> Více o technice a procesu</button>"
  ],

  "proč video, proč si pořídit video, k čemu je video, je video důležité, proč mít video, co mi video přinese": [
    "📈 Video je dnes nejsilnější forma obsahu – lidé si zapamatují video 4× lépe než text. Pro firmy je promo video skvělý nástroj pro marketing, pro lidi je záznam svatby nebo akce vzpomínka na celý život. 🎬"
  ],

  "máte recenze, máte hodnocení, co říkají klienti, jsou recenze, vaše recenze, hodnocení mlx": [
    "⭐ Spokojenost klientů je moje priorita – mám pozitivní reference od firemních i soukromých zákazníků. Napište mi na <a href='mailto:info@mlxmedia.cz'>info@mlxmedia.cz</a> a rád vám pošlu více informací."
  ],

  "kolik let, jak dlouho podnikáte, jak dlouho se věnujete, vaše zkušenosti, kdy jste začali, od kdy natáčíte": [
    "📅 MLX Media se věnuje videoprodukcí aktivně od roku 2022 – každý rok přibývají projekty a zkušenosti. Mladí a hladoví! ⚡"
  ],

  "baví vás to, máte rádi natáčení, co vás baví, proč natáčíte, vaše vášeň": [
    "🎬 Filmování je moje vášeň! Nejraději mám moment, kdy klient poprvé vidí hotové video a kouká s úsměvem. To je důvod, proč to dělám. 😊"
  ],

  "ahoj matouši, čau matouši, dobrý den matouši, ahoj lexa, čau lexa": [
    "Ahoj! Tady mluvíte s MLX AI, ale Matouše zastihnete na <a href='mailto:info@mlxmedia.cz'>info@mlxmedia.cz</a> nebo na <a href='tel:+420777413600'>+420 777 413 600</a>. 😊 Mohu vám nějak pomoct?",
    "Hej! Jsem MLX AI – Matouš je pravděpodobně na natáčení 📽️. Napište mu rovnou na email: <a href='mailto:info@mlxmedia.cz'>info@mlxmedia.cz</a>."
  ],

};

// --- Synonym map ---
const synonymMap = {
  pozdrav: [
    "ahoj","cau","čau","nazdar","zdar","dobrý den","dobry den","zdravim","hezký den",
    "čauko","cus","čus","čauky","čest","hello","hi","hey","servus","zdarec","dobré ráno",
    "dobrý večer","good morning","salut","čaues","hoj"
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
    "nejasné","dotaz","mám otázku","otázka"
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
    "ztratil jsem","ztraceno","ztráta","ztracené","ztracený předmět",
    "ztracená věc","zapomněl jsem","zapomněl věc","nechal jsem tam",
    "ztratil věc","něco jsem ztratil","zapomenutá věc","ztratil batoh",
    "ztratil telefon","ztratil klíče","ztratil peněženku",
    "našel jsem","našel jsem věc","nalezené","nalezený předmět",
    "mám vaši věc","nalezeno","našel jsem něco","našel předmět",
    "našel batoh","našel klíče","našel telefon","našel peněženku",
    "ztráty a nálezy","ztracené věci","nalezené věci",
    "ztratil předmět","našel předmět","něco se ztratilo","něco jsem našel",
    "ztrata nalez","ztráta nález","formulář ztráta"
  ],

  lokace: [
    "lokace","místo","kde natáčíte","oblast","působnost","beroun","praha","cestovné",
    "dojezd","mimo čr","venku","uvnitř","daleko","navrhnout lokaci","povolení natáčení"
  ],

  specialni: [
    "speciální nabídka","akce","sleva","hra","skrytá hra","zábava","větší projekty",
    "noví klienti","firemní projekty","eventy","spolupráce","behind the scenes","hra bonus"
  ],

  cenik: [
    "cenik","ceny","kolik to stoji","kolik zaplatim","kolik stojí",
    "kolik účtujete","jaká je cena","cena služeb","ceník služeb",
    "orientační cena","orientační ceny","pricelist","pricing"
  ],

  kalkulace: [
    "kalkulace","spočítej cenu","chci kalkulaci","potřebuji kalkulaci",
    "spočítejte mi cenu","udělej kalkulaci","kalkulačka","kolik by stálo",
    "kolik by to stálo","orientační kalkulace","spocitat cenu","výpočet ceny"
  ],

  balicky: [
    "balíčky","balíček","firemní balíček","balíčky služeb","služby balíčky",
    "firemní služby","balíčky cen","balíček služeb","nabídka balíčků",
    "speciální balíček","promo balíček"
  ],

  dostupnost: [
    "dostupnost","volné termíny","obsazenost","volno","kalendář","termíny",
    "kdy máš čas","jak jsi volný","máš volno","rezervace termínu","rezervovat čas",
    "kdy to půjde","volný termín","free termín","kdy natáčíš"
  ],

  hudba: [
    "hudba","soundtrack","royalty free","royalty-free","hudební podkres","bg music",
    "background music","podkresová hudba","jakou hudbu","hudba k videu",
    "vlastní hudba","moje hudba","konkrétní skladba","píseň do videa",
    "copyright hudba","autorská práva hudba"
  ],

  pocasi: [
    "počasí","déšť","prší","bouřka","sníh","špatné podmínky","špatné počasí",
    "prší zítra","nepřízeň","vítr","špatná předpověď","přesun termínu",
    "zrušit kvůli počasí","odložit kvůli dešti","nepřízeň počasí"
  ],

  dodani_cas: [
    "jak dlouho","kdy hotové","kdy dodáte","turnaround","jak rychle",
    "délka zpracování","kdy video bude hotové","jak dlouho střih",
    "jak dlouho trvá střih","kdy pošlete hotové","průběh zpracování"
  ],

  sleva_student: [
    "student sleva","jsem student","studentský projekt","školní video",
    "škola projekt","gymnázium","střední škola","neziskovka","charita",
    "levněji student","sleva škola","studentský discount"
  ],

  scenar: [
    "scénář","script","nemám nápad","nevím co chci","pomozte s nápadem",
    "vymyslet video","co točit","o čem video","nápad na video",
    "příprava projektu","brief","předprodukce","co si připravit"
  ],

  foto: [
    "fotky","focení","fotografie","fotografujete","děláte foto","foto cena",
    "chci fotky","potřebuji fotos","produktové foto","foto na web","foto projekt"
  ],

  identita: [
    "matouš","matous","lexa","matouš lexa","mlxmedia","mlx_media","kdo jsi",
    "kdo jste","kdo je matouš","kdo je za mlx","majitel","kdo natáčí","kdo stojí za mlx"
  ],

  svatba: [
    "svatba","svadobné","svadba","wedding","video ze svatby","svadobný kameraman",
    "videograf","video ze svadby","wedding film","wedding video","svatební film"
  ],

  casual: [
    "jak se máš","jak to jde","jak se daří","co je nového","co děláš","all good",
    "jak probíhá","ahoj matouši","čau matouši","ahoj lexa","čau lexa"
  ]
};
