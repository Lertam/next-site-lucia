import { FC } from "react";
import Logo from "./Logo";
import Profile from "./Profile";
import Menu from "./Menu";

const Header: FC = () => {
	return (
		<header className={"bg-foreground text-white flex-grow"}>
			<div
				// TODO Прописать max-h/max-w для разных адаптивных размеров
				className={
					"m-auto min-h-[151px] flex justify-between items-center md:max-w-[720px] lg:max-w-[940px] xl:max-w-[1140px]"
				}
			>
				<Logo />
				<div>
					<div className={"flex flex-col text-center mb-5"}>
						<span className={"text-3xl"}>РЕТУШЬ и КАРТИНКИ</span>
						<span className={"text-lg"}>для гравировки</span>
					</div>
					<Menu />
				</div>
				<Profile />
			</div>
		</header>
	);
};

export default Header;
