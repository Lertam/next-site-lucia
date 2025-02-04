const AdminBlock = () => {
  return (
    <div className={"mt-4 w-full border h-full mb-4 p-6 border-foreground"}>
      <div className={"font-bold text-center text-lg"}>Администрирование</div>
      <div className={"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-4"}>
        <div>
          <span>Информация</span>
          <div>
            <span>Дата регистрации</span>
            <span>Последний вход</span>
          </div>
        </div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </div>
    </div>
  );
};

export default AdminBlock;
