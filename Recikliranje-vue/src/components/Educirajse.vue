<script setup>
import { onMounted } from "vue";
import { useKontejneriStore } from "../stores/kontejneriStore";

const kontejneriStore = useKontejneriStore();

onMounted(() => {
  kontejneriStore.dohvatiKontejnere();
});
</script>

<template>
  <div class="app-background">
    <header class="global-logo">
      <RouterLink style="text-decoration: none" to="/kontejneri_loggedin">
        <h1>ReciklirajMe</h1>
      </RouterLink>

      <div class="logo-underline"></div>
    </header>

    <main class="education-container">
      <section class="dashboard-section education-intro">
        <h2>Educiraj se</h2>

        <p>
          Svakodnevno proizvodimo veliku količinu otpada, no velik dio tog
          otpada može se ponovno iskoristiti. Pravilnim odvajanjem otpada
          omogućujemo njegovo recikliranje i ponovnu upotrebu.
        </p>

        <p>
          Odvajanjem otpada čuvamo prirodne resurse, smanjujemo onečišćenje
          okoliša i štedimo prostor na odlagalištima.
        </p>

        <div class="education-tip">
          <strong>Zapamti!</strong>

          <span>
            Otpad nije samo ono čega se želimo riješiti, velik dio otpada može
            postati vrijedna sirovina za nove proizvode.
          </span>
        </div>
      </section>

      <section class="dashboard-section">
        <h2>Zašto odvajati otpad?</h2>

        <div class="benefits-grid">
          <div class="benefit-card">
            <span class="benefit-icon">🌳</span>

            <h3>Čuvamo prirodne resurse</h3>

            <p>
              Recikliranjem smanjujemo potrebu za korištenjem novih sirovina iz
              prirode.
            </p>
          </div>

          <div class="benefit-card">
            <span class="benefit-icon">⚡</span>

            <h3>Štedimo energiju</h3>

            <p>
              Ponovna prerada materijala često zahtijeva manje energije nego
              proizvodnja novih materijala.
            </p>
          </div>

          <div class="benefit-card">
            <span class="benefit-icon">🌍</span>

            <h3>Čuvamo okoliš</h3>

            <p>
              Pravilnim odvajanjem smanjujemo onečišćenje vode, zraka i tla.
            </p>
          </div>

          <div class="benefit-card">
            <span class="benefit-icon">♻️</span>

            <h3>Omogućujemo recikliranje</h3>

            <p>
              Odvojeno prikupljeni materijali mogu se preraditi i ponovno
              koristiti.
            </p>
          </div>
        </div>
      </section>

      <section class="dashboard-section waste-section">
        <div class="waste-title blue">
          <h2>🔵 PLAVI Otpadnik</h2>

          <span>Papir</span>
        </div>

        <div class="waste-content">
          <div class="waste-image">
            <img
              :src="kontejneriStore.slikeKontejnera.plavi"
              alt="Plavi spremnik za papir"
            />
          </div>

          <div class="waste-info">
            <div class="waste-column">
              <h3>✅ DA</h3>

              <ul>
                <li>Novine i časopisi</li>
                <li>Prospekti i katalozi</li>
                <li>Bilježnice i knjige</li>
                <li>Pisaći i uredski papir</li>
                <li>Papirnate vrećice</li>
                <li>Kartonske kutije</li>
                <li>Fascikle i karton</li>
              </ul>
            </div>

            <div class="waste-column">
              <h3>❌ NE</h3>

              <ul>
                <li>Fotografije i foto papir</li>
                <li>Zauljeni i prljavi papir</li>
                <li>Pelene</li>
                <li>Plastificirani papir</li>
                <li>Metalizirani papir</li>
                <li>Papirnate maramice</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="preparation">
          <h3>📌 Prije odlaganja</h3>

          <ul>
            <li>
              Preklopite kartonske kutije kako bi zauzimale manje prostora.
            </li>

            <li>Uklonite ljepljive trake, plastiku i stiropor.</li>

            <li>Papir i karton ne smiju biti zauljeni ili onečišćeni.</li>
          </ul>
        </div>

        <div class="waste-fact">
          <strong>♻️ Zanimljivost:</strong>

          Recikliranjem papira čuvamo šume, štedimo energiju i vodu te
          smanjujemo količinu otpada na odlagalištima.
        </div>
      </section>

      <section class="dashboard-section waste-section">
        <div class="waste-title orange">
          <h2>🟠 NARANČASTI Otpadnik</h2>

          <span>Staklo</span>
        </div>

        <div class="waste-content">
          <div class="waste-image">
            <img
              :src="kontejneriStore.slikeKontejnera.crveni"
              alt="Spremnik za staklo"
            />
          </div>

          <div class="waste-info">
            <div class="waste-column">
              <h3>✅ DA</h3>

              <ul>
                <li>Staklene boce</li>
                <li>Staklenke</li>
                <li>Staklena ambalaža svih boja</li>
              </ul>
            </div>

            <div class="waste-column">
              <h3>❌ NE</h3>

              <ul>
                <li>Prozorsko staklo</li>
                <li>Automobilsko staklo</li>
                <li>Kristalno i optičko staklo</li>
                <li>Žarulje i fluorescentne svjetiljke</li>
                <li>Porculan i keramika</li>
                <li>Staklena vuna</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="preparation">
          <h3>📌 Prije odlaganja</h3>

          <ul>
            <li>Ispraznite staklenu ambalažu.</li>
            <li>Po mogućnosti je isperite.</li>
            <li>Uklonite čepove i ostale nepoželjne materijale.</li>
          </ul>
        </div>

        <div class="waste-fact">
          <strong>♻️ Zanimljivost:</strong>

          Staklo se može reciklirati bezbroj puta bez gubitka kvalitete.
        </div>
      </section>

      <section class="dashboard-section waste-section">
        <div class="waste-title yellow">
          <h2>🟡 ŽUTI Otpadnik</h2>

          <span>Plastika, metal i višeslojna ambalaža</span>
        </div>

        <div class="waste-content">
          <div class="waste-image">
            <img
              :src="kontejneriStore.slikeKontejnera.zuti"
              alt="Žuti spremnik za plastiku i metal"
            />
          </div>

          <div class="waste-info">
            <div class="waste-column">
              <h3>✅ DA</h3>

              <ul>
                <li>Plastične boce i ambalaža</li>
                <li>Plastične vrećice i folije</li>
                <li>Čaše i posude od plastike</li>
                <li>Plastični čepovi</li>
                <li>Metalne limenke</li>
                <li>Manji metalni predmeti</li>
                <li>Višeslojna ambalaža za mlijeko i sokove</li>
              </ul>
            </div>

            <div class="waste-column">
              <h3>❌ NE</h3>

              <ul>
                <li>Ambalaža s ostacima opasnih tvari</li>
                <li>CD, DVD i ploče</li>
                <li>Limenke s ostacima boja i lakova</li>
                <li>Ambalaža s ostacima kemikalija</li>
                <li>Sprejevi i doze pod tlakom</li>
                <li>Eksplozivne i zapaljive tekućine</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="preparation">
          <h3>📌 Prije odlaganja</h3>

          <ul>
            <li>Ispraznite ambalažu od sadržaja.</li>
            <li>Po mogućnosti je isperite vodom.</li>
            <li>Uklonite nepoželjne dijelove.</li>
            <li>
              Istisnite zrak i složite ambalažu kako bi zauzimala manje
              prostora.
            </li>
          </ul>
        </div>

        <div class="waste-fact">
          <strong>♻️ Zanimljivost:</strong>

          Reciklirana plastika može se koristiti za proizvodnju nove ambalaže,
          odjeće, vlakana i izolacijskih materijala.
        </div>
      </section>

      <section class="dashboard-section waste-section">
        <div class="waste-title green">
          <h2>🟢 ZELENI Otpadnik</h2>

          <span>Preostali otpad</span>
        </div>

        <div class="waste-content">
          <div class="waste-image">
            <img
              :src="kontejneriStore.slikeKontejnera.zeleni"
              alt="Zeleni spremnik za preostali otpad"
            />
          </div>

          <div class="waste-info">
            <div class="waste-column">
              <h3>✅ DA</h3>

              <ul>
                <li>Pelene</li>
                <li>Higijenski ulošci</li>
                <li>Hladni pepeo</li>
                <li>Opušci</li>
                <li>Pluto</li>
                <li>Keramičko i porculansko posuđe</li>
                <li>Igračke</li>
                <li>Gumene rukavice</li>
                <li>Vrećice za usisavače</li>
              </ul>
            </div>

            <div class="waste-column">
              <h3>❌ NE</h3>

              <ul>
                <li>Stari lijekovi</li>
                <li>Otpadne baterije</li>
                <li>Boje i lakovi</li>
                <li>Otapala</li>
                <li>Pesticidi</li>
                <li>Ostali opasni otpad</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="important-box">
          <strong>⚠️ VAŽNO!</strong>

          <p>
            Preostali otpad potrebno je odlagati u adekvatno zatvorenim
            vrećicama. Opasni otpad ne smije se odlagati u zeleni spremnik.
          </p>
        </div>
      </section>

      <section class="dashboard-section waste-section">
        <div class="waste-title brown">
          <h2>🟤 SMEĐI Otpadnik</h2>

          <span>Biootpad</span>
        </div>

        <p class="section-description">
          Biootpad je kuhinjski i vrtni otpad koji čini značajan dio kućnog
          otpada. Od njega se može proizvesti kvalitetan kompost.
        </p>

        <div class="waste-content">
          <div class="waste-image">
            <img
              :src="kontejneriStore.slikeKontejnera.smedji"
              alt="Smeđi spremnik za biootpad"
            />
          </div>

          <div class="waste-info">
            <div class="waste-column">
              <h3>✅ DA</h3>

              <ul>
                <li>Ostaci i kora voća i povrća</li>
                <li>Ljuske jaja</li>
                <li>Talog kave</li>
                <li>Vrećice čaja</li>
                <li>Ostaci kruha</li>
                <li>Uvelo cvijeće</li>
                <li>Otpalo lišće</li>
                <li>Otkos trave i živice</li>
                <li>Zemlja iz lončanica</li>
                <li>Piljevina</li>
                <li>Kosa i dlaka</li>
                <li>Borove iglice</li>
              </ul>
            </div>

            <div class="waste-column">
              <h3>❌ NE</h3>

              <ul>
                <li>Ostaci termički obrađene hrane</li>
                <li>Meso, riba i kosti</li>
                <li>Koža</li>
                <li>Mliječni proizvodi</li>
                <li>Ulja i masti</li>
                <li>Pepeo</li>
                <li>Kartonska, staklena i plastična ambalaža</li>
                <li>Guma</li>
                <li>Opasni otpad</li>
                <li>Obojeni i lakirani drveni otpad</li>
                <li>Odjeća i cigarete</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="dashboard-section recycling-section">
        <h2>Reciklažna dvorišta</h2>

        <p>
          Reciklažna dvorišta su ograđeni i nadzirani prostori namijenjeni
          odvojenom prikupljanju, razvrstavanju i privremenom skladištenju
          manjih količina otpada iz kućanstva.
        </p>

        <p>
          Omogućuju građanima da zbrinu različite vrijedne i problematične vrste
          otpada, uključujući kućni glomazni otpad.
        </p>

        <div class="important-box">
          <strong>⚠️ Azbestni otpad</strong>

          <p>
            Azbestni otpad smije se predati samo ako je čvrsto omotan
            odgovarajućom zaštitnom folijom i osiguran od rasipanja. Ne smije se
            lomiti, usitnjavati niti predavati u rasutom stanju.
          </p>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
