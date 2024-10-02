import Link from "next/link";
import AuthBlock from "./auth-block";
import { FC } from "react";

const Menu: FC = () => {
	return (
		<nav>
			<ul className={"flex justify-between gap-3 text-sm"}>
				<li>
					<Link href="/">Главная</Link>
				</li>
				<li>
					<Link href="/news">Новости</Link>
				</li>                
				<li>
					<Link href="https://rutube.ru/channel/23757118/">Видео</Link>
				</li>
                <li>
					<Link href="/faq">Вопросы-Ответы</Link>
				</li>
                <li>
					<Link href="/search">Поиск</Link>
				</li>
				<AuthBlock />
			</ul>
		</nav>
	);
};

export default Menu;
