<script setup>
import { useAuthStore } from "../stores/authStore";

const authStore = useAuthStore();
</script>

<template>
  <div class="app-background">
    <form @submit.prevent="authStore.backBotun">
      <button type="submit" class="btn-back">Nazad</button>
    </form>

    <header class="global-logo">
      <RouterLink style="text-decoration: none">
        <h1>ReciklirajMe</h1>
      </RouterLink>
      <div class="logo-underline"></div>
    </header>
    <div class="faq-container">
      <div class="faq-header">
        <h1>Često postavljana pitanja</h1>
        <p>
          Pronađite odgovore na najčešća pitanja o odvajanju otpada,
          kontejnerima i korištenju aplikacije ReciklirajMe.
        </p>
      </div>

      <section class="dashboard-section faq-section">
        <h2>Odvajanje otpada</h2>

        <div class="faq-list">
          <details class="faq-item">
            <summary>Kako najbolje pripremiti otpad prije odlaganja?</summary>

            <div class="faq-answer">
              <p>
                Prije odlaganja potrebno je pravilno pripremiti otpad. Ambalažu
                je potrebno isprazniti, a materijale odvojiti prema njihovoj
                vrsti.
              </p>

              <RouterLink to="/EducirajSe" class="faq-link">
                Saznaj više o pravilnom odvajanju →
              </RouterLink>
            </div>
          </details>

          <details class="faq-item">
            <summary>Kako znam gdje odložiti određenu vrstu otpada?</summary>

            <div class="faq-answer">
              <p>
                Ako niste sigurni u koji kontejner pripada određena vrsta
                otpada, koristite pretragu otpada. Unesite naziv otpada i
                aplikacija će vam pomoći pronaći odgovarajuću kategoriju.
              </p>

              <RouterLink to="/Search" class="faq-link">
                Pretraži otpad →
              </RouterLink>
            </div>
          </details>

          <details class="faq-item">
            <summary>Koje vrste otpada postoje?</summary>

            <div class="faq-answer">
              <p>
                Otpad je podijeljen u različite kategorije, poput papira,
                plastike, stakla, biootpada, metala i drugih posebnih
                kategorija.
              </p>

              <RouterLink to="/KontejneriGuest" class="faq-link">
                Pogledaj kategorije otpada koje pripadaju različitim
                kontejnerima za odlaganje otpada →
              </RouterLink>
            </div>
          </details>

          <details class="faq-item">
            <summary>Što ako nisam siguran/na gdje pripada moj otpad?</summary>

            <div class="faq-answer">
              <p>
                Možete pretražiti naziv otpada u aplikaciji i provjeriti u koju
                kategoriju pripada te gdje ga možete pravilno odložiti.
              </p>

              <RouterLink to="/Search" class="faq-link">
                Pronađi gdje odložiti otpad →
              </RouterLink>
            </div>
          </details>
        </div>
      </section>

      <section class="dashboard-section faq-section">
        <h2>Kontejneri i reciklažna dvorišta</h2>

        <div class="faq-list">
          <details class="faq-item">
            <summary>Gdje mogu pronaći najbliže reciklažno dvorište?</summary>

            <div class="faq-answer">
              <p>
                Na stranici s reciklažnim dvorištima možete pregledati dostupne
                lokacije i pronaći reciklažno dvorište gdje želite odložiti svoj
                otpad.
              </p>

              <RouterLink to="/Reciklazna_dvorista" class="faq-link">
                Pronađi recilklažno dvorište →
              </RouterLink>
            </div>
          </details>

          <details class="faq-item">
            <summary>Kako mogu vidjeti kontejnere drugih lokacija?</summary>

            <div class="faq-answer">
              <p>
                Neregistriranim korisnicima je omogučeno gledanje informacija
                samo sa lokaciju Grad Rijeka. Ukoliko želite odabrati drugu
                lokaciju, potrebno je registrirati se.
              </p>

              <RouterLink to="/Registracija" class="faq-link">
                Registriraj se →
              </RouterLink>
            </div>
          </details>
        </div>
      </section>

      <section class="dashboard-section faq-section">
        <h2>Korisnički račun</h2>

        <div class="faq-list">
          <details class="faq-item">
            <summary>Kako se mogu registrirati?</summary>

            <div class="faq-answer">
              <p>
                Za izradu korisničkog računa potrebno je otvoriti stranicu za
                registraciju i ispuniti potrebne podatke.
              </p>

              <RouterLink to="/Registracija" class="faq-link">
                Registriraj se →
              </RouterLink>
            </div>
          </details>

          <details class="faq-item">
            <summary>Koje su prednosti registracije?</summary>

            <div class="faq-answer">
              <p>
                Registrirani korisnici imaju pristup dodatnim funkcionalnostima
                i mogu personalizirati svoje iskustvo korištenja aplikacije.
              </p>

              <RouterLink to="/Registracija" class="faq-link">
                Registriraj se →
              </RouterLink>
            </div>
          </details>

          <details class="faq-item">
            <summary>Što mogu koristiti bez registracije?</summary>

            <div class="faq-answer">
              <p>
                Neregistrirani korisnici mogu pregledavati osnovne informacije o
                odvajanju otpada po kontejnerima.
              </p>

              <p>
                Za korištenje personaliziranih funkcionalnosti potrebno je
                registrirati se.
              </p>
            </div>
          </details>

          <details class="faq-item">
            <summary>
              Koje su funkcionalnosti dostupne samo registriranim korisnicima?
            </summary>

            <div class="faq-answer">
              <p>
                Registrirani korisnici imaju pristup dodatnim funkcionalnostima
                aplikacije.
              </p>

              <ul>
                <li>Odabir druge lokacije</li>
                <li>Praćenje odabranih lokacija</li>
                <li>Primanje obavijesti</li>
                <li>Personalizirane funkcionalnosti aplikacije</li>
              </ul>

              <RouterLink to="/Registracija" class="faq-link">
                Registriraj se →
              </RouterLink>
            </div>
          </details>
        </div>
      </section>
    </div>
  </div>
</template>
