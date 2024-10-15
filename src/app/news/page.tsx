import NewsCard from "@/components/News/NewsCard";

export type NewsType = {
	id: number;
	title: string;
	image: string;
	description: string;
};

const node: NewsType = {
	id: 3179,
	title: "Что делать, если не скачивается эскиз в редакторе.",
	description: `Если возникла ситуация, когда готовый макет не генерируется в онлайн редакторе, советуем сделать следующие шаги:

    Выйдите из редактора, соберите макет заново, сохраните его и попробуйте сгенерировать эскиз снова.
    Если это не помогает, то нажмите ПОДЕЛИТЬСЯ, нажав на соответствующую иконку под ваших сохраненным эскизом и напишите админу о вашей проблеме.
    После того как генерация пройдет благополучно, неудачные генерации будут удалены администратором.`,
	image:
		"https://obeliski.ru/ymaxiProduct/files/old/files/pictures/mainBoxNews/87ce4192-bb75-4ea6-9921-11196d77159c.jpg",
};

const NewsPage = () => {
	return (
		<div className={"h-full w-full m-auto flex flex-col"}>
			<h1 className={"text-center font-bold mt-4 uppercase relative"}>
				Новости
			</h1>
			<div className={"grid grid-col-1 gap-3 sm:grid-cols-2 md:grid-cols-3"}>
				<NewsCard {...node} />
				<NewsCard {...node} />
				<NewsCard {...node} />
				<NewsCard {...node} />
				<NewsCard {...node} />
				<NewsCard {...node} />
			</div>
		</div>
	);
};

export default NewsPage;