/* --- EDUKACIJA --- */

.education-container {
  width: 100%;
  max-width: 1000px;
  padding: 0 20px 50px;
  z-index: 10;
}

.education-intro {
  text-align: center;
}

.education-intro h2,
.dashboard-section > h2 {
  color: #2e7d32;
  font-size: 2rem;
  margin-bottom: 20px;
}

.education-intro p,
.section-description,
.recycling-section p,
.map-section p {
  font-size: 1.05rem;
  line-height: 1.6;
  margin-bottom: 15px;
}

.education-tip {
  margin-top: 25px;
  padding: 18px;
  background-color: #f7fee7;
  border: 1px solid #72d55c;
  border-radius: 12px;

  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
}

.education-tip strong {
  color: #2e7d32;
}

/* --- PREDNOSTI --- */

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.benefit-card {
  padding: 20px;
  border-radius: 15px;
  background-color: #f7fee7;
  border: 1px solid #72d55c;
  text-align: center;
}

.benefit-icon {
  display: block;
  font-size: 2rem;
  margin-bottom: 10px;
}

.benefit-card h3 {
  color: #2e7d32;
  margin-bottom: 8px;
}

.benefit-card p {
  line-height: 1.5;
}

/* --- OTPADNICI --- */

.waste-section {
  overflow: hidden;
}

