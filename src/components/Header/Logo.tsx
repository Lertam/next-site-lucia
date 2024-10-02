import Image from "next/image";
import LogoImage from "./logo.png";
import Link from "next/link";

const Logo = () => {
	return (
		<Link href={"/"}>
			<Image src={LogoImage} width={98} height={98} alt={"obeliski.ru"} />
		</Link>
	);
};

export default Logo;
