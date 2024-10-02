import Link from "next/link";

const Footer = () => {
  return (
    <footer
      className={
        "bg-foreground flex-grow py-10 px-7 pb-7 flex flex-col items-center text-white text-center gap-y-3 text-xs"
      }
    >
      <div className={"flex gap-x-4 text-[#e0dbcf]"}>
        {/* TODO Implement this pages */}
        <Link href={"https://obeliski.ru/uslovia.html"}>
          Условия и порядок оплаты
        </Link>
        <Link href={"https://obeliski.ru/polsoglahenie.html"}>
          Пользовательское соглашение
        </Link>
        <Link href={"https://obeliski.ru/node-2911.html"}>
          Политика конфиденциальности
        </Link>
      </div>
      <div className={"text-xs flex gap-x-4"}>
        <span>Администратор сайта: Пажуков Лев Станиславович</span>
        <span>
          Email: <a href={"mailto:obeliski@ya.ru"}>obeliski@ya.ru</a>
        </span>
        <span>
          Тел.: <a href={"tel:79209337501"}>+7(920)933-75-01</a>
        </span>
        <span>ИНН: 330501766393</span>
      </div>
      <div>601900, Владимирская область, г.Ковров, ул.Барсукова, д.7</div>
      <div className={"flex gap-x-4"}>
        <span>ИП Пажукова И.Н.</span>
        <span>ОГРНИП 321332800005222Б</span>
        <span>ИНН 330573527700</span>
        <span>
          тел. <a href={"tel:+74922600870"}>+74922600870</a>
        </span>
      </div>
      <div className={"text-[0.625rem]"}>
        Материалы сайта защищены законом об авторском праве на интеллектуальную
        собственность! Перепродажа материала запрещена и будет преследоваться в
        судебном порядке.
      </div>
      <div>&copy;&nbsp;{new Date().getFullYear()}&nbsp;obeliski.ru</div>
    </footer>
  );
};

export default Footer;
