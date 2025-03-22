import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
export default function HomePage() {
  return (
    <>
      <Header />
      <section
        aria-label="Hero Section"
        className="py-12 sm:py-16 lg:py-24 min-h-[calc(100svh+4.5rem)] bg-black"
      >
        <div className="section-offset">
          <div className="grid-layout">
            <div className="col-span-4 md:col-span-8 lg:col-span-12 flex flex-col justify-center gap-6 text-white">
              <h1 className="text-9xl sm:text-5xl lg:text-6xl font-black uppercase">
                Банкирането и <br />
                отвъд
              </h1>
              <h1 className="text-title-page">
                Банкирането и <br />
                отвъд
              </h1>

              <p className="text-lg sm:text-xl lg:text-2xl">
                Без значение дали сте у дома или на път – нека Revolut надмине
                очакванията ви за банкиране. Регистрирайте се лесно и безплатно.
              </p>
              <div className="flex flex-col md:flex-row gap-4">
                <Button variant="default" size="lg">
                  Изтеглете приложението
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        aria-label="Hero Section"
        className="py-12 sm:py-16 lg:py-24 h-svh -mt-14`"
      >
        <div className="section-offset">
          <div className="grid-layout">
            <div className="col-span-4 md:col-span-8 lg:col-span-12 flex flex-col justify-center gap-6 text-center">
              {" "}
              <h1 className="text-4xl sm:text-5xl lg:text-5xl font-black uppercase text-center">
                Направете своя разход добре <br /> изразходван
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-800">
                Купувате хранителни продукти? Получете RevPoints. Когато сте в
                Япония? Харчете в йени. Важна промяна в живота? Опитайте
                Съвместна сметка. Както и да харчите – Revolut е всичко, от
                което се нуждаете.
              </p>
            </div>
            <div className="col-span-12 text-center">
              <Button variant="default" size="lg">
                Преместете заплатата си
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section
        aria-label="Hero Section"
        className="py-12 sm:py-16 lg:py-24 h-svh -mt-14`"
      >
        <div className="section-offset">
          <div className="grid-layout">
            <div className="col-span-4 md:col-span-8 lg:col-span-12 flex flex-col justify-center gap-6 ">
              <h1 className="text-4xl sm:text-5xl lg:text-5xl font-black uppercase text-center">
                Направете своя разход добре <br /> изразходван
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-800">
                Купувате хранителни продукти? Получете RevPoints. Когато сте в
                Япония? Харчете в йени. Важна промяна в живота? Опитайте
                Съвместна сметка. Както и да харчите – Revolut е всичко, от
                което се нуждаете.
              </p>
              <div className="flex flex-col md:flex-row gap-4">
                <Button variant="default" size="lg">
                  Нашите услуги
                </Button>
                <Button variant="outline" size="lg">
                  Свържете се с нас
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        aria-label="Hero Section"
        className="py-12 sm:py-16 lg:py-24 h-svh -mt-14`"
      ></section>
      <section
        aria-label="Hero Section"
        className="py-12 sm:py-16 lg:py-24 min-h-svh -mt-14 bg-sidebar-primary"
      >
        <div className="section-offset">
          <div className="grid-layout gap-5">
            {/* Standard Card */}
            <div className="col-span-4  bg-white text-gray-800 p-6 rounded-3xl shadow-lg">
              <h3 className="text-xl font-semibold">Standard</h3>
              <p className="text-md font-semibold">Безплатно</p>
              <p className="text-gray-600">
                Изпращане на пари в чужбина или придържане към бюджета с помощта
                на вградени инструменти - независимо от нуждите ви, получавайте
                повече от парите си с нашата сметка Standard.
              </p>
            </div>

            {/* Plus Card */}
            <div className="col-span-4 bg-white text-gray-800 p-6 rounded-3xl shadow-lg">
              <h3 className="text-xl font-semibold">Plus</h3>
              <p className="text-md font-semibold">7,99 лв/м.</p>
              <p className="text-gray-600">
                Насладете се на допълнителни предимства като приоритетна
                поддръжка в приложението и защита на ежедневните разходи за
                по-малко от цената на едно кафе. Всичко това и още, с Plus.
              </p>
            </div>

            {/* Premium Card */}
            <div className="col-span-4 bg-white text-gray-800 p-6 rounded-3xl shadow-lg">
              <h3 className="text-xl font-semibold">Premium</h3>
              <p className="text-md font-semibold">15,99 лв/м.</p>
              <p className="text-gray-600">
                Открийте гъвкави облаги, които отговарят на живота ви у дома и
                ви отвеждат по целия свят. Спестявайте, харчете, изпращайте и
                инвестирайте по-разумно с Premium.
              </p>
            </div>

            {/* Metal Card */}
            <div className="col-span-6 bg-white text-gray-800 p-6 rounded-3xl shadow-lg">
              <h3 className="text-xl font-semibold">Metal</h3>
              <p className="text-md font-semibold">29,99 лв/м.</p>
              <p className="text-gray-600">
                Насладете се на по-високи лимити за инвестиции, глобални разходи
                и още, както и на редица облаги, подобряващи начина на живот –
                всичко това в Metal.
              </p>
            </div>
            {/* Ultra Card */}
            <div className="col-span-6 bg-white text-gray-800 p-6 rounded-3xl shadow-lg">
              <h3 className="text-xl font-semibold">Ultra</h3>
              <p className="text-md font-semibold">90 лв/м.</p>
              <p className="text-gray-600">
                Опитайте изключителното, включващо ексклузивни облаги за начина
                на живот, пътувания от световна класа и прецизно изработена
                карта с платинено покритие.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