.waste-title {
  padding: 15px 20px;
  margin: -24px -24px 25px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  color: white;
}

.waste-title h2 {
  margin: 0;
  font-size: 1.5rem;
}

.waste-title span {
  font-weight: bold;
}

.waste-title.blue {
  background-color: #176383;
}

.waste-title.orange {
  background-color: #e88925;
}

.waste-title.yellow {
  background-color: #e4c326;
  color: #333;
}

.waste-title.green {
  background-color: #4caf50;
}

.waste-title.brown {
  background-color: #8b5a2b;
}

/* --- SLIKA + INFORMACIJE --- */

.waste-content {
  display: flex;
  gap: 30px;
  align-items: flex-start;
}

.waste-image {
  flex: 0 0 180px;
  text-align: center;
}

.waste-image img {
  max-width: 160px;
  max-height: 220px;
  object-fit: contain;
}

.waste-info {
  flex: 1;

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
}

.waste-column h3 {
  margin-bottom: 10px;
  color: #2e7d32;
}

.waste-column ul {
  padding-left: 20px;
}

.waste-column li {
  margin-bottom: 7px;
  line-height: 1.4;
}

/* --- PRIPREMA --- */

.preparation {
  margin-top: 25px;
  padding: 18px;

  background-color: #f5f5f5;
  border-radius: 12px;
}

.preparation h3 {
  margin-bottom: 10px;
  color: #2e7d32;
}

.preparation li {
  margin-bottom: 7px;
}

/* --- ZANIMLJIVOST --- */

.waste-fact {
  margin-top: 15px;
  padding: 15px;

  background-color: #f7fee7;
  border-radius: 10px;

  line-height: 1.5;
}

.waste-fact strong {
  color: #2e7d32;
}

/* --- VAŽNO --- */

.important-box {
  margin-top: 20px;
  padding: 18px;

  background-color: #fff8e1;
  border: 1px solid #e0b94f;
  border-radius: 12px;
}

.important-box strong {
  display: block;
  margin-bottom: 8px;
  color: #8a6500;
}

/* --- KARTA --- */

.map-section {
  text-align: center;
}

.education-button {
  text-decoration: none;
  margin-top: 10px;
  max-width: 300px;
}

.back-button {
  text-decoration: none;
  margin-bottom: 30px;
}

/* --- RESPONSIVE --- */

@media (max-width: 750px) {
  .education-container {
    padding: 0 15px 40px;
  }

  .benefits-grid {
    grid-template-columns: 1fr;
  }

  .waste-content {
    flex-direction: column;
    align-items: center;
  }

  .waste-info {
    grid-template-columns: 1fr;
  }

  .waste-title {
    flex-direction: column;
    gap: 5px;
    text-align: center;
  }

  .education-tip {
    flex-direction: column;
  }
}
</style>
